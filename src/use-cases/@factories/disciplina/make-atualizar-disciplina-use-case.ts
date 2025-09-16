import { PrismaDisciplinasRepository } from "@/repositories/prisma-repositories/prisma-disciplinas-repository";
import { PrismaAlocacoesRepository } from "@/repositories/prisma-repositories/prisma-alocacoes-repository";
import { AtualizarDisciplinaUseCase } from "@/use-cases/disciplina/atualizar-disciplina";

export function makeAtualizarDisciplinaUseCase() {
    const disciplinasRepository = new PrismaDisciplinasRepository();
    const alocacoesRepository = new PrismaAlocacoesRepository();
    const atualizarDisciplinaUseCase = new AtualizarDisciplinaUseCase(disciplinasRepository, alocacoesRepository);
    
    return atualizarDisciplinaUseCase;
}
