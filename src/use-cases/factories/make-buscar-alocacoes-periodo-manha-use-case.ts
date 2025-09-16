import { PrismaAlocacoesRepository } from "../../repositories/prisma-repositories/prisma-alocacoes-repository";
import { BuscarAlocacoesPeriodoManhaUseCase } from "../alocacao/buscar-alocacoes-periodo-manha";

export function makeBuscarAlocacoesPeriodoManhaUseCase() {
  const alocacoesRepository = new PrismaAlocacoesRepository();
  const buscarAlocacoesPeriodoManhaUseCase = new BuscarAlocacoesPeriodoManhaUseCase(alocacoesRepository);

  return buscarAlocacoesPeriodoManhaUseCase;
}