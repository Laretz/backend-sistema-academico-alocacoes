import { TurmasRepository } from "../../repositories/turmas-repository";

interface CriarTurmaUseCaseRequest {
    nome: string;
    num_alunos: number;
    periodo: number;
    turno: string;
    id_curso: string;
}

export class CriarTurmaUseCase {
    constructor(private turmasRepository: TurmasRepository) {}

    async execute({ nome, num_alunos, periodo, turno, id_curso }: CriarTurmaUseCaseRequest) {
        const turma = await this.turmasRepository.create({
            nome,
            num_alunos,
            periodo,
            turno,
            curso: {
                connect: {
                    id: id_curso
                }
            }
        });

        return { turma };
    }
}