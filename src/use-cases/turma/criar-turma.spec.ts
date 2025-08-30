import { describe, it, expect, beforeEach } from 'vitest';
import { CriarTurmaUseCase } from './criar-turma';
import { InMemoryTurmasRepository } from '../../repositories/in-memory/in-memory-turmas-repository';

let turmasRepository: InMemoryTurmasRepository;
let sut: CriarTurmaUseCase;

describe('Criar Turma Use Case', () => {
  beforeEach(() => {
    turmasRepository = new InMemoryTurmasRepository();
    sut = new CriarTurmaUseCase(turmasRepository);
  });

  it('deve ser possível criar uma turma', async () => {
    const { turma } = await sut.execute({
      nome: 'Turma A',
      numAlunos: 30,
      periodo: 1,
      turno: 'MATUTINO',
    });

    expect(turma.id).toEqual(expect.any(String));
    expect(turma.nome).toEqual('Turma A');
    expect(turma.numAlunos).toEqual(30);
    expect(turma.periodo).toEqual(1);
    expect(turma.turno).toEqual('MATUTINO');
  });

  it('deve ser possível criar turmas com diferentes turnos', async () => {
    const { turma: turmaMatutino } = await sut.execute({
      nome: 'Turma Manhã',
      numAlunos: 25,
      periodo: 2,
      turno: 'MATUTINO',
    });

    const { turma: turmaVespertino } = await sut.execute({
      nome: 'Turma Tarde',
      numAlunos: 28,
      periodo: 3,
      turno: 'VESPERTINO',
    });

    const { turma: turmaNoturno } = await sut.execute({
      nome: 'Turma Noite',
      numAlunos: 20,
      periodo: 4,
      turno: 'NOTURNO',
    });

    expect(turmaMatutino.turno).toEqual('MATUTINO');
    expect(turmaVespertino.turno).toEqual('VESPERTINO');
    expect(turmaNoturno.turno).toEqual('NOTURNO');
  });

  it('deve ser possível criar turmas com diferentes números de alunos', async () => {
    const { turma: turmaPequena } = await sut.execute({
      nome: 'Turma Pequena',
      numAlunos: 15,
      periodo: 1,
      turno: 'MATUTINO',
    });

    const { turma: turmaGrande } = await sut.execute({
      nome: 'Turma Grande',
      numAlunos: 40,
      periodo: 1,
      turno: 'VESPERTINO',
    });

    expect(turmaPequena.numAlunos).toEqual(15);
    expect(turmaGrande.numAlunos).toEqual(40);
  });
});