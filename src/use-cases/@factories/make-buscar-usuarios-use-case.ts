import { PrismaUsersRepository } from "../../repositories/prisma-repositories/prisma-users-repository";
import { BuscarUsuariosUseCase } from "../buscar-usuarios";

export function makeBuscarUsuariosUseCase() {
    const usersRepository = new PrismaUsersRepository();
    const buscarUsuariosUseCase = new BuscarUsuariosUseCase(usersRepository);
    
    return buscarUsuariosUseCase;
}