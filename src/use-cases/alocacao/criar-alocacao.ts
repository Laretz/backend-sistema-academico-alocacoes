import { AlocacoesRepository } from "../../repositories/alocacoes-repository";
import { DisciplinasRepository } from "../../repositories/disciplinas-repository";
import { GerarHorarioConsolidadoUseCase } from "../disciplina/gerar-horario-consolidado";
import { TurmasRepository } from "../../repositories/turmas-repository";
import { CursoDisciplinaRepository } from "../../repositories/curso-disciplina-repository";

interface CriarAlocacaoUseCaseRequest {
    id_user: string;
    id_curso_disciplina: string; // obrigatório
    id_turma: string;
    id_sala: string;
    id_horarios: string[];
}

export class CriarAlocacaoUseCase {
    constructor(
        private alocacoesRepository: AlocacoesRepository,
        private disciplinasRepository: DisciplinasRepository,
        private turmasRepository: TurmasRepository,
        private cursoDisciplinaRepository: CursoDisciplinaRepository,
    ) {}

    async execute({ id_user, id_curso_disciplina, id_turma, id_sala, id_horarios }: CriarAlocacaoUseCaseRequest) {
        const alocacoes: any[] = [];

        // Validar turma e obter curso
        const turma = await this.turmasRepository.findById(id_turma);
        if (!turma) {
            throw new Error("Turma não encontrada");
        }
        const turmaCursoId = turma.id_curso;

        // Validar CursoDisciplina e obter disciplina
        const cursoDisciplina = await this.cursoDisciplinaRepository.findById(id_curso_disciplina);
        if (!cursoDisciplina) {
            throw new Error("CursoDisciplina não encontrado");
        }
        if (cursoDisciplina.id_curso !== turmaCursoId) {
            throw new Error("CursoDisciplina não pertence ao curso da turma");
        }
        const disciplinaId = cursoDisciplina.id_disciplina;

        // Percorrer horários, criar apenas os válidos; em caso de conflito, lançar erro conforme testes
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

            // Sem conflitos, criar alocação (sempre conectando cursoDisciplina)
            const alocacao = await this.alocacoesRepository.create({
                user: { connect: { id: id_user } },
                disciplina: { connect: { id: disciplinaId! } },
                cursoDisciplina: { connect: { id: id_curso_disciplina } },
                turma: { connect: { id: id_turma } },
                sala: { connect: { id: id_sala } },
                horario: { connect: { id: id_horario } },
            });

            alocacoes.push(alocacao);
        }

        // Gerar horário consolidado automaticamente após criar alocações (se houve alguma)
        if (alocacoes.length > 0) {
            const gerarHorarioUseCase = new GerarHorarioConsolidadoUseCase(this.alocacoesRepository);
            const { horarioConsolidado } = await gerarHorarioUseCase.execute({ disciplinaId: disciplinaId! });
            
            // Atualizar disciplina com o horário consolidado
            if (horarioConsolidado) {
                await this.disciplinasRepository.update(disciplinaId!, { horario_consolidado: horarioConsolidado });
            }
        }

        return { alocacoes, conflitos: [] };
    }
}