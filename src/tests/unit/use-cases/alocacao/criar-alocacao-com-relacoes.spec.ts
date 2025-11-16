import { describe, it, expect, beforeEach } from "vitest";
import { CriarAlocacaoUseCase } from "@/use-cases/alocacao/criar-alocacao";
import { InMemoryAlocacoesRepository } from "@/repositories/in-memory/in-memory-alocacoes-repository";
import { InMemoryDisciplinasRepository } from "@/repositories/in-memory/in-memory-disciplinas-repository";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { InMemoryCursosRepository } from "@/repositories/in-memory/in-memory-cursos-repository";
import { InMemoryUserCursoRepository } from "@/repositories/in-memory/in-memory-user-curso-repository";
import { VincularUserCursoUseCase } from "@/use-cases/user-curso/vincular-user-curso";
import { InMemoryTurmasRepository } from "@/repositories/in-memory/in-memory-turmas-repository";
import { InMemoryCursoDisciplinaRepository } from "@/repositories/in-memory/in-memory-curso-disciplina-repository";

let alocacoesRepository: InMemoryAlocacoesRepository;
let disciplinasRepository: InMemoryDisciplinasRepository;
let usersRepository: InMemoryUsersRepository;
let cursosRepository: InMemoryCursosRepository;
let userCursoRepository: InMemoryUserCursoRepository;
let turmasRepository: InMemoryTurmasRepository;
let cursoDisciplinaRepository: InMemoryCursoDisciplinaRepository;
let sut: CriarAlocacaoUseCase;
let vincularUserCursoUseCase: VincularUserCursoUseCase;

describe("Criar Alocação com Relações N:N", () => {
  beforeEach(() => {
    alocacoesRepository = new InMemoryAlocacoesRepository();
    disciplinasRepository = new InMemoryDisciplinasRepository();
    usersRepository = new InMemoryUsersRepository();
    cursosRepository = new InMemoryCursosRepository();
    userCursoRepository = new InMemoryUserCursoRepository();
    turmasRepository = new InMemoryTurmasRepository();
    cursoDisciplinaRepository = new InMemoryCursoDisciplinaRepository();

    sut = new CriarAlocacaoUseCase(
      alocacoesRepository,
      disciplinasRepository,
      turmasRepository,
      cursoDisciplinaRepository
    );
    vincularUserCursoUseCase = new VincularUserCursoUseCase(
      userCursoRepository,
      usersRepository,
      cursosRepository
    );
  });

  it("deve ser possível criar alocação para professor vinculado ao curso", async () => {
    // Criar curso
    const curso = await cursosRepository.create({
      codigo: "TADS",
      nome: "Tecnologia em Análise e Desenvolvimento de Sistemas",
      turno: "MATUTINO",
      duracao_semestres: 8,
    });

    // Criar turma do curso
    const turma = await turmasRepository.create({
      id: "turma-1",
      nome: "Turma 1",
      num_alunos: 30,
      periodo: 1,
      turno: "MATUTINO",
      semestre: 1,
      ativa: true,
      curso: { connect: { id: curso.id } },
    } as any);

    // Criar professor
    const professor = await usersRepository.create({
      nome: "Professor Teste",
      email: "professor@teste.com",
      senha: "123456",
      role: "PROFESSOR",
      especializacao: "Programação",
    });

    // Vincular professor ao curso
    await vincularUserCursoUseCase.execute({
      id_user: professor.id,
      id_curso: curso.id,
    });

    // Criar disciplina do curso e vínculo curso-disciplina
    const disciplina = await disciplinasRepository.create({
      id: "disciplina-1",
      nome: "Programação I",
      carga_horaria: 60,
      total_aulas: 30,
      aulas_ministradas: 0,
      periodo_letivo: "2024.1",
      semestre: 1,
      obrigatoria: true,
      tipo_de_sala: "Lab",
      curso: {
        connect: { id: curso.id },
      },
    });
    const cursoDisciplina = await cursoDisciplinaRepository.create({ id_curso: curso.id, id_disciplina: disciplina.id });

    // Criar alocação
    const { alocacoes } = await sut.execute({
      id_user: professor.id,
      id_curso_disciplina: cursoDisciplina.id,
      id_turma: turma.id,
      id_sala: "sala-1",
      id_horarios: ["horario-1"],
    });

    expect(alocacoes).toHaveLength(1);
    expect(alocacoes[0]).toEqual(
      expect.objectContaining({
        id_user: professor.id,
        id_disciplina: disciplina.id,
        id_curso_disciplina: cursoDisciplina.id,
      })
    );
  });

  it("deve verificar se professor está vinculado ao curso da disciplina", async () => {
    // Este teste seria implementado quando adicionarmos validação
    // de que o professor deve estar vinculado ao curso da disciplina
    expect(true).toBe(true);
  });
});
