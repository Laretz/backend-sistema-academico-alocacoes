import { PrismaDisciplinasRepository } from "../../repositories/prisma-repositories/prisma-disciplinas-repository";
import { ExcluirDisciplinaUseCase } from "../disciplina/excluir-disciplina";

export function makeExcluirDisciplinaUseCase() {
    const disciplinasRepository = new PrismaDisciplinasRepository();
    const excluirDisciplinaUseCase = new ExcluirDisciplinaUseCase(disciplinasRepository);
    
    return excluirDisciplinaUseCase;
}