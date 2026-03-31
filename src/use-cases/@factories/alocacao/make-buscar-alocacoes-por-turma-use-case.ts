import { PrismaAlocacoesRepository } from "@/repositories/prisma-repositories/prisma-alocacoes-repository";
import { BuscarAlocacoesPorTurmaUseCase } from "../../alocacao/buscar-alocacoes-por-turma";

export function makeBuscarAlocacoesPorTurmaUseCase() {
  const alocacoesRepository = new PrismaAlocacoesRepository();
  const useCase = new BuscarAlocacoesPorTurmaUseCase(alocacoesRepository);

  return useCase;
}
