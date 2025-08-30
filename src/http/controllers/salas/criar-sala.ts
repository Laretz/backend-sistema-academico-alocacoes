import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeCriarSalaUseCase } from "../../../use-cases/@factories/make-criar-sala-use-case";

export async function criarSala(request: FastifyRequest, reply: FastifyReply) {
    const criarSalaBodySchema = z.object({
        nome: z.string(),
        predio: z.string(),
        capacidade: z.number(),
        tipo: z.string(),
    });

    const { nome, predio, capacidade, tipo } = criarSalaBodySchema.parse(request.body);

    try {
        const criarSalaUseCase = makeCriarSalaUseCase();

        const { sala } = await criarSalaUseCase.execute({
            nome,
            predio,
            capacidade,
            tipo,
        });

        return reply.status(201).send({ sala });
    } catch (error) {
        throw error;
    }
}