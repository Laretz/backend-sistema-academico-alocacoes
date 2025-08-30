import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { RecursoNaoEncontradoError } from "../../../use-cases/errors/recurso-nao-encontrado";
import { makeBuscarTurmaUseCase } from "../../../use-cases/@factories/make-buscar-turma-use-case";

export async function buscarTurma(request: FastifyRequest, reply: FastifyReply) {
    const buscarTurmaParamsSchema = z.object({
        id: z.string().uuid(),
    });

    const { id } = buscarTurmaParamsSchema.parse(request.params);

    try {
        const buscarTurmaUseCase = makeBuscarTurmaUseCase();

        const { turma } = await buscarTurmaUseCase.execute({ id });

        return reply.status(200).send({ turma });
    } catch (error) {
        if (error instanceof RecursoNaoEncontradoError) {
            return reply.status(404).send({ message: error.message });
        }

        throw error;
    }
}