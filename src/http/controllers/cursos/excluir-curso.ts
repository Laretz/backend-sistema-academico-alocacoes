import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeExcluirCursoUseCase } from "@/use-cases/@factories/curso/make-excluir-curso-use-case";
import { RecursoNaoEncontradoError } from "../../../use-cases/errors/recurso-nao-encontrado";

export async function excluirCurso(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const excluirCursoParamsSchema = z.object({
    id: z.string().uuid(),
  });

  const { id } = excluirCursoParamsSchema.parse(request.params);

  try {
    const excluirCursoUseCase = makeExcluirCursoUseCase();

    await excluirCursoUseCase.execute({ id });

    return reply.status(204).send();
  } catch (error) {
    if (error instanceof RecursoNaoEncontradoError) {
      return reply.status(404).send({ message: error.message });
    }

    throw error;
  }
}
