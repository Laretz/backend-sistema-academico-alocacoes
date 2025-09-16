import { AlocacoesRepository } from "../../repositories/alocacoes-repository";

interface BuscarAlocacoesTurmaPeriodoUseCaseRequest {
  id_turma: string;
  periodo: string;
  page: number;
}

export class BuscarAlocacoesTurmaPeriodoUseCase {
  constructor(private alocacoesRepository: AlocacoesRepository) {}

  async execute({ id_turma, periodo, page }: BuscarAlocacoesTurmaPeriodoUseCaseRequest) {
    const alocacoes = await this.alocacoesRepository.findByTurmaIdWithPeriodo(id_turma, periodo, page);

    return {
      alocacoes,
    };
  }
}