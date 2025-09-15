import { PrismaAlocacoesRepository } from "@/repositories/prisma-repositories/prisma-alocacoes-repository";
import { BuscarGradeHorariosSalaUseCase } from "@/use-cases/sala/buscar-grade-horarios-sala";

export function makeBuscarGradeHorariosSalaUseCase() {
    const alocacoesRepository = new PrismaAlocacoesRepository();
    const buscarGradeHorariosSalaUseCase = new BuscarGradeHorariosSalaUseCase(alocacoesRepository);

    return buscarGradeHorariosSalaUseCase;
}
