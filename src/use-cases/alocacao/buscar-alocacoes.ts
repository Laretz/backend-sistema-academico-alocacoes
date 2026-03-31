import { AlocacoesRepository } from "../../repositories/alocacoes-repository";

interface BuscarAlocacoesUseCaseRequest {
  page: number;
  id_turma?: string | undefined;
}

export class BuscarAlocacoesUseCase {
  constructor(private alocacoesRepository: AlocacoesRepository) {}

  async execute({ page, id_turma }: BuscarAlocacoesUseCaseRequest) {
    let alocacoes;

    if (id_turma) {
      // Se id_turma for fornecido, busca todas as alocações da turma sem paginação
      // para garantir que todas as disciplinas sejam exibidas no frontend
      alocacoes = await this.alocacoesRepository.findAllByTurmaId(id_turma);
    } else {
      alocacoes = await this.alocacoesRepository.findMany(page);
    }

    return { alocacoes };
  }
}
