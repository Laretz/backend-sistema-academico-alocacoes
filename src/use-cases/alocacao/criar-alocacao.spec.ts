import { expect, describe, it, beforeEach } from "vitest";
import { CriarAlocacaoUseCase } from "./criar-alocacao";
import { InMemoryAlocacoesRepository } from "../../repositories/in-memory/in-memory-alocacoes-repository";
import { InMemoryDisciplinasRepository } from "../../repositories/in-memory/in-memory-disciplinas-repository";

let alocacoesRepository: InMemoryAlocacoesRepository;
let disciplinasRepository: InMemoryDisciplinasRepository;
let sut: CriarAlocacaoUseCase;

describe("Criar Alocação Use Case", () => {
  beforeEach(() => {
    alocacoesRepository = new InMemoryAlocacoesRepository();
    disciplinasRepository = new InMemoryDisciplinasRepository();
    sut = new CriarAlocacaoUseCase(alocacoesRepository, disciplinasRepository);
  });

  it("deve ser possível criar uma nova alocação", async () => {
    // Criar disciplina primeiro
    await disciplinasRepository.create({
      id: "disciplina-1",
      nome: "Matemática",
      carga_horaria: 80,
      curso: {
        connect: {
          id: "curso-1",
        },
      },
    });

    const { alocacoes } = await sut.execute({
      id_user: "user-1",
      id_disciplina: "disciplina-1",
      id_turma: "turma-1",
      id_sala: "sala-1",
      id_horarios: ["horario-1"],
    });

    expect(alocacoes).toHaveLength(1);
    expect(alocacoes[0]!.id).toEqual(expect.any(String));
    expect(alocacoes[0]!.id_user).toEqual("user-1");
    expect(alocacoes[0]!.id_disciplina).toEqual("disciplina-1");
    expect(alocacoes[0]!.id_turma).toEqual("turma-1");
    expect(alocacoes[0]!.id_sala).toEqual("sala-1");
  });

  it("deve ser possível criar múltiplas alocações para diferentes horários", async () => {
    // Criar disciplina primeiro
    await disciplinasRepository.create({
      id: "disciplina-1",
      nome: "Matemática",
      carga_horaria: 80,
      curso: {
        connect: {
          id: "curso-1",
        },
      },
    });

    const { alocacoes } = await sut.execute({
      id_user: "user-1",
      id_disciplina: "disciplina-1",
      id_turma: "turma-1",
      id_sala: "sala-1",
      id_horarios: ["horario-1", "horario-2", "horario-3"],
    });

    expect(alocacoes).toHaveLength(3);
    expect(alocacoes[0]!.id_user).toEqual("user-1");
    expect(alocacoes[1]!.id_user).toEqual("user-1");
    expect(alocacoes[2]!.id_user).toEqual("user-1");
  });

  it("não deve ser possível criar alocação quando professor já tem alocação no mesmo horário", async () => {
    // Criar uma alocação existente
    await alocacoesRepository.createWithCustomData({
      id: "alocacao-1",
      id_user: "user-1",
      id_disciplina: "disciplina-1",
      id_turma: "turma-1",
      id_sala: "sala-1",
      id_horario: "horario-1",
    });

    // Tentar criar nova alocação com o mesmo professor e horário
    await expect(() =>
      sut.execute({
        id_user: "user-1", // Mesmo professor
        id_disciplina: "disciplina-2",
        id_turma: "turma-2",
        id_sala: "sala-2",
        id_horarios: ["horario-1"], // Mesmo horário
      })
    ).rejects.toThrow("Professor já possui alocação no horário horario-1");
  });

  it("não deve ser possível criar alocação quando sala já está ocupada no mesmo horário", async () => {
    // Criar uma alocação existente
    await alocacoesRepository.createWithCustomData({
      id: "alocacao-1",
      id_user: "user-1",
      id_disciplina: "disciplina-1",
      id_turma: "turma-1",
      id_sala: "sala-1",
      id_horario: "horario-1",
    });

    // Tentar criar nova alocação com a mesma sala e horário
    await expect(() =>
      sut.execute({
        id_user: "user-2",
        id_disciplina: "disciplina-2",
        id_turma: "turma-2",
        id_sala: "sala-1", // Mesma sala
        id_horarios: ["horario-1"], // Mesmo horário
      })
    ).rejects.toThrow("Sala já está ocupada no horário horario-1");
  });

  it("deve ser possível criar alocação com mesmo professor em horários diferentes", async () => {
    // Criar disciplinas primeiro
    await disciplinasRepository.create({
      id: "disciplina-1",
      nome: "Matemática",
      carga_horaria: 80,
      curso: {
        connect: {
          id: "curso-1",
        },
      },
    });

    await disciplinasRepository.create({
      id: "disciplina-2",
      nome: "Física",
      carga_horaria: 60,
      curso: {
        connect: {
          id: "curso-1",
        },
      },
    });

    // Criar uma alocação existente
    await alocacoesRepository.createWithCustomData({
      id: "alocacao-1",
      id_user: "user-1",
      id_disciplina: "disciplina-1",
      id_turma: "turma-1",
      id_sala: "sala-1",
      id_horario: "horario-1",
    });

    // Criar nova alocação com o mesmo professor em horário diferente
    const { alocacoes } = await sut.execute({
      id_user: "user-1", // Mesmo professor
      id_disciplina: "disciplina-2",
      id_turma: "turma-2",
      id_sala: "sala-2",
      id_horarios: ["horario-2"], // Horário diferente
    });

    expect(alocacoes).toHaveLength(1);
    expect(alocacoes[0]!.id_user).toEqual("user-1");
  });

  it("não deve ser possível criar alocação quando turma já tem horário ocupado", async () => {
    // Criar uma alocação existente
    await alocacoesRepository.createWithCustomData({
      id: "alocacao-1",
      id_user: "user-1",
      id_disciplina: "disciplina-1",
      id_turma: "turma-1",
      id_sala: "sala-1",
      id_horario: "horario-1",
    });

    // Tentar criar nova alocação com a mesma turma e horário
    await expect(() =>
      sut.execute({
        id_user: "user-2", // Professor diferente
        id_disciplina: "disciplina-2",
        id_turma: "turma-1", // Mesma turma
        id_sala: "sala-2", // Sala diferente
        id_horarios: ["horario-1"], // Mesmo horário
      })
    ).rejects.toThrow("Turma já possui alocação no horário horario-1");
  });
});
