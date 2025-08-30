import { DisciplinasRepository } from "../../repositories/disciplinas-repository";

interface CriarDisciplinaUseCaseRequest {
    nome: string;
    cargaHorariaTotal: number;
}

export class CriarDisciplinaUseCase {
    constructor(private disciplinasRepository: DisciplinasRepository) {}

    async execute({ nome, cargaHorariaTotal }: CriarDisciplinaUseCaseRequest) {
        const disciplina = await this.disciplinasRepository.create({
            nome,
            cargaHorariaTotal,
        });

        return { disciplina };
    }
}