import { hash } from "bcryptjs";
import { prisma } from "../lib/prisma";
import { PrismaUsersRepository } from "../repositories/prisma-repositories/prisma-users-repository";
import { UsersRepository } from "../repositories/users-repository";
import { UserJaExisteError } from "./errors/email-ja-existe";
import { User, Role } from "@prisma/client";

interface RegisterUseCaseRequest {
    nome: string;
    email: string;
    senha: string;
    role: Role | undefined;
    especializacao: string | undefined;
    carga_horaria_max: number | undefined;
    preferencia: string | undefined;
}

 interface RegisterUseCaseResponse {
    user: User
}

export class RegisterUseCase{
    constructor(private UserRepository: UsersRepository){}

    async execute({ nome, email, senha, role }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
        const senhaHash = await hash(senha, 6);
        
        const userwithSameEmail = await this.UserRepository.findByEmail(email);

        if(userwithSameEmail){
            throw new UserJaExisteError();
        }
        console.log(role);

        const user = await this.UserRepository.create({
              nome,
              email,
              senha: senhaHash,
              role: role || Role.PROFESSOR,
              especializacao: null,
         });
      return {user,}
}

 
}