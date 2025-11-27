import { PrismaAlocacoesRepository } from "@/repositories/prisma-repositories/prisma-alocacoes-repository";
import { PrismaDisciplinasRepository } from "@/repositories/prisma-repositories/prisma-disciplinas-repository";
import { PrismaTurmasRepository } from "@/repositories/prisma-repositories/prisma-turmas-repository";
import { PrismaCursoDisciplinaRepository } from "@/repositories/prisma-repositories/prisma-curso-disciplina-repository";
import { CriarAlocacaoUseCase } from "@/use-cases/alocacao/criar-alocacao";
import { PrismaHorariosRepository } from "@/repositories/prisma-repositories/prisma-horarios-repository";

export function makeCriarAlocacaoUseCase() {
    const alocacoesRepository = new PrismaAlocacoesRepository();
    const disciplinasRepository = new PrismaDisciplinasRepository();
    const turmasRepository = new PrismaTurmasRepository();
    const cursoDisciplinaRepository = new PrismaCursoDisciplinaRepository();
    const horariosRepository = new PrismaHorariosRepository();

    const criarAlocacaoUseCase = new CriarAlocacaoUseCase(
        alocacoesRepository,
        disciplinasRepository,
        turmasRepository,
        cursoDisciplinaRepository,
        horariosRepository,
    );
    
    return criarAlocacaoUseCase;
}
