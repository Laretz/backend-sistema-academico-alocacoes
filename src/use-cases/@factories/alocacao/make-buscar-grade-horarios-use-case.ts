import { PrismaAlocacoesRepository } from "@/repositories/prisma-repositories/prisma-alocacoes-repository";
import { BuscarGradeHorariosUseCase } from "@/use-cases/alocacao/buscar-grade-horarios";

export function makeBuscarGradeHorariosUseCase() {
  const alocacoesRepository = new PrismaAlocacoesRepository();
  const buscarGradeHorariosUseCase = new BuscarGradeHorariosUseCase(alocacoesRepository);

  return buscarGradeHorariosUseCase;
}