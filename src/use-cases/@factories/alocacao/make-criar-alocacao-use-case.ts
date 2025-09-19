import { PrismaAlocacoesRepository } from "@/repositories/prisma-repositories/prisma-alocacoes-repository";
import { PrismaDisciplinasRepository } from "@/repositories/prisma-repositories/prisma-disciplinas-repository";
import { CriarAlocacaoUseCase } from "@/use-cases/alocacao/criar-alocacao";

export function makeCriarAlocacaoUseCase() {
    const alocacoesRepository = new PrismaAlocacoesRepository();
    const disciplinasRepository = new PrismaDisciplinasRepository();
    const criarAlocacaoUseCase = new CriarAlocacaoUseCase(alocacoesRepository, disciplinasRepository);
    
    return criarAlocacaoUseCase;
}
