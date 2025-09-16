import { AlocacoesRepository } from "../../repositories/alocacoes-repository";
import { DisciplinasRepository } from "../../repositories/disciplinas-repository";
import { RecursoNaoEncontradoError } from "../errors/recurso-nao-encontrado";
import { GerarHorarioConsolidadoUseCase } from "../disciplina/gerar-horario-consolidado";

interface ExcluirAlocacaoUseCaseRequest {
    id: string;
}

export class ExcluirAlocacaoUseCase {
    constructor(
        private alocacoesRepository: AlocacoesRepository,
        private disciplinasRepository: DisciplinasRepository
    ) {}

    async execute({ id }: ExcluirAlocacaoUseCaseRequest) {
        const alocacaoExiste = await this.alocacoesRepository.findById(id);

        if (!alocacaoExiste) {
            throw new RecursoNaoEncontradoError();
        }

        // Guardar o ID da disciplina antes de excluir
        const disciplinaId = alocacaoExiste.id_disciplina;
        
        await this.alocacoesRepository.delete(id);
        
        // Regenerar horário consolidado após excluir alocação
        const gerarHorarioUseCase = new GerarHorarioConsolidadoUseCase(this.alocacoesRepository);
        const { horarioConsolidado } = await gerarHorarioUseCase.execute({ disciplinaId });
        
        // Atualizar disciplina com o horário consolidado (pode ser vazio se não há mais alocações)
        await this.disciplinasRepository.update(disciplinaId, { horario_consolidado: horarioConsolidado || null });
    }
}