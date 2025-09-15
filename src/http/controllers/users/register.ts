import {z} from "zod";
import { FastifyReply, FastifyRequest } from "fastify";
import {  Role } from "@prisma/client";
import { UserJaExisteError } from "../../../use-cases/errors/email-ja-existe";
import { makeRegisterUseCase } from "@/use-cases/@factories/usuario/make-register-use-case";
    
export async function register(request: FastifyRequest, reply: FastifyReply) {
    const registerBodySchema = z.object({
        nome: z.string(),
        email: z.email(),
        senha: z.string().min(6),
        role: z.enum(Role).optional(),
        especializacao: z.string().optional(),
        carga_horaria_max: z.number().optional(),
        preferencia: z.string().optional(),
    });

    const { nome, email, senha, role, especializacao, carga_horaria_max, preferencia } = registerBodySchema.parse(request.body);

    try {
        const registerUseCase = makeRegisterUseCase()

        await registerUseCase.execute({ nome, email, senha, role, especializacao, carga_horaria_max, preferencia });

    } catch (error) {
        if (error instanceof UserJaExisteError){
            return reply.status(409).send({ message: error.message });
        }
        
        throw error;
    }
    
    return reply.status(201).send();
}
