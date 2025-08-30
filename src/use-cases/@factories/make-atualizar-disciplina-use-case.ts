import { PrismaDisciplinasRepository } from "../../repositories/prisma-repositories/prisma-disciplinas-repository";
import { AtualizarDisciplinaUseCase } from "../disciplina/atualizar-disciplina";

export function makeAtualizarDisciplinaUseCase() {
    const disciplinasRepository = new PrismaDisciplinasRepository();
    const atualizarDisciplinaUseCase = new AtualizarDisciplinaUseCase(disciplinasRepository);
    
    return atualizarDisciplinaUseCase;
}