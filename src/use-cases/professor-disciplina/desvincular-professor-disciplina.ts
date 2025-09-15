import { ProfessorDisciplinaRepository } from "@/repositories/professor-disciplina-repository";
import { RecursoNaoEncontradoError } from "../errors/recurso-nao-encontrado";

interface DesvincularProfessorDisciplinaUseCaseRequest {
  id_user: string;
  id_disciplina: string;
}

interface DesvincularProfessorDisciplinaUseCaseResponse {
  success: boolean;
}

export class DesvincularProfessorDisciplinaUseCase {
  constructor(
    private professorDisciplinaRepository: ProfessorDisciplinaRepository
  ) {}

  async execute({
    id_user,
    id_disciplina,
  }: DesvincularProfessorDisciplinaUseCaseRequest): Promise<DesvincularProfessorDisciplinaUseCaseResponse> {
    // Verificar se o vínculo existe
    const vinculo =
      await this.professorDisciplinaRepository.findByUserAndDisciplina(
        id_user,
        id_disciplina
      );

    if (!vinculo) {
      throw new RecursoNaoEncontradoError();
    }

    // Desativar o vínculo (soft delete)
    await this.professorDisciplinaRepository.update(vinculo.id, {
      ativo: false,
    });

    return { success: true };
  }
}
