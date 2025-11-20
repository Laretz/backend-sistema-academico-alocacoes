import { describe, it, expect } from "vitest";
import { InMemoryAlocacoesRepository } from "@/repositories/in-memory/in-memory-alocacoes-repository";
import { BuscarAlocacoesTurmaPeriodoUseCase } from "@/use-cases/alocacao/buscar-alocacoes-turma-periodo";

describe("BuscarAlocacoesTurmaPeriodoUseCase", () => {
  it("deve filtrar por turma e período (manhã/tarde/noite) com paginação", async () => {
    const repo = new InMemoryAlocacoesRepository();
    const turmaId = "turma-1";

    // manhã (< 12)
    for (let i = 0; i < 15; i++) {
      await repo.createWithCustomData({
        id_turma: turmaId,
        horario: {
          id: `h-m-${i}`,
          codigo: "M1",
          dia_semana: "SEGUNDA",
          horario_inicio: new Date("2024-01-01T08:00:00"),
          horario_fim: new Date("2024-01-01T09:00:00"),
        },
      } as any);
    }
    // tarde (>=12 <18)
    for (let i = 0; i < 10; i++) {
      await repo.createWithCustomData({
        id_turma: turmaId,
        horario: {
          id: `h-t-${i}`,
          codigo: "T1",
          dia_semana: "TERCA",
          horario_inicio: new Date("2024-01-01T13:00:00"),
          horario_fim: new Date("2024-01-01T14:00:00"),
        },
      } as any);
    }
    // noite (>=18)
    for (let i = 0; i < 7; i++) {
      await repo.createWithCustomData({
        id_turma: turmaId,
        horario: {
          id: `h-n-${i}`,
          codigo: "N1",
          dia_semana: "QUARTA",
          horario_inicio: new Date("2024-01-01T19:00:00"),
          horario_fim: new Date("2024-01-01T20:00:00"),
        },
      } as any);
    }

    const sut = new BuscarAlocacoesTurmaPeriodoUseCase(repo);

    const manha = await sut.execute({ id_turma: turmaId, periodo: "manha", page: 1 });
    expect(manha.alocacoes).toHaveLength(15);

    const tarde = await sut.execute({ id_turma: turmaId, periodo: "tarde", page: 1 });
    expect(tarde.alocacoes).toHaveLength(10);

    const noite = await sut.execute({ id_turma: turmaId, periodo: "noite", page: 1 });
    expect(noite.alocacoes).toHaveLength(7);
  });

  it("deve retornar vazio quando turma não possuir alocações no período", async () => {
    const repo = new InMemoryAlocacoesRepository();
    const sut = new BuscarAlocacoesTurmaPeriodoUseCase(repo);
    const { alocacoes } = await sut.execute({ id_turma: "turma-x", periodo: "manha", page: 1 });
    expect(alocacoes).toHaveLength(0);
  });
});