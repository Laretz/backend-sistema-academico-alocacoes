import { describe, it, expect, beforeEach } from 'vitest';
import { ExcluirTurmaUseCase } from './excluir-turma';
import { InMemoryTurmasRepository } from '../../repositories/in-memory/in-memory-turmas-repository';
import { RecursoNaoEncontradoError } from '../errors/recurso-nao-encontrado';

let turmasRepository: InMemoryTurmasRepository;
let sut: ExcluirTurmaUseCase;

describe('Excluir Turma Use Case', () => {
  beforeEach(() => {
    turmasRepository = new InMemoryTurmasRepository();
    sut = new ExcluirTurmaUseCase(turmasRepository);
  });

  it('deve ser possível excluir uma turma existente', async () => {
    const turmaCriada = await turmasRepository.create({
      nome: 'Turma A',
      numAlunos: 30,
      periodo: 1,
      turno: 'MATUTINO',
    });

    await sut.execute({
      id: turmaCriada.id,
    });

    // Verificar se a turma foi realmente excluída
    const turmaExcluida = await turmasRepository.findById(turmaCriada.id);
    expect(turmaExcluida).toBeNull();
  });

  it('deve lançar erro quando tentar excluir turma inexistente', async () => {
    await expect(() =>
      sut.execute({
        id: 'id-inexistente',
      })
    ).rejects.toBeInstanceOf(RecursoNaoEncontradoError);
  });

  it('deve excluir apenas a turma especificada quando existem múltiplas turmas', async () => {
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

    const turma3 = await turmasRepository.create({
      nome: 'Turma C',
      numAlunos: 35,
      periodo: 3,
      turno: 'NOTURNO',
    });

    // Excluir apenas a turma2
    await sut.execute({
      id: turma2.id,
    });

    // Verificar se apenas a turma2 foi excluída
    const turma1Ainda = await turmasRepository.findById(turma1.id);
    const turma2Excluida = await turmasRepository.findById(turma2.id);
    const turma3Ainda = await turmasRepository.findById(turma3.id);

    expect(turma1Ainda).not.toBeNull();
    expect(turma1Ainda?.nome).toEqual('Turma A');
    expect(turma2Excluida).toBeNull();
    expect(turma3Ainda).not.toBeNull();
    expect(turma3Ainda?.nome).toEqual('Turma C');
  });

  it('deve ser possível excluir múltiplas turmas sequencialmente', async () => {
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

    // Excluir primeira turma
    await sut.execute({
      id: turma1.id,
    });

    // Excluir segunda turma
    await sut.execute({
      id: turma2.id,
    });

    // Verificar se ambas foram excluídas
    const turma1Excluida = await turmasRepository.findById(turma1.id);
    const turma2Excluida = await turmasRepository.findById(turma2.id);

    expect(turma1Excluida).toBeNull();
    expect(turma2Excluida).toBeNull();
  });

  it('deve lançar erro ao tentar excluir a mesma turma duas vezes', async () => {
    const turmaCriada = await turmasRepository.create({
      nome: 'Turma A',
      numAlunos: 30,
      periodo: 1,
      turno: 'MATUTINO',
    });

    // Primeira exclusão deve funcionar
    await sut.execute({
      id: turmaCriada.id,
    });

    // Segunda exclusão deve lançar erro
    await expect(() =>
      sut.execute({
        id: turmaCriada.id,
      })
    ).rejects.toBeInstanceOf(RecursoNaoEncontradoError);
  });
});