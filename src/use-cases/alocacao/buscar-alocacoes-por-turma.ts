import { AlocacoesRepository } from "../../repositories/alocacoes-repository";

interface BuscarAlocacoesPorTurmaUseCaseRequest {
  id_turma: string;
}

export class BuscarAlocacoesPorTurmaUseCase {
  constructor(private alocacoesRepository: AlocacoesRepository) {}

  async execute({ id_turma }: BuscarAlocacoesPorTurmaUseCaseRequest) {
    const alocacoes = await this.alocacoesRepository.findAllByTurmaId(id_turma);

    return {
      alocacoes,
    };
  }
}
