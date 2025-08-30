import { PrismaUsersRepository } from "../../repositories/prisma-repositories/prisma-users-repository";
import { AuthenticateUseCase } from "../authenticate";
import { RegisterUseCase } from "../register";

export function makeAuthenticateUseCase() {
    const usersRepository = new PrismaUsersRepository();
    const authenticate = new AuthenticateUseCase(usersRepository);
    
    return authenticate;
}