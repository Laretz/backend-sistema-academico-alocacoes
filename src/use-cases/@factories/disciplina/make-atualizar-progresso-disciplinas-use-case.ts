import { PrismaDisciplinasRepository } from "@/repositories/prisma-repositories/prisma-disciplinas-repository";
import { PrismaAlocacoesRepository } from "@/repositories/prisma-repositories/prisma-alocacoes-repository";
import { AtualizarProgressoDisciplinasUseCase } from "@/use-cases/disciplina/atualizar-progresso-disciplinas";

export function makeAtualizarProgressoDisciplinasUseCase() {
  const disciplinasRepository = new PrismaDisciplinasRepository();
  const alocacoesRepository = new PrismaAlocacoesRepository();
  const atualizarProgressoDisciplinasUseCase =
    new AtualizarProgressoDisciplinasUseCase(
      disciplinasRepository,
      alocacoesRepository,
    );

  return atualizarProgressoDisciplinasUseCase;
}
