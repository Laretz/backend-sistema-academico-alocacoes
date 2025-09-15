import { PrismaAlocacoesRepository } from "@/repositories/prisma-repositories/prisma-alocacoes-repository";
import { BuscarGradeHorariosTurmaUseCase } from "@/use-cases/turma/buscar-grade-horarios-turma";

export function makeBuscarGradeHorariosTurmaUseCase() {
    const alocacoesRepository = new PrismaAlocacoesRepository();
    const buscarGradeHorariosTurmaUseCase = new BuscarGradeHorariosTurmaUseCase(alocacoesRepository);

    return buscarGradeHorariosTurmaUseCase;
}
