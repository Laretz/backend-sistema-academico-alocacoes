import { PrismaAlocacoesRepository } from "@/repositories/prisma-repositories/prisma-alocacoes-repository";
import { BuscarAlocacoesTurmaTurnoUseCase } from "../../alocacao/buscar-alocacoes-turma-turno";

export function makeBuscarAlocacoesTurmaTurnoUseCase() {
  const alocacoesRepository = new PrismaAlocacoesRepository();
  const buscarAlocacoesTurmaTurnoUseCase = new BuscarAlocacoesTurmaTurnoUseCase(alocacoesRepository);

  return buscarAlocacoesTurmaTurnoUseCase;
}