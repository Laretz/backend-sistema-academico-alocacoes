import { PrismaAlocacoesRepository } from "../../repositories/prisma-repositories/prisma-alocacoes-repository";
import { AtualizarAlocacaoUseCase } from "../alocacao/atualizar-alocacao";

export function makeAtualizarAlocacaoUseCase() {
    const alocacoesRepository = new PrismaAlocacoesRepository();
    const atualizarAlocacaoUseCase = new AtualizarAlocacaoUseCase(alocacoesRepository);
    
    return atualizarAlocacaoUseCase;
}