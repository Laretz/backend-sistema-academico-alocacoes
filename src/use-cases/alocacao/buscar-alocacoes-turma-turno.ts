import { AlocacoesRepository } from "../../repositories/alocacoes-repository";

interface BuscarAlocacoesTurmaTurnoUseCaseRequest {
  id_turma: string;
  turno: string;
  page: number;
}

export class BuscarAlocacoesTurmaTurnoUseCase {
  constructor(private alocacoesRepository: AlocacoesRepository) {}

  async execute({
    id_turma,
    turno,
    page,
  }: BuscarAlocacoesTurmaTurnoUseCaseRequest) {
    const alocacoes = await this.alocacoesRepository.findByTurmaIdWithTurno(
      id_turma,
      turno,
      page,
    );

    return {
      alocacoes,
    };
  }
}
