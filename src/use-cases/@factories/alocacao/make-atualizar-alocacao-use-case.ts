import { PrismaAlocacoesRepository } from "@/repositories/prisma-repositories/prisma-alocacoes-repository";
import { PrismaDisciplinasRepository } from "@/repositories/prisma-repositories/prisma-disciplinas-repository";
import { PrismaTurmasRepository } from "@/repositories/prisma-repositories/prisma-turmas-repository";
import { PrismaCursoDisciplinaRepository } from "@/repositories/prisma-repositories/prisma-curso-disciplina-repository";
import { AtualizarAlocacaoUseCase } from "@/use-cases/alocacao/atualizar-alocacao";

export function makeAtualizarAlocacaoUseCase() {
  const alocacoesRepository = new PrismaAlocacoesRepository();
  const disciplinasRepository = new PrismaDisciplinasRepository();
  const turmasRepository = new PrismaTurmasRepository();
  const cursoDisciplinaRepository = new PrismaCursoDisciplinaRepository();
  const atualizarAlocacaoUseCase = new AtualizarAlocacaoUseCase(
    alocacoesRepository,
    disciplinasRepository,
    turmasRepository,
    cursoDisciplinaRepository,
  );

  return atualizarAlocacaoUseCase;
}
