import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { makeBuscarHorariosUseCase } from "../../../use-cases/@factories/make-buscar-horarios-use-case";

export async function buscarHorarios(request: FastifyRequest, reply: FastifyReply) {
    const buscarHorariosQuerySchema = z.object({
        page: z.coerce.number().min(1).default(1),
    });

    const { page } = buscarHorariosQuerySchema.parse(request.query);

    try {
        const buscarHorariosUseCase = makeBuscarHorariosUseCase();

        const { horarios } = await buscarHorariosUseCase.execute({
            page,
        });

        return reply.status(200).send({ horarios });
    } catch (error) {
        throw error;
    }
}