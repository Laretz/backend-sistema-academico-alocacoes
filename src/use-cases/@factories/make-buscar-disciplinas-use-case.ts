import { PrismaDisciplinasRepository } from "../../repositories/prisma-repositories/prisma-disciplinas-repository";
import { BuscarDisciplinasUseCase } from "../disciplina/buscar-disciplinas";

export function makeBuscarDisciplinasUseCase() {
    const disciplinasRepository = new PrismaDisciplinasRepository();
    const buscarDisciplinasUseCase = new BuscarDisciplinasUseCase(disciplinasRepository);
    
    return buscarDisciplinasUseCase;
}