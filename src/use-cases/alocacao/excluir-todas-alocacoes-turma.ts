import { AlocacoesRepository } from "../../repositories/alocacoes-repository";

interface ExcluirTodasAlocacoesTurmaUseCaseRequest {
  id_turma: string;
}

export class ExcluirTodasAlocacoesTurmaUseCase {
  constructor(private alocacoesRepository: AlocacoesRepository) {}

  async execute({ id_turma }: ExcluirTodasAlocacoesTurmaUseCaseRequest) {
    await this.alocacoesRepository.deleteAllByTurmaId(id_turma);

    return {
      message: "Todas as alocações da turma foram excluídas com sucesso"
    };
  }
}