import { describe, it, expect } from "vitest";
import { InMemoryAlocacoesRepository } from "@/repositories/in-memory/in-memory-alocacoes-repository";
import { BuscarAlocacoesProfessorUseCase } from "@/use-cases/alocacao/buscar-alocacoes-professor";

describe("BuscarAlocacoesProfessorUseCase", () => {
  it("deve retornar alocações do professor paginadas (20 por página)", async () => {
    const repo = new InMemoryAlocacoesRepository();
    const professorId = "prof-1";
    // cria 25 alocações para o mesmo professor
    for (let i = 0; i < 25; i++) {
      await repo.createWithCustomData({ id_user: professorId });
    }
    // cria alocações de outro professor
    for (let i = 0; i < 10; i++) {
      await repo.createWithCustomData({ id_user: "prof-2" });
    }

    const sut = new BuscarAlocacoesProfessorUseCase(repo);
    const page1 = await sut.execute({ id_professor: professorId, page: 1 });
    const page2 = await sut.execute({ id_professor: professorId, page: 2 });

    expect(page1.alocacoes).toHaveLength(20);
    expect(page2.alocacoes).toHaveLength(5);
    // valida que todas retornadas são do professor
    expect(page1.alocacoes.every(a => a.id_user === professorId)).toBe(true);
    expect(page2.alocacoes.every(a => a.id_user === professorId)).toBe(true);
  });

  it("deve retornar lista vazia para professor sem alocações", async () => {
    const repo = new InMemoryAlocacoesRepository();
    const sut = new BuscarAlocacoesProfessorUseCase(repo);
    const { alocacoes } = await sut.execute({ id_professor: "prof-sem", page: 1 });
    expect(alocacoes).toHaveLength(0);
  });
});