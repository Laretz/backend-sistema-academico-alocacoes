import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { makeBuscarCursosUsuarioUseCase } from "@/use-cases/@factories/user-curso/make-buscar-cursos-usuario-use-case";
import { RecursoNaoEncontradoError } from "@/use-cases/errors/recurso-nao-encontrado";

export async function buscarCursosUsuario(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const buscarCursosUsuarioParamsSchema = z.object({
    id_user: z.string(),
  });

  const { id_user } = buscarCursosUsuarioParamsSchema.parse(request.params);

  try {
    const buscarCursosUsuarioUseCase = makeBuscarCursosUsuarioUseCase();

    const { cursos } = await buscarCursosUsuarioUseCase.execute({
      id_user,
    });

    return reply.status(200).send({
      cursos,
    });
  } catch (err) {
    if (err instanceof RecursoNaoEncontradoError) {
      return reply.status(404).send({ message: err.message });
    }

    throw err;
  }
}