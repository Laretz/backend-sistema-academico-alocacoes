import { TurmasRepository } from "../../repositories/turmas-repository";

interface CriarTurmaUseCaseRequest {
    nome: string;
    numAlunos: number;
    periodo: number;
    turno: string;
}

export class CriarTurmaUseCase {
    constructor(private turmasRepository: TurmasRepository) {}

    async execute({ nome, numAlunos, periodo, turno }: CriarTurmaUseCaseRequest) {
        const turma = await this.turmasRepository.create({
            nome,
            numAlunos,
            periodo,
            turno,
        });

        return { turma };
    }
}