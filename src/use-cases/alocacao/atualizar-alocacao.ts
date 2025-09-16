import { AlocacoesRepository } from "../../repositories/alocacoes-repository";
import { DisciplinasRepository } from "../../repositories/disciplinas-repository";
import { RecursoNaoEncontradoError } from "../errors/recurso-nao-encontrado";
import { GerarHorarioConsolidadoUseCase } from "../disciplina/gerar-horario-consolidado";

interface AtualizarAlocacaoUseCaseRequest {
    id: string;
    id_user: string | undefined;
    id_disciplina: string | undefined;
    id_turma: string | undefined;
    id_sala: string | undefined;
    id_horario: string | undefined;
}

export class AtualizarAlocacaoUseCase {
    constructor(
        private alocacoesRepository: AlocacoesRepository,
        private disciplinasRepository: DisciplinasRepository
    ) {}

    async execute({ id, id_user, id_disciplina, id_turma, id_sala, id_horario }: AtualizarAlocacaoUseCaseRequest) {
        const alocacaoExiste = await this.alocacoesRepository.findById(id);

        if (!alocacaoExiste) {
            throw new RecursoNaoEncontradoError();
        }

        // Cria um objeto com apenas os campos que foram fornecidos
        const updateData: {
            user?: { connect: { id: string } };
            disciplina?: { connect: { id: string } };
            turma?: { connect: { id: string } };
            sala?: { connect: { id: string } };
            horario?: { connect: { id: string } };
        } = {};
        
        if (id_user !== undefined) {
            updateData.user = {
                connect: { id: id_user }
            };
        }
        
        if (id_disciplina !== undefined) {
            updateData.disciplina = {
                connect: { id: id_disciplina }
            };
        }
        
        if (id_turma !== undefined) {
            updateData.turma = {
                connect: { id: id_turma }
            };
        }
        
        if (id_sala !== undefined) {
            updateData.sala = {
                connect: { id: id_sala }
            };
        }
        
        if (id_horario !== undefined) {
            updateData.horario = {
                connect: { id: id_horario }
            };
        }
        
        const alocacao = await this.alocacoesRepository.update(id, updateData);

        // Gerar horário consolidado automaticamente após atualizar alocação
        if (id_disciplina !== undefined || alocacaoExiste.id_disciplina) {
            const disciplinaId = id_disciplina || alocacaoExiste.id_disciplina;
            const gerarHorarioUseCase = new GerarHorarioConsolidadoUseCase(this.alocacoesRepository);
            const { horarioConsolidado } = await gerarHorarioUseCase.execute({ disciplinaId });
            
            // Atualizar disciplina com o horário consolidado
            if (horarioConsolidado) {
                await this.disciplinasRepository.update(disciplinaId, { horario_consolidado: horarioConsolidado });
            }
        }

        return { alocacao };
    }
}