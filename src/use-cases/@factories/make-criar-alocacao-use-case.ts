import { PrismaAlocacoesRepository } from "../../repositories/prisma-repositories/prisma-alocacoes-repository";
import { CriarAlocacaoUseCase } from "../alocacao/criar-alocacao";

export function makeCriarAlocacaoUseCase() {
    const alocacoesRepository = new PrismaAlocacoesRepository();
    const criarAlocacaoUseCase = new CriarAlocacaoUseCase(alocacoesRepository);
    
    return criarAlocacaoUseCase;
}