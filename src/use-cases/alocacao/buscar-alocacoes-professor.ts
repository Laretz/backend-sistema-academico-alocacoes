import { AlocacoesRepository } from "../../repositories/alocacoes-repository";

interface BuscarAlocacoesProfessorUseCaseRequest {
  id_professor: string;
  page: number;
}

export class BuscarAlocacoesProfessorUseCase {
  constructor(private alocacoesRepository: AlocacoesRepository) {}

  async execute({ id_professor, page }: BuscarAlocacoesProfessorUseCaseRequest) {
    const alocacoes = await this.alocacoesRepository.findByUserId(id_professor, page);

    return {
      alocacoes,
    };
  }
}