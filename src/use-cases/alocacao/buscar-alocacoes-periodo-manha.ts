import { AlocacoesRepository } from "../../repositories/alocacoes-repository";

interface BuscarAlocacoesPeriodoManhaUseCaseRequest {
  page: number;
}

export class BuscarAlocacoesPeriodoManhaUseCase {
  constructor(private alocacoesRepository: AlocacoesRepository) {}

  async execute({ page }: BuscarAlocacoesPeriodoManhaUseCaseRequest) {
    const alocacoes = await this.alocacoesRepository.findByPeriodoManha(page);

    return {
      alocacoes,
    };
  }
}