import { AlocacoesRepository } from "../../repositories/alocacoes-repository";
import { RecursoNaoEncontradoError } from "../errors/recurso-nao-encontrado";

interface BuscarAlocacaoUseCaseRequest {
    id: string;
}

export class BuscarAlocacaoUseCase {
    constructor(private alocacoesRepository: AlocacoesRepository) {}

    async execute({ id }: BuscarAlocacaoUseCaseRequest) {
        const alocacao = await this.alocacoesRepository.findById(id);

        if (!alocacao) {
            throw new RecursoNaoEncontradoError();
        }

        return { alocacao };
    }
}