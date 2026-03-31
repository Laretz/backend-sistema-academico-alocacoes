import { PrismaDisciplinasRepository } from '@/repositories/prisma-repositories/prisma-disciplinas-repository';
import { PrismaAlocacoesRepository } from '@/repositories/prisma-repositories/prisma-alocacoes-repository';
import { AtualizarHorarioConsolidadoUseCase } from '../../disciplina/atualizar-horario-consolidado';

export function makeAtualizarHorarioConsolidadoUseCase() {
  const disciplinasRepository = new PrismaDisciplinasRepository();
  const alocacoesRepository = new PrismaAlocacoesRepository();
  const atualizarHorarioConsolidadoUseCase = new AtualizarHorarioConsolidadoUseCase(
    disciplinasRepository,
    alocacoesRepository
  );

  return atualizarHorarioConsolidadoUseCase;
}