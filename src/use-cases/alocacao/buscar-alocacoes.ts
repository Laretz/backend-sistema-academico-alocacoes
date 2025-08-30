import { AlocacoesRepository } from "../../repositories/alocacoes-repository";

interface BuscarAlocacoesUseCaseRequest {
    page: number;
}

export class BuscarAlocacoesUseCase {
    constructor(private alocacoesRepository: AlocacoesRepository) {}

    async execute({ page }: BuscarAlocacoesUseCaseRequest) {
        const alocacoes = await this.alocacoesRepository.findMany(page);

        return { alocacoes };
    }
}