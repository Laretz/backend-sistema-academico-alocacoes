import { AlocacoesRepository } from "../../repositories/alocacoes-repository";

interface CriarAlocacaoUseCaseRequest {
    id_user: string;
    id_disciplina: string;
    id_turma: string;
    id_sala: string;
    id_horarios: string[];
}

export class CriarAlocacaoUseCase {
    constructor(private alocacoesRepository: AlocacoesRepository) {}

    async execute({ id_user, id_disciplina, id_turma, id_sala, id_horarios }: CriarAlocacaoUseCaseRequest) {
        const alocacoes = [];

        // Verificar conflitos antes de criar qualquer alocação
        for (const id_horario of id_horarios) {
            // Verificar se professor já tem alocação neste horário
            const conflitoUser = await this.alocacoesRepository.findByUserIdAndHorarioId(id_user, id_horario);
            if (conflitoUser) {
                throw new Error(`Professor já possui alocação no horário ${id_horario}`);
            }

            // Verificar se sala já está ocupada neste horário
            const conflitoSala = await this.alocacoesRepository.findBySalaIdAndHorarioId(id_sala, id_horario);
            if (conflitoSala) {
                throw new Error(`Sala já está ocupada no horário ${id_horario}`);
            }
        }

        // Se não há conflitos, criar todas as alocações
        for (const id_horario of id_horarios) {
            const alocacao = await this.alocacoesRepository.create({
                user: {
                    connect: { id: id_user }
                },
                disciplina: {
                    connect: { id: id_disciplina }
                },
                turma: {
                    connect: { id: id_turma }
                },
                sala: {
                    connect: { id: id_sala }
                },
                horario: {
                    connect: { id: id_horario }
                },
            });

            alocacoes.push(alocacao);
        }

        return { alocacoes };
    }
}