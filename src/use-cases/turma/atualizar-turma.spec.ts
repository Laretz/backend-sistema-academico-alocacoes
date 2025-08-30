import { describe, it, expect, beforeEach } from 'vitest';
import { AtualizarTurmaUseCase } from './atualizar-turma';
import { InMemoryTurmasRepository } from '../../repositories/in-memory/in-memory-turmas-repository';
import { RecursoNaoEncontradoError } from '../errors/recurso-nao-encontrado';

let turmasRepository: InMemoryTurmasRepository;
let sut: AtualizarTurmaUseCase;

describe('Atualizar Turma Use Case', () => {
  beforeEach(() => {
    turmasRepository = new InMemoryTurmasRepository();
    sut = new AtualizarTurmaUseCase(turmasRepository);
  });

  it('deve ser possível atualizar todos os campos de uma turma', async () => {
    const turmaCriada = await turmasRepository.create({
      nome: 'Turma A',
      numAlunos: 30,
      periodo: 1,
      turno: 'MATUTINO',
    });

    const { turma } = await sut.execute({
      id: turmaCriada.id,
      nome: 'Turma A Atualizada',
      numAlunos: 35,
      periodo: 2,
      turno: 'VESPERTINO',
    });

    expect(turma.id).toEqual(turmaCriada.id);
    expect(turma.nome).toEqual('Turma A Atualizada');
    expect(turma.numAlunos).toEqual(35);
    expect(turma.periodo).toEqual(2);
    expect(turma.turno).toEqual('VESPERTINO');
  });

  it('deve ser possível atualizar apenas o nome da turma', async () => {
    const turmaCriada = await turmasRepository.create({
      nome: 'Turma A',
      numAlunos: 30,
      periodo: 1,
      turno: 'MATUTINO',
    });

    const { turma } = await sut.execute({
      id: turmaCriada.id,
      nome: 'Novo Nome',
      numAlunos: undefined,
      periodo: undefined,
      turno: undefined,
    });

    expect(turma.nome).toEqual('Novo Nome');
    expect(turma.numAlunos).toEqual(30); // Mantém valor original
    expect(turma.periodo).toEqual(1); // Mantém valor original
    expect(turma.turno).toEqual('MATUTINO'); // Mantém valor original
  });

  it('deve ser possível atualizar apenas o número de alunos', async () => {
    const turmaCriada = await turmasRepository.create({
      nome: 'Turma A',
      numAlunos: 30,
      periodo: 1,
      turno: 'MATUTINO',
    });

    const { turma } = await sut.execute({
      id: turmaCriada.id,
      nome: undefined,
      numAlunos: 40,
      periodo: undefined,
      turno: undefined,
    });

    expect(turma.nome).toEqual('Turma A'); // Mantém valor original
    expect(turma.numAlunos).toEqual(40);
    expect(turma.periodo).toEqual(1); // Mantém valor original
    expect(turma.turno).toEqual('MATUTINO'); // Mantém valor original
  });

  it('deve ser possível atualizar apenas o período', async () => {
    const turmaCriada = await turmasRepository.create({
      nome: 'Turma A',
      numAlunos: 30,
      periodo: 1,
      turno: 'MATUTINO',
    });

    const { turma } = await sut.execute({
      id: turmaCriada.id,
      nome: undefined,
      numAlunos: undefined,
      periodo: 3,
      turno: undefined,
    });

    expect(turma.nome).toEqual('Turma A'); // Mantém valor original
    expect(turma.numAlunos).toEqual(30); // Mantém valor original
    expect(turma.periodo).toEqual(3);
    expect(turma.turno).toEqual('MATUTINO'); // Mantém valor original
  });

  it('deve ser possível atualizar apenas o turno', async () => {
    const turmaCriada = await turmasRepository.create({
      nome: 'Turma A',
      numAlunos: 30,
      periodo: 1,
      turno: 'MATUTINO',
    });

    const { turma } = await sut.execute({
      id: turmaCriada.id,
      nome: undefined,
      numAlunos: undefined,
      periodo: undefined,
      turno: 'NOTURNO',
    });

    expect(turma.nome).toEqual('Turma A'); // Mantém valor original
    expect(turma.numAlunos).toEqual(30); // Mantém valor original
    expect(turma.periodo).toEqual(1); // Mantém valor original
    expect(turma.turno).toEqual('NOTURNO');
  });

  it('deve lançar erro quando tentar atualizar turma inexistente', async () => {
    await expect(() =>
      sut.execute({
        id: 'id-inexistente',
        nome: 'Novo Nome',
        numAlunos: undefined,
        periodo: undefined,
        turno: undefined,
      })
    ).rejects.toBeInstanceOf(RecursoNaoEncontradoError);
  });

  it('deve manter dados originais quando todos os campos são undefined', async () => {
    const turmaCriada = await turmasRepository.create({
      nome: 'Turma Original',
      numAlunos: 25,
      periodo: 2,
      turno: 'VESPERTINO',
    });

    const { turma } = await sut.execute({
      id: turmaCriada.id,
      nome: undefined,
      numAlunos: undefined,
      periodo: undefined,
      turno: undefined,
    });

    expect(turma.nome).toEqual('Turma Original');
    expect(turma.numAlunos).toEqual(25);
    expect(turma.periodo).toEqual(2);
    expect(turma.turno).toEqual('VESPERTINO');
  });
});