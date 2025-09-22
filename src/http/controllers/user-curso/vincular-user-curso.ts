import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { makeVincularUserCursoUseCase } from "@/use-cases/@factories/user-curso/make-vincular-user-curso-use-case";
import { RecursoNaoEncontradoError } from "@/use-cases/errors/recurso-nao-encontrado";

export async function vincularUserCurso(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const vincularUserCursoBodySchema = z.object({
    id_user: z.string(),
    id_curso: z.string(),
  });

  const { id_user, id_curso } = vincularUserCursoBodySchema.parse(
    request.body
  );

  try {
    const vincularUserCursoUseCase = makeVincularUserCursoUseCase();

    const { userCurso } = await vincularUserCursoUseCase.execute({
      id_user,
      id_curso,
    });

    return reply.status(201).send({
      userCurso,
    });
  } catch (err) {
    if (err instanceof RecursoNaoEncontradoError) {
      return reply.status(404).send({ message: err.message });
    }

    throw err;
  }
}