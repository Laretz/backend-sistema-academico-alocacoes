import { PrismaReservasSalaRepository } from "@/repositories/prisma-repositories/prisma-reservas-sala-repository";
import { BuscarReservasUseCase } from "../../reservas-sala/buscar-reservas";

export function makeBuscarReservasUseCase() {
  const reservasRepository = new PrismaReservasSalaRepository();
  const useCase = new BuscarReservasUseCase(reservasRepository);
  return useCase;
}
