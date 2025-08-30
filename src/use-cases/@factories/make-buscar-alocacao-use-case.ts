import { PrismaAlocacoesRepository } from "../../repositories/prisma-repositories/prisma-alocacoes-repository";
import { BuscarAlocacaoUseCase } from "../alocacao/buscar-alocacao";

export function makeBuscarAlocacaoUseCase() {
    const alocacoesRepository = new PrismaAlocacoesRepository();
    const buscarAlocacaoUseCase = new BuscarAlocacaoUseCase(alocacoesRepository);
    
    return buscarAlocacaoUseCase;
}