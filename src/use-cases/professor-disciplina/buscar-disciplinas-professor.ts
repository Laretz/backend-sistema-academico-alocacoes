import { ProfessorDisciplinaRepository } from "@/repositories/professor-disciplina-repository";
import { DisciplinasRepository } from "@/repositories/disciplinas-repository";
import { UsersRepository } from "@/repositories/users-repository";
import { RecursoNaoEncontradoError } from "../errors/recurso-nao-encontrado";

interface BuscarDisciplinasProfessorUseCaseRequest {
  id_user: string;
}

interface BuscarDisciplinasProfessorUseCaseResponse {
  disciplinas: Array<{
    id: string;
    nome: string;
    carga_horaria: number;
    total_aulas: number;
    carga_horaria_atual: number;
    tipo_de_sala: string;
    codigo: string | null;
    semestre: number;
    obrigatoria: boolean;
    curso: {
      id: string;
      nome: string;
      codigo: string;
    };
    vinculo: {
      id: string;
      ativo: boolean;
      created_at: Date;
    };
  }>;
}

export class BuscarDisciplinasProfessorUseCase {
  constructor(
    private professorDisciplinaRepository: ProfessorDisciplinaRepository,
    private disciplinasRepository: DisciplinasRepository,
    private usuarioRepository: UsersRepository
  ) {}

  async execute({
    id_user,
  }: BuscarDisciplinasProfessorUseCaseRequest): Promise<BuscarDisciplinasProfessorUseCaseResponse> {
    // Verificar se o usuário existe
    const usuario = await this.usuarioRepository.findById(id_user);
    if (!usuario) {
      throw new RecursoNaoEncontradoError();
    }

    // Buscar disciplinas do professor
    const disciplinas =
      await this.professorDisciplinaRepository.findDisciplinasByUser(id_user);

    return { disciplinas };
  }
}
