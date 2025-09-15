import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeBuscarCursoUseCase } from "@/use-cases/@factories/curso/make-buscar-curso-use-case";
import { RecursoNaoEncontradoError } from "../../../use-cases/errors/recurso-nao-encontrado";

export async function buscarCurso(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const buscarCursoParamsSchema = z.object({
    id: z.string().uuid(),
  });

  const { id } = buscarCursoParamsSchema.parse(request.params);

  try {
    const buscarCursoUseCase = makeBuscarCursoUseCase();

    const { curso } = await buscarCursoUseCase.execute({ id });

    return reply.status(200).send({ curso });
  } catch (error) {
    if (error instanceof RecursoNaoEncontradoError) {
      return reply.status(404).send({ message: error.message });
    }

    throw error;
  }
}
