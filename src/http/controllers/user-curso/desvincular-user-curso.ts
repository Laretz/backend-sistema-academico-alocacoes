import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { makeDesvincularUserCursoUseCase } from "@/use-cases/@factories/user-curso/make-desvincular-user-curso-use-case";
import { RecursoNaoEncontradoError } from "@/use-cases/errors/recurso-nao-encontrado";

export async function desvincularUserCurso(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const desvincularUserCursoBodySchema = z.object({
    id_user: z.string(),
    id_curso: z.string(),
  });

  const { id_user, id_curso } = desvincularUserCursoBodySchema.parse(request.body);

  try {
    const desvincularUserCursoUseCase = makeDesvincularUserCursoUseCase();

    await desvincularUserCursoUseCase.execute({
      id_user,
      id_curso,
    });

    return reply.status(200).send({
      message: "Usuário desvinculado do curso com sucesso",
    });
  } catch (err) {
    if (err instanceof RecursoNaoEncontradoError) {
      return reply.status(404).send({ message: err.message });
    }

    throw err;
  }
}