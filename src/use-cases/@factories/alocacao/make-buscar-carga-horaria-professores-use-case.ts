import { PrismaAlocacoesRepository } from "@/repositories/prisma-repositories/prisma-alocacoes-repository";
import { PrismaUsersRepository } from "@/repositories/prisma-repositories/prisma-users-repository";
import { BuscarCargaHorariaProfessoresUseCase } from "@/use-cases/alocacao/buscar-carga-horaria-professores";

export function makeBuscarCargaHorariaProfessoresUseCase() {
  const alocacoesRepository = new PrismaAlocacoesRepository();
  const usersRepository = new PrismaUsersRepository();
  const buscarCargaHorariaProfessoresUseCase = new BuscarCargaHorariaProfessoresUseCase(
    alocacoesRepository,
    usersRepository
  );

  return buscarCargaHorariaProfessoresUseCase;
}