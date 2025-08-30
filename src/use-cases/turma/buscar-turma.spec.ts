import { describe, it, expect, beforeEach } from 'vitest';
import { BuscarTurmaUseCase } from './buscar-turma';
import { InMemoryTurmasRepository } from '../../repositories/in-memory/in-memory-turmas-repository';
import { RecursoNaoEncontradoError } from '../errors/recurso-nao-encontrado';

let turmasRepository: InMemoryTurmasRepository;
let sut: BuscarTurmaUseCase;

describe('Buscar Turma Use Case', () => {
  beforeEach(() => {
    turmasRepository = new InMemoryTurmasRepository();
    sut = new BuscarTurmaUseCase(turmasRepository);
  });

  it('deve ser possível buscar uma turma pelo ID', async () => {
    const turmaCriada = await turmasRepository.create({
      nome: 'Turma A',
      numAlunos: 30,
      periodo: 1,
      turno: 'MATUTINO',
    });

    const { turma } = await sut.execute({
      id: turmaCriada.id,
    });

    expect(turma.id).toEqual(turmaCriada.id);
    expect(turma.nome).toEqual('Turma A');
    expect(turma.numAlunos).toEqual(30);
    expect(turma.periodo).toEqual(1);
    expect(turma.turno).toEqual('MATUTINO');
  });

  it('deve lançar erro quando turma não for encontrada', async () => {
    await expect(() =>
      sut.execute({
        id: 'id-inexistente',
      })
    ).rejects.toBeInstanceOf(RecursoNaoEncontradoError);
  });

  it('deve retornar a turma correta quando existem múltiplas turmas', async () => {
    const turma1 = await turmasRepository.create({
      nome: 'Turma A',
      numAlunos: 30,
      periodo: 1,
      turno: 'MATUTINO',
    });

    const turma2 = await turmasRepository.create({
      nome: 'Turma B',
      numAlunos: 25,
      periodo: 2,
      turno: 'VESPERTINO',
    });

    const { turma } = await sut.execute({
      id: turma2.id,
    });

    expect(turma.id).toEqual(turma2.id);
    expect(turma.nome).toEqual('Turma B');
    expect(turma.numAlunos).toEqual(25);
    expect(turma.periodo).toEqual(2);
    expect(turma.turno).toEqual('VESPERTINO');
  });
});