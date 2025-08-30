import { PrismaHorariosRepository } from "../../repositories/prisma-repositories/prisma-horarios-repository";
import { CriarHorarioCodigoUseCase } from "../horario/criar-horario-codigo";

export function makeCriarHorarioCodigoUseCase() {
    const horariosRepository = new PrismaHorariosRepository();
    const criarHorarioCodigoUseCase = new CriarHorarioCodigoUseCase(horariosRepository);
    
    return criarHorarioCodigoUseCase;
}