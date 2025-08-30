import { describe, it, expect, beforeEach } from 'vitest';
import { BuscarTurmasUseCase } from './buscar-turmas';
import { InMemoryTurmasRepository } from '../../repositories/in-memory/in-memory-turmas-repository';

let turmasRepository: InMemoryTurmasRepository;
let sut: BuscarTurmasUseCase;

describe('Buscar Turmas Use Case', () => {
  beforeEach(() => {
    turmasRepository = new InMemoryTurmasRepository();
    sut = new BuscarTurmasUseCase(turmasRepository);
  });

  it('deve ser possível buscar turmas na primeira página', async () => {
    // Criar algumas turmas
    await turmasRepository.create({
      nome: 'Turma A',
      numAlunos: 30,
      periodo: 1,
      turno: 'MATUTINO',
    });

    await turmasRepository.create({
      nome: 'Turma B',
      numAlunos: 25,
      periodo: 2,
      turno: 'VESPERTINO',
    });

    const { turmas } = await sut.execute({
      page: 1,
    });

    expect(turmas).toHaveLength(2);
    expect(turmas[0].nome).toEqual('Turma A');
    expect(turmas[1].nome).toEqual('Turma B');
  });

  it('deve retornar array vazio quando não há turmas', async () => {
    const { turmas } = await sut.execute({
      page: 1,
    });

    expect(turmas).toHaveLength(0);
    expect(turmas).toEqual([]);
  });

  it('deve respeitar a paginação', async () => {
    // Criar 25 turmas para testar paginação (limite é 20 por página)
    for (let i = 1; i <= 25; i++) {
      await turmasRepository.create({
        nome: `Turma ${i}`,
        numAlunos: 20 + i,
        periodo: Math.ceil(i / 5),
        turno: i % 2 === 0 ? 'MATUTINO' : 'VESPERTINO',
      });
    }

    const { turmas: primeiraPagina } = await sut.execute({
      page: 1,
    });

    const { turmas: segundaPagina } = await sut.execute({
      page: 2,
    });

    expect(primeiraPagina).toHaveLength(20);
    expect(segundaPagina).toHaveLength(5);
    expect(primeiraPagina[0].nome).toEqual('Turma 1');
    expect(segundaPagina[0].nome).toEqual('Turma 21');
  });

  it('deve retornar array vazio para página inexistente', async () => {
    await turmasRepository.create({
      nome: 'Turma A',
      numAlunos: 30,
      periodo: 1,
      turno: 'MATUTINO',
    });

    const { turmas } = await sut.execute({
      page: 5,
    });

    expect(turmas).toHaveLength(0);
    expect(turmas).toEqual([]);
  });

  it('deve retornar turmas com todas as propriedades corretas', async () => {
    await turmasRepository.create({
      nome: 'Turma Teste',
      numAlunos: 35,
      periodo: 3,
      turno: 'NOTURNO',
    });

    const { turmas } = await sut.execute({
      page: 1,
    });

    expect(turmas[0]).toEqual({
      id: expect.any(String),
      nome: 'Turma Teste',
      numAlunos: 35,
      periodo: 3,
      turno: 'NOTURNO',
    });
  });
});