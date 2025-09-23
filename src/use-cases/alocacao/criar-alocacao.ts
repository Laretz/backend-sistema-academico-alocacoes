import { AlocacoesRepository } from "../../repositories/alocacoes-repository";
import { DisciplinasRepository } from "../../repositories/disciplinas-repository";
import { GerarHorarioConsolidadoUseCase } from "../disciplina/gerar-horario-consolidado";

interface CriarAlocacaoUseCaseRequest {
    id_user: string;
    id_disciplina: string;
    id_turma: string;
    id_sala: string;
    id_horarios: string[];
}

export class CriarAlocacaoUseCase {
    constructor(
        private alocacoesRepository: AlocacoesRepository,
        private disciplinasRepository: DisciplinasRepository
    ) {}

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

            // Verificar se turma já tem alocação neste horário
            const conflitoTurma = await this.alocacoesRepository.findByTurmaIdAndHorarioId(id_turma, id_horario);
            if (conflitoTurma) {
                throw new Error(`Turma já possui alocação no horário ${id_horario}`);
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

        // Gerar horário consolidado automaticamente após criar alocações
        const gerarHorarioUseCase = new GerarHorarioConsolidadoUseCase(this.alocacoesRepository);
        const { horarioConsolidado } = await gerarHorarioUseCase.execute({ disciplinaId: id_disciplina });
        
        // Atualizar disciplina com o horário consolidado
        if (horarioConsolidado) {
            await this.disciplinasRepository.update(id_disciplina, { horario_consolidado: horarioConsolidado });
        }

        return { alocacoes };
    }
}