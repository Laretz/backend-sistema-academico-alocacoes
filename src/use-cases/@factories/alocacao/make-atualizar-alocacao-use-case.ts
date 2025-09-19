import { PrismaAlocacoesRepository } from "@/repositories/prisma-repositories/prisma-alocacoes-repository";
import { PrismaDisciplinasRepository } from "@/repositories/prisma-repositories/prisma-disciplinas-repository";
import { AtualizarAlocacaoUseCase } from "@/use-cases/alocacao/atualizar-alocacao";

export function makeAtualizarAlocacaoUseCase() {
  const alocacoesRepository = new PrismaAlocacoesRepository();
  const disciplinasRepository = new PrismaDisciplinasRepository();
  const atualizarAlocacaoUseCase = new AtualizarAlocacaoUseCase(
    alocacoesRepository as unknown as AlocacoesRepository,
    disciplinasRepository
  );

  return atualizarAlocacaoUseCase;
}
