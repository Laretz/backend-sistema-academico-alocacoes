import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeBuscarTurmasUseCase } from "@/use-cases/@factories/turma/make-buscar-turmas-use-case";

export async function buscarTurmas(request: FastifyRequest, reply: FastifyReply) {
    const buscarTurmasQuerySchema = z.object({
        page: z.coerce.number().min(1).default(1),
    });

    const { page } = buscarTurmasQuerySchema.parse(request.query);

    try {
        const buscarTurmasUseCase = makeBuscarTurmasUseCase();

        const { turmas } = await buscarTurmasUseCase.execute({ page });

        return reply.status(200).send({ turmas });
    } catch (error) {
        throw error;
    }
}
