import { PrismaAlocacoesRepository } from "@/repositories/prisma-repositories/prisma-alocacoes-repository";
import { BuscarAlocacoesUseCase } from "@/use-cases/alocacao/buscar-alocacoes";

export function makeBuscarAlocacoesUseCase() {
  const alocacoesRepository = new PrismaAlocacoesRepository();
  const buscarAlocacoesUseCase = new BuscarAlocacoesUseCase(
    alocacoesRepository
  );

  return buscarAlocacoesUseCase;
}
