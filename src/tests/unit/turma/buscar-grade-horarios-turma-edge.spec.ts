import { describe, it, expect } from "vitest";
import { InMemoryAlocacoesRepository } from "@/repositories/in-memory/in-memory-alocacoes-repository";
import { BuscarGradeHorariosTurmaUseCase } from "@/use-cases/turma/buscar-grade-horarios-turma";

describe("BuscarGradeHorariosTurmaUseCase — casos de dados incompletos", () => {
  it("deve ignorar alocação sem relações obrigatórias", async () => {
    const repo = new InMemoryAlocacoesRepository();
    const a = await repo.createWithCustomData({ id_turma: "t1" });
    const idx = repo.items.findIndex(i => i.id === a.id);
    (repo.items[idx] as any).horario = undefined;
    const sut = new BuscarGradeHorariosTurmaUseCase(repo as any);
    const res = await sut.execute({ turmaId: "t1" });
    expect(res.resumo.totalAlocacoes).toBeGreaterThan(0);
  });

  it("deve ignorar alocação com dia/código inexistentes na grade", async () => {
    const repo = new InMemoryAlocacoesRepository();
    const a = await repo.createWithCustomData({ id_turma: "t2", horario: { id: "h-x", codigo: "X9", dia_semana: "DOMINGO", horario_inicio: new Date(), horario_fim: new Date() } as any });
    const sut = new BuscarGradeHorariosTurmaUseCase(repo as any);
    const res = await sut.execute({ turmaId: "t2" });
    const filled = Object.values(res.grade).flatMap((day: any) => Object.values(day)).filter((v) => v !== null).length;
    expect(filled).toBe(0);
  });
});