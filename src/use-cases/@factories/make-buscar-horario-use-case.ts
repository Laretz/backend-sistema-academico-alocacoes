import { PrismaHorariosRepository } from "../../repositories/prisma-repositories/prisma-horarios-repository";
import { BuscarHorarioUseCase } from "../horario/buscar-horario";

export function makeBuscarHorarioUseCase() {
    const horariosRepository = new PrismaHorariosRepository();
    const buscarHorarioUseCase = new BuscarHorarioUseCase(horariosRepository);
    
    return buscarHorarioUseCase;
}