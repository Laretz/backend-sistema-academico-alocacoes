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
      num_alunos: 30,
      periodo: 1,
      turno: 'MATUTINO',
      id_curso: 'curso-id-teste',
    });

    const { turma } = await sut.execute({
      id: turmaCriada.id,
      nome: 'Turma A Atualizada',
      num_alunos: 35,
      periodo: 2,
      turno: 'VESPERTINO',
    });

    expect(turma.id).toEqual(turmaCriada.id);
    expect(turma.nome).toEqual('Turma A Atualizada');
    expect(turma.num_alunos).toEqual(35);
    expect(turma.periodo).toEqual(2);
    expect(turma.turno).toEqual('VESPERTINO');
  });

  it('deve ser possível atualizar apenas o nome da turma', async () => {
    const turmaCriada = await turmasRepository.create({
      nome: 'Turma A',
      num_alunos: 30,
      periodo: 1,
      turno: 'MATUTINO',
      id_curso: 'curso-id-teste',
    });

    const { turma } = await sut.execute({
      id: turmaCriada.id,
      nome: 'Novo Nome',
      num_alunos: undefined,
      periodo: undefined,
      turno: undefined,
    });

    expect(turma.nome).toEqual('Novo Nome');
    expect(turma.num_alunos).toEqual(30); // Mantém valor original
    expect(turma.periodo).toEqual(1); // Mantém valor original
    expect(turma.turno).toEqual('MATUTINO'); // Mantém valor original
  });

  it('deve ser possível atualizar apenas o número de alunos', async () => {
    const turmaCriada = await turmasRepository.create({
      nome: 'Turma A',
      num_alunos: 30,
      periodo: 1,
      turno: 'MATUTINO',
      id_curso: 'curso-id-teste',
    });

    const { turma } = await sut.execute({
      id: turmaCriada.id,
      nome: undefined,
      num_alunos: 40,
      periodo: undefined,
      turno: undefined,
    });

    expect(turma.nome).toEqual('Turma A'); // Mantém valor original
    expect(turma.num_alunos).toEqual(40);
    expect(turma.periodo).toEqual(1); // Mantém valor original
    expect(turma.turno).toEqual('MATUTINO'); // Mantém valor original
  });

  it('deve ser possível atualizar apenas o período', async () => {
    const turmaCriada = await turmasRepository.create({
      nome: 'Turma A',
      num_alunos: 30,
      periodo: 1,
      turno: 'MATUTINO',
      id_curso: 'curso-id-teste',
    });

    const { turma } = await sut.execute({
      id: turmaCriada.id,
      nome: undefined,
      num_alunos: undefined,
      periodo: 3,
      turno: undefined,
    });

    expect(turma.nome).toEqual('Turma A'); // Mantém valor original
    expect(turma.num_alunos).toEqual(30); // Mantém valor original
    expect(turma.periodo).toEqual(3);
    expect(turma.turno).toEqual('MATUTINO'); // Mantém valor original
  });

  it('deve ser possível atualizar apenas o turno', async () => {
    const turmaCriada = await turmasRepository.create({
      nome: 'Turma A',
      num_alunos: 30,
      periodo: 1,
      turno: 'MATUTINO',
      id_curso: 'curso-id-teste',
    });

    const { turma } = await sut.execute({
      id: turmaCriada.id,
      nome: undefined,
      num_alunos: undefined,
      periodo: undefined,
      turno: 'NOTURNO',
    });

    expect(turma.nome).toEqual('Turma A'); // Mantém valor original
    expect(turma.num_alunos).toEqual(30); // Mantém valor original
    expect(turma.periodo).toEqual(1); // Mantém valor original
    expect(turma.turno).toEqual('NOTURNO');
  });

  it('deve lançar erro quando tentar atualizar turma inexistente', async () => {
    await expect(() =>
      sut.execute({
        id: 'id-inexistente',
        nome: 'Novo Nome',
        num_alunos: undefined,
        periodo: undefined,
        turno: undefined,
      })
    ).rejects.toBeInstanceOf(RecursoNaoEncontradoError);
  });

  it('deve manter dados originais quando todos os campos são undefined', async () => {
    const turmaCriada = await turmasRepository.create({
      nome: 'Turma Original',
      num_alunos: 25,
      periodo: 2,
      turno: 'VESPERTINO',
      id_curso: 'curso-id-teste',
    });

    const { turma } = await sut.execute({
      id: turmaCriada.id,
      nome: undefined,
      num_alunos: undefined,
      periodo: undefined,
      turno: undefined,
    });

    expect(turma.nome).toEqual('Turma Original');
    expect(turma.num_alunos).toEqual(25);
    expect(turma.periodo).toEqual(2);
    expect(turma.turno).toEqual('VESPERTINO');
  });
});