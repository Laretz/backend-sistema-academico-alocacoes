import { PrismaAlocacoesRepository } from "../../repositories/prisma-repositories/prisma-alocacoes-repository";
import { ExcluirTodasAlocacoesTurmaUseCase } from "../alocacao/excluir-todas-alocacoes-turma";

export function makeExcluirTodasAlocacoesTurmaUseCase() {
  const alocacoesRepository = new PrismaAlocacoesRepository();
  const excluirTodasAlocacoesTurmaUseCase = new ExcluirTodasAlocacoesTurmaUseCase(alocacoesRepository);

  return excluirTodasAlocacoesTurmaUseCase;
}