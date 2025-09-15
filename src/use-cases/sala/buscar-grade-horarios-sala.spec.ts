import { describe, it, expect, beforeEach } from 'vitest';
import { BuscarGradeHorariosSalaUseCase } from './buscar-grade-horarios-sala';
import { InMemoryAlocacoesRepository } from '../../repositories/in-memory/in-memory-alocacoes-repository';

let alocacoesRepository: InMemoryAlocacoesRepository;
let sut: BuscarGradeHorariosSalaUseCase;

describe('Buscar Grade Horários Sala Use Case', () => {
  beforeEach(() => {
    alocacoesRepository = new InMemoryAlocacoesRepository();
    sut = new BuscarGradeHorariosSalaUseCase(alocacoesRepository);
  });

  it('deve retornar grade vazia quando sala não tem alocações', async () => {
    const salaId = 'sala-01';

    const { salaId: returnedSalaId, grade, resumo } = await sut.execute({
      salaId,
    });

    expect(returnedSalaId).toEqual(salaId);
    expect(grade).toBeDefined();
    expect(grade.SEGUNDA).toBeDefined();
    expect(grade.SEGUNDA.M1).toBeNull();
    expect(resumo.totalAlocacoes).toBe(0);
    expect(resumo.disciplinasUnicas).toBe(0);
    expect(resumo.professoresUnicos).toBe(0);
    expect(resumo.turmasUnicas).toBe(0);
  });

  it('deve retornar grade com alocações quando sala tem alocações', async () => {
    const salaId = 'sala-01';
    const userId = 'user-01';
    const disciplinaId = 'disciplina-01';
    const turmaId = 'turma-01';
    const horarioId = 'horario-01';

    // Criar alocação com dados customizados
    await alocacoesRepository.createWithCustomData({
      id: 'alocacao-01',
      id_user: userId,
      id_disciplina: disciplinaId,
      id_turma: turmaId,
      id_sala: salaId,
      id_horario: horarioId,
      user: {
        id: userId,
        nome: 'Professor Teste',
        email: 'professor@teste.com',
        senha: 'senha123',
        created_at: new Date(),
      },
      disciplina: {
        id: disciplinaId,
        nome: 'Matemática',
        cargaHorariaTotal: 60,
        created_at: new Date(),
      },
      turma: {
        id: turmaId,
        nome: 'Turma A',
        numAlunos: 30,
        periodo: 1,
        turno: 'MATUTINO',
        created_at: new Date(),
      },
      sala: {
        id: salaId,
        nome: 'Sala 101',
        predio: 'Prédio A',
        capacidade: 40,
        tipo: 'AULA',
      },
      horario: {
        id: horarioId,
        codigo: 'M1',
        dia_semana: 'SEGUNDA',
        horarioInicio: new Date('2024-01-01T08:00:00'),
        horarioFim: new Date('2024-01-01T09:00:00'),
      },
    });

    const { salaId: returnedSalaId, grade, resumo } = await sut.execute({
      salaId,
    });

    expect(returnedSalaId).toEqual(salaId);
    expect(grade.SEGUNDA.M1).toBeDefined();
    expect(grade.SEGUNDA.M1?.disciplina.nome).toBe('Matemática');
    expect(grade.SEGUNDA.M1?.professor.nome).toBe('Professor Teste');
    expect(grade.SEGUNDA.M1?.turma.nome).toBe('Turma A');
    expect(resumo.totalAlocacoes).toBe(1);
    expect(resumo.disciplinasUnicas).toBe(1);
    expect(resumo.professoresUnicos).toBe(1);
    expect(resumo.turmasUnicas).toBe(1);
  });

  it('deve retornar grade com múltiplas alocações em horários diferentes', async () => {
    const salaId = 'sala-01';

    // Primeira alocação - Segunda M1
    await alocacoesRepository.createWithCustomData({
      id: 'alocacao-01',
      id_user: 'user-01',
      id_disciplina: 'disciplina-01',
      id_turma: 'turma-01',
      id_sala: salaId,
      id_horario: 'horario-01',
      user: {
        id: 'user-01',
        nome: 'Professor A',
        email: 'professora@teste.com',
        senha: 'senha123',
        created_at: new Date(),
      },
      disciplina: {
        id: 'disciplina-01',
        nome: 'Matemática',
        cargaHorariaTotal: 60,
        created_at: new Date(),
      },
      turma: {
        id: 'turma-01',
        nome: 'Turma A',
        numAlunos: 30,
        periodo: 1,
        turno: 'MATUTINO',
        created_at: new Date(),
      },
      sala: {
        id: salaId,
        nome: 'Sala 101',
        predio: 'Prédio A',
        capacidade: 40,
        tipo: 'AULA',
      },
      horario: {
        id: 'horario-01',
        codigo: 'M1',
        dia_semana: 'SEGUNDA',
        horarioInicio: new Date('2024-01-01T08:00:00'),
        horarioFim: new Date('2024-01-01T09:00:00'),
      },
    });

    // Segunda alocação - Terça M2
    await alocacoesRepository.createWithCustomData({
      id: 'alocacao-02',
      id_user: 'user-02',
      id_disciplina: 'disciplina-02',
      id_turma: 'turma-02',
      id_sala: salaId,
      id_horario: 'horario-02',
      user: {
        id: 'user-02',
        nome: 'Professor B',
        email: 'professorb@teste.com',
        senha: 'senha123',
        created_at: new Date(),
      },
      disciplina: {
        id: 'disciplina-02',
        nome: 'Física',
        cargaHorariaTotal: 80,
        created_at: new Date(),
      },
      turma: {
        id: 'turma-02',
        nome: 'Turma B',
        numAlunos: 25,
        periodo: 2,
        turno: 'VESPERTINO',
        created_at: new Date(),
      },
      sala: {
        id: salaId,
        nome: 'Sala 101',
        predio: 'Prédio A',
        capacidade: 40,
        tipo: 'AULA',
      },
      horario: {
        id: 'horario-02',
        codigo: 'M2',
        dia_semana: 'TERCA',
        horarioInicio: new Date('2024-01-01T09:00:00'),
        horarioFim: new Date('2024-01-01T10:00:00'),
      },
    });

    const { grade, resumo } = await sut.execute({ salaId });

    expect(grade.SEGUNDA.M1?.disciplina.nome).toBe('Matemática');
    expect(grade.SEGUNDA.M1?.professor.nome).toBe('Professor A');
    expect(grade.TERCA.M2?.disciplina.nome).toBe('Física');
    expect(grade.TERCA.M2?.professor.nome).toBe('Professor B');
    expect(resumo.totalAlocacoes).toBe(2);
    expect(resumo.disciplinasUnicas).toBe(2);
    expect(resumo.professoresUnicos).toBe(2);
    expect(resumo.turmasUnicas).toBe(2);
  });

  it('deve calcular corretamente o resumo com múltiplas alocações do mesmo professor e disciplina', async () => {
    const salaId = 'sala-01';
    const userId = 'user-01';
    const disciplinaId = 'disciplina-01';

    // Primeira alocação
    await alocacoesRepository.createWithCustomData({
      id: 'alocacao-01',
      id_user: userId,
      id_disciplina: disciplinaId,
      id_turma: 'turma-01',
      id_sala: salaId,
      id_horario: 'horario-01',
      user: {
        id: userId,
        nome: 'Professor Único',
        email: 'professor@teste.com',
        senha: 'senha123',
        created_at: new Date(),
      },
      disciplina: {
        id: disciplinaId,
        nome: 'Matemática',
        cargaHorariaTotal: 60,
        created_at: new Date(),
      },
      turma: {
        id: 'turma-01',
        nome: 'Turma A',
        numAlunos: 30,
        periodo: 1,
        turno: 'MATUTINO',
        created_at: new Date(),
      },
      sala: {
        id: salaId,
        nome: 'Sala 101',
        predio: 'Prédio A',
        capacidade: 40,
        tipo: 'AULA',
      },
      horario: {
        id: 'horario-01',
        codigo: 'M1',
        dia_semana: 'SEGUNDA',
        horarioInicio: new Date('2024-01-01T08:00:00'),
        horarioFim: new Date('2024-01-01T09:00:00'),
      },
    });

    // Segunda alocação - mesmo professor e disciplina, turma diferente
    await alocacoesRepository.createWithCustomData({
      id: 'alocacao-02',
      id_user: userId,
      id_disciplina: disciplinaId,
      id_turma: 'turma-02',
      id_sala: salaId,
      id_horario: 'horario-02',
      user: {
        id: userId,
        nome: 'Professor Único',
        email: 'professor@teste.com',
        senha: 'senha123',
        created_at: new Date(),
      },
      disciplina: {
        id: disciplinaId,
        nome: 'Matemática',
        cargaHorariaTotal: 60,
        created_at: new Date(),
      },
      turma: {
        id: 'turma-02',
        nome: 'Turma B',
        numAlunos: 25,
        periodo: 2,
        turno: 'VESPERTINO',
        created_at: new Date(),
      },
      sala: {
        id: salaId,
        nome: 'Sala 101',
        predio: 'Prédio A',
        capacidade: 40,
        tipo: 'AULA',
      },
      horario: {
        id: 'horario-02',
        codigo: 'M2',
        dia_semana: 'SEGUNDA',
        horarioInicio: new Date('2024-01-01T09:00:00'),
        horarioFim: new Date('2024-01-01T10:00:00'),
      },
    });

    const { resumo } = await sut.execute({ salaId });

    expect(resumo.totalAlocacoes).toBe(2);
    expect(resumo.disciplinasUnicas).toBe(1); // Mesma disciplina
    expect(resumo.professoresUnicos).toBe(1); // Mesmo professor
    expect(resumo.turmasUnicas).toBe(2); // Turmas diferentes
  });

  it('deve ignorar alocações de outras salas', async () => {
    const salaId = 'sala-01';
    const outraSalaId = 'sala-02';

    // Alocação na sala desejada
    await alocacoesRepository.createWithCustomData({
      id: 'alocacao-01',
      id_user: 'user-01',
      id_disciplina: 'disciplina-01',
      id_turma: 'turma-01',
      id_sala: salaId,
      id_horario: 'horario-01',
      user: {
        id: 'user-01',
        nome: 'Professor A',
        email: 'professora@teste.com',
        senha: 'senha123',
        created_at: new Date(),
      },
      disciplina: {
        id: 'disciplina-01',
        nome: 'Matemática',
        cargaHorariaTotal: 60,
        created_at: new Date(),
      },
      turma: {
        id: 'turma-01',
        nome: 'Turma A',
        numAlunos: 30,
        periodo: 1,
        turno: 'MATUTINO',
        created_at: new Date(),
      },
      sala: {
        id: salaId,
        nome: 'Sala 101',
        predio: 'Prédio A',
        capacidade: 40,
        tipo: 'AULA',
      },
      horario: {
        id: 'horario-01',
        codigo: 'M1',
        dia_semana: 'SEGUNDA',
        horarioInicio: new Date('2024-01-01T08:00:00'),
        horarioFim: new Date('2024-01-01T09:00:00'),
      },
    });

    // Alocação em outra sala
    await alocacoesRepository.createWithCustomData({
      id: 'alocacao-02',
      id_user: 'user-02',
      id_disciplina: 'disciplina-02',
      id_turma: 'turma-02',
      id_sala: outraSalaId,
      id_horario: 'horario-02',
      user: {
        id: 'user-02',
        nome: 'Professor B',
        email: 'professorb@teste.com',
        senha: 'senha123',
        created_at: new Date(),
      },
      disciplina: {
        id: 'disciplina-02',
        nome: 'Física',
        cargaHorariaTotal: 80,
        created_at: new Date(),
      },
      turma: {
        id: 'turma-02',
        nome: 'Turma B',
        numAlunos: 25,
        periodo: 2,
        turno: 'VESPERTINO',
        created_at: new Date(),
      },
      sala: {
        id: outraSalaId,
        nome: 'Sala 102',
        predio: 'Prédio B',
        capacidade: 30,
        tipo: 'LABORATORIO',
      },
      horario: {
        id: 'horario-02',
        codigo: 'M1',
        dia_semana: 'SEGUNDA',
        horarioInicio: new Date('2024-01-01T08:00:00'),
        horarioFim: new Date('2024-01-01T09:00:00'),
      },
    });

    const { grade, resumo } = await sut.execute({ salaId });

    expect(grade.SEGUNDA.M1?.disciplina.nome).toBe('Matemática');
    expect(grade.SEGUNDA.M1?.professor.nome).toBe('Professor A');
    expect(resumo.totalAlocacoes).toBe(1); // Apenas a alocação da sala desejada
    expect(resumo.disciplinasUnicas).toBe(1);
    expect(resumo.professoresUnicos).toBe(1);
    expect(resumo.turmasUnicas).toBe(1);
  });
});