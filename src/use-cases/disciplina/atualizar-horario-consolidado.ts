import { DisciplinasRepository } from "../../repositories/disciplinas-repository";
import { AlocacoesRepository } from "../../repositories/alocacoes-repository";
import { RecursoNaoEncontradoError } from "../errors/recurso-nao-encontrado";
import { GerarHorarioConsolidadoUseCase } from "./gerar-horario-consolidado";

interface AtualizarHorarioConsolidadoUseCaseRequest {
  disciplinaId: string;
}

interface AtualizarHorarioConsolidadoUseCaseResponse {
  disciplina: {
    id: string;
    horario_consolidado: string | null;
  };
}

export class AtualizarHorarioConsolidadoUseCase {
  constructor(
    private disciplinasRepository: DisciplinasRepository,
    private alocacoesRepository: AlocacoesRepository
  ) {}

  async execute({ disciplinaId }: AtualizarHorarioConsolidadoUseCaseRequest): Promise<AtualizarHorarioConsolidadoUseCaseResponse> {
    // Verificar se a disciplina existe
    const disciplinaExiste = await this.disciplinasRepository.findById(disciplinaId);

    if (!disciplinaExiste) {
      throw new RecursoNaoEncontradoError();
    }

    // Gerar horário consolidado
    const gerarHorarioUseCase = new GerarHorarioConsolidadoUseCase(this.alocacoesRepository);
    const { horarioConsolidado } = await gerarHorarioUseCase.execute({ disciplinaId });
    
    // Atualizar disciplina com o horário consolidado
    const disciplina = await this.disciplinasRepository.update(disciplinaId, { 
      horario_consolidado: horarioConsolidado || null 
    });

    return {
      disciplina: {
        id: disciplina.id,
        horario_consolidado: disciplina.horario_consolidado
      }
    };
  }
}