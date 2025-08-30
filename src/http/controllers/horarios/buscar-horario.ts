import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { RecursoNaoEncontradoError } from "../../../use-cases/errors/recurso-nao-encontrado";
import { makeBuscarHorarioUseCase } from "../../../use-cases/@factories/make-buscar-horario-use-case";

export async function buscarHorario(request: FastifyRequest, reply: FastifyReply) {
    const buscarHorarioParamsSchema = z.object({
        id: z.string().uuid(),
    });

    const { id } = buscarHorarioParamsSchema.parse(request.params);

    try {
        const buscarHorarioUseCase = makeBuscarHorarioUseCase();

        const { horario } = await buscarHorarioUseCase.execute({
            id,
        });

        return reply.status(200).send({ horario });
    } catch (error) {
        if (error instanceof RecursoNaoEncontradoError) {
            return reply.status(404).send({ message: error.message });
        }

        throw error;
    }
}