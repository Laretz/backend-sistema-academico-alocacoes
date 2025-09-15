import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeCriarSalaUseCase } from "@/use-cases/@factories/sala/make-criar-sala-use-case";

export async function criarSala(request: FastifyRequest, reply: FastifyReply) {
    const criarSalaBodySchema = z.object({
        nome: z.string(),
        predio: z.string(),
        capacidade: z.number(),
        tipo: z.string(),
        computadores: z.number().optional().default(0),
    });

    const { nome, predio, capacidade, tipo, computadores } = criarSalaBodySchema.parse(request.body);

    try {
        const criarSalaUseCase = makeCriarSalaUseCase();

        const { sala } = await criarSalaUseCase.execute({
            nome,
            predio,
            capacidade,
            tipo,
            computadores,
        });

        return reply.status(201).send({ sala });
    } catch (error) {
        throw error;
    }
}
