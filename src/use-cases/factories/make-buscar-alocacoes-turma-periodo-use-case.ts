import { PrismaAlocacoesRepository } from "../../repositories/prisma-repositories/prisma-alocacoes-repository";
import { BuscarAlocacoesTurmaPeriodoUseCase } from "../alocacao/buscar-alocacoes-turma-periodo";

export function makeBuscarAlocacoesTurmaPeriodoUseCase() {
  const alocacoesRepository = new PrismaAlocacoesRepository();
  const buscarAlocacoesTurmaPeriodoUseCase = new BuscarAlocacoesTurmaPeriodoUseCase(alocacoesRepository);

  return buscarAlocacoesTurmaPeriodoUseCase;
}