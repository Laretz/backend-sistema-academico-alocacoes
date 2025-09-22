import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { makeBuscarUsuariosCursoUseCase } from "@/use-cases/@factories/user-curso/make-buscar-usuarios-curso-use-case";
import { RecursoNaoEncontradoError } from "@/use-cases/errors/recurso-nao-encontrado";

export async function buscarUsuariosCurso(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const buscarUsuariosCursoParamsSchema = z.object({
    id_curso: z.string(),
  });

  const { id_curso } = buscarUsuariosCursoParamsSchema.parse(request.params);

  try {
    const buscarUsuariosCursoUseCase = makeBuscarUsuariosCursoUseCase();

    const { usuarios } = await buscarUsuariosCursoUseCase.execute({
      id_curso,
    });

    return reply.status(200).send({
      usuarios,
    });
  } catch (err) {
    if (err instanceof RecursoNaoEncontradoError) {
      return reply.status(404).send({ message: err.message });
    }

    throw err;
  }
}