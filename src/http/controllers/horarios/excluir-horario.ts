import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { RecursoNaoEncontradoError } from "../../../use-cases/errors/recurso-nao-encontrado";
import { makeExcluirHorarioUseCase } from "../../../use-cases/@factories/make-excluir-horario-use-case";

export async function excluirHorario(request: FastifyRequest, reply: FastifyReply) {
    const excluirHorarioParamsSchema = z.object({
        id: z.string().uuid(),
    });

    const { id } = excluirHorarioParamsSchema.parse(request.params);

    try {
        const excluirHorarioUseCase = makeExcluirHorarioUseCase();

        await excluirHorarioUseCase.execute({
            id,
        });

        return reply.status(204).send();
    } catch (error) {
        if (error instanceof RecursoNaoEncontradoError) {
            return reply.status(404).send({ message: error.message });
        }

        throw error;
    }
}