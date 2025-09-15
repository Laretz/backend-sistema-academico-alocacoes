import { ProfessorDisciplinaRepository } from "@/repositories/professor-disciplina-repository";
import { UsersRepository } from "@/repositories/users-repository";
import { DisciplinasRepository } from "@/repositories/disciplinas-repository";
import { RecursoNaoEncontradoError } from "../errors/recurso-nao-encontrado";

interface VincularProfessorDisciplinaUseCaseRequest {
  id_user: string;
  id_disciplina: string;
}

interface VincularProfessorDisciplinaUseCaseResponse {
  professorDisciplina: {
    id: string;
    id_user: string;
    id_disciplina: string;
    ativo: boolean;
    created_at: Date;
    updated_at: Date;
  };
}

export class VincularProfessorDisciplinaUseCase {
  constructor(
    private professorDisciplinaRepository: ProfessorDisciplinaRepository,
    private usuarioRepository: UsersRepository,
    private disciplinasRepository: DisciplinasRepository
  ) {}

  async execute({
    id_user,
    id_disciplina,
  }: VincularProfessorDisciplinaUseCaseRequest): Promise<VincularProfessorDisciplinaUseCaseResponse> {
    // Verificar se o usuário existe
    const usuario = await this.usuarioRepository.findById(id_user);
    if (!usuario) {
      throw new RecursoNaoEncontradoError();
    }

    // Verificar se a disciplina existe
    const disciplina = await this.disciplinasRepository.findById(id_disciplina);
    if (!disciplina) {
      throw new RecursoNaoEncontradoError();
    }

    // Verificar se o vínculo já existe
    const vinculoExistente =
      await this.professorDisciplinaRepository.findByUserAndDisciplina(
        id_user,
        id_disciplina
      );

    if (vinculoExistente) {
      // Se existe mas está inativo, reativar
      if (!vinculoExistente.ativo) {
        const professorDisciplina =
          await this.professorDisciplinaRepository.update(vinculoExistente.id, {
            ativo: true,
          });
        return { professorDisciplina };
      }
      // Se já existe e está ativo, retornar o existente
      return { professorDisciplina: vinculoExistente };
    }

    // Criar novo vínculo
    const professorDisciplina = await this.professorDisciplinaRepository.create(
      {
        user: {
          connect: { id: id_user }
        },
        disciplina: {
          connect: { id: id_disciplina }
        }
      }
    );

    return { professorDisciplina };
  }
}
