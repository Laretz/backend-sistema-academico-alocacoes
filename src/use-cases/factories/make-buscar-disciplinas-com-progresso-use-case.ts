import { PrismaDisciplinasRepository } from "@/repositories/prisma-repositories/prisma-disciplinas-repository";
import { PrismaAlocacoesRepository } from "@/repositories/prisma-repositories/prisma-alocacoes-repository";
import { BuscarDisciplinasComProgressoUseCase } from "../disciplina/buscar-disciplinas-com-progresso";
import { PrismaTurmasRepository } from "@/repositories/prisma-repositories/prisma-turmas-repository";
import { PrismaCursosRepository } from "@/repositories/prisma-repositories/prisma-cursos-repository";

export function makeBuscarDisciplinasComProgressoUseCase() {
  const disciplinasRepository = new PrismaDisciplinasRepository();
  const alocacoesRepository = new PrismaAlocacoesRepository();
  const turmasRepository = new PrismaTurmasRepository();
  const cursosRepository = new PrismaCursosRepository();
  const buscarDisciplinasComProgressoUseCase =
    new BuscarDisciplinasComProgressoUseCase(
      disciplinasRepository,
      alocacoesRepository,
      turmasRepository,
      cursosRepository
    );

  return buscarDisciplinasComProgressoUseCase;
}
