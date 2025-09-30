import { DisciplinasRepository } from "../../repositories/disciplinas-repository";

export class BuscarDisciplinasUseCase {
    constructor(private disciplinasRepository: DisciplinasRepository) {}

    async execute() {
        const disciplinas = await this.disciplinasRepository.findAll();

        return { disciplinas };
    }
}