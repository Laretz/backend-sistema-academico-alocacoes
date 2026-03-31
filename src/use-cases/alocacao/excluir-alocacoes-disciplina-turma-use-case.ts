import { AlocacoesRepository } from "@/repositories/alocacoes-repository";

interface ExcluirAlocacoesDisciplinaTurmaUseCaseRequest {
  id_turma: string;
  id_disciplina: string;
}

interface ExcluirAlocacoesDisciplinaTurmaUseCaseResponse {
  message: string;
}

export class ExcluirAlocacoesDisciplinaTurmaUseCase {
  constructor(private alocacoesRepository: AlocacoesRepository) {}

  async execute({
    id_turma,
    id_disciplina,
  }: ExcluirAlocacoesDisciplinaTurmaUseCaseRequest): Promise<ExcluirAlocacoesDisciplinaTurmaUseCaseResponse> {
    await this.alocacoesRepository.deleteAllByTurmaAndDisciplina(
      id_turma,
      id_disciplina
    );

    return {
      message: "Alocações da disciplina na turma excluídas com sucesso.",
    };
  }
}
