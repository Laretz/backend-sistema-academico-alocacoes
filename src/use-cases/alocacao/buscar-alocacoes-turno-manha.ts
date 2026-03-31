import { AlocacoesRepository } from "../../repositories/alocacoes-repository";

interface BuscarAlocacoesTurnoManhaUseCaseRequest {
  page: number;
}

export class BuscarAlocacoesTurnoManhaUseCase {
  constructor(private alocacoesRepository: AlocacoesRepository) {}

  async execute({ page }: BuscarAlocacoesTurnoManhaUseCaseRequest) {
    const alocacoes = await this.alocacoesRepository.findByTurnoManha(page);

    return {
      alocacoes,
    };
  }
}