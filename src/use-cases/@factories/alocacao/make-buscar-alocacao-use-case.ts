import { PrismaAlocacoesRepository } from "@/repositories/prisma-repositories/prisma-alocacoes-repository";
import { BuscarAlocacaoUseCase } from "@/use-cases/alocacao/buscar-alocacao";

export function makeBuscarAlocacaoUseCase() {
    const alocacoesRepository = new PrismaAlocacoesRepository();
    const buscarAlocacaoUseCase = new BuscarAlocacaoUseCase(alocacoesRepository);
    
    return buscarAlocacaoUseCase;
}
