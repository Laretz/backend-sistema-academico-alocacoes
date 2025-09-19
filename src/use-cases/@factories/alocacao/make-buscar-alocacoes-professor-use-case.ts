import { PrismaAlocacoesRepository } from "@/repositories/prisma-repositories/prisma-alocacoes-repository";
import { BuscarAlocacoesProfessorUseCase } from "@/use-cases/alocacao/buscar-alocacoes-professor";

export function makeBuscarAlocacoesProfessorUseCase() {
  const alocacoesRepository = new PrismaAlocacoesRepository();
  const buscarAlocacoesProfessorUseCase = new BuscarAlocacoesProfessorUseCase(
    alocacoesRepository
  );

  return buscarAlocacoesProfessorUseCase;
}