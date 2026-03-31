import { PrismaAlocacoesRepository } from "@/repositories/prisma-repositories/prisma-alocacoes-repository";
import { BuscarAlocacoesTurnoManhaUseCase } from "@/use-cases/alocacao/buscar-alocacoes-turno-manha";

export function makeBuscarAlocacoesTurnoManhaUseCase() {
  const alocacoesRepository = new PrismaAlocacoesRepository();
  const buscarAlocacoesTurnoManhaUseCase = new BuscarAlocacoesTurnoManhaUseCase(alocacoesRepository);

  return buscarAlocacoesTurnoManhaUseCase;
}