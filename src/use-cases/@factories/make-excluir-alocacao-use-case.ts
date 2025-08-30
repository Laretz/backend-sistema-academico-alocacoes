import { PrismaAlocacoesRepository } from "../../repositories/prisma-repositories/prisma-alocacoes-repository";
import { ExcluirAlocacaoUseCase } from "../alocacao/excluir-alocacao";

export function makeExcluirAlocacaoUseCase() {
    const alocacoesRepository = new PrismaAlocacoesRepository();
    const excluirAlocacaoUseCase = new ExcluirAlocacaoUseCase(alocacoesRepository);
    
    return excluirAlocacaoUseCase;
}