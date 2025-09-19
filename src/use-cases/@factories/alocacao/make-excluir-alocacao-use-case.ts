import { PrismaAlocacoesRepository } from "@/repositories/prisma-repositories/prisma-alocacoes-repository";
import { PrismaDisciplinasRepository } from "@/repositories/prisma-repositories/prisma-disciplinas-repository";
import { ExcluirAlocacaoUseCase } from "@/use-cases/alocacao/excluir-alocacao";

export function makeExcluirAlocacaoUseCase() {
    const alocacoesRepository = new PrismaAlocacoesRepository();
    const disciplinasRepository = new PrismaDisciplinasRepository();
    const excluirAlocacaoUseCase = new ExcluirAlocacaoUseCase(alocacoesRepository, disciplinasRepository);
    
    return excluirAlocacaoUseCase;
}
