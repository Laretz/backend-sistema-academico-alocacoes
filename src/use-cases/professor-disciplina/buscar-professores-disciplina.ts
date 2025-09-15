import { ProfessorDisciplinaRepository } from "@/repositories/professor-disciplina-repository";
import { DisciplinasRepository } from "@/repositories/disciplinas-repository";
import { RecursoNaoEncontradoError } from "../errors/recurso-nao-encontrado";

interface BuscarProfessoresDisciplinaUseCaseRequest {
  id_disciplina: string;
}

interface BuscarProfessoresDisciplinaUseCaseResponse {
  professores: Array<{
    id: string;
    nome: string;
    email: string;
    especializacao: string | null;
    carga_horaria_max: number | null;
    preferencia: string | null;
    vinculo: {
      id: string;
      ativo: boolean;
      created_at: Date;
    };
  }>;
}

export class BuscarProfessoresDisciplinaUseCase {
  constructor(
    private professorDisciplinaRepository: ProfessorDisciplinaRepository,
    private disciplinasRepository: DisciplinasRepository
  ) {}

  async execute({
    id_disciplina,
  }: BuscarProfessoresDisciplinaUseCaseRequest): Promise<BuscarProfessoresDisciplinaUseCaseResponse> {
    // Verificar se a disciplina existe
    const disciplina = await this.disciplinasRepository.findById(id_disciplina);
    if (!disciplina) {
      throw new RecursoNaoEncontradoError();
    }

    // Buscar professores da disciplina
    const professores =
      await this.professorDisciplinaRepository.findProfessoresByDisciplina(
        id_disciplina
      );

    return { professores };
  }
}
