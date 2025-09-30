import { PrismaDisciplinasRepository } from "@/repositories/prisma-repositories/prisma-disciplinas-repository";
import { PrismaAlocacoesRepository } from "@/repositories/prisma-repositories/prisma-alocacoes-repository";
import { BuscarDisciplinasComProgressoUseCase } from "../disciplina/buscar-disciplinas-com-progresso";

export function makeBuscarDisciplinasComProgressoUseCase() {
  const disciplinasRepository = new PrismaDisciplinasRepository();
  const alocacoesRepository = new PrismaAlocacoesRepository();
  const buscarDisciplinasComProgressoUseCase =
    new BuscarDisciplinasComProgressoUseCase(
      disciplinasRepository,
      alocacoesRepository
    );

  return buscarDisciplinasComProgressoUseCase;
}
