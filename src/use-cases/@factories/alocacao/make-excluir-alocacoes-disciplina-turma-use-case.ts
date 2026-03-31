import { PrismaAlocacoesRepository } from "@/repositories/prisma-repositories/prisma-alocacoes-repository";
import { ExcluirAlocacoesDisciplinaTurmaUseCase } from "../../alocacao/excluir-alocacoes-disciplina-turma-use-case";

export function makeExcluirAlocacoesDisciplinaTurmaUseCase() {
  const alocacoesRepository = new PrismaAlocacoesRepository();
  const useCase = new ExcluirAlocacoesDisciplinaTurmaUseCase(
    alocacoesRepository
  );

  return useCase;
}
