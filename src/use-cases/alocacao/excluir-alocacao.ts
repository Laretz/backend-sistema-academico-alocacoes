import { AlocacoesRepository } from "../../repositories/alocacoes-repository";
import { RecursoNaoEncontradoError } from "../errors/recurso-nao-encontrado";

interface ExcluirAlocacaoUseCaseRequest {
    id: string;
}

export class ExcluirAlocacaoUseCase {
    constructor(private alocacoesRepository: AlocacoesRepository) {}

    async execute({ id }: ExcluirAlocacaoUseCaseRequest) {
        const alocacaoExiste = await this.alocacoesRepository.findById(id);

        if (!alocacaoExiste) {
            throw new RecursoNaoEncontradoError();
        }

        await this.alocacoesRepository.delete(id);
    }
}