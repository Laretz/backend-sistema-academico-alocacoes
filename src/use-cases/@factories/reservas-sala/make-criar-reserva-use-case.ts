import { PrismaReservasSalaRepository } from "@/repositories/prisma-repositories/prisma-reservas-sala-repository";
import { PrismaAlocacoesRepository } from "@/repositories/prisma-repositories/prisma-alocacoes-repository";
import { PrismaHorariosRepository } from "@/repositories/prisma-repositories/prisma-horarios-repository";
import { CriarReservaUseCase } from "../../reservas-sala/criar-reserva";

export function makeCriarReservaUseCase() {
  const reservasRepository = new PrismaReservasSalaRepository();
  const alocacoesRepository = new PrismaAlocacoesRepository();
  const horariosRepository = new PrismaHorariosRepository();

  const useCase = new CriarReservaUseCase(
    reservasRepository,
    alocacoesRepository,
    horariosRepository
  );

  return useCase;
}
