import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeBuscarCursosUseCase } from "@/use-cases/@factories/curso/make-buscar-cursos-use-case";

export async function buscarCursos(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const buscarCursosQuerySchema = z.object({
    page: z.coerce.number().min(1).default(1),
  });

  const { page } = buscarCursosQuerySchema.parse(request.query);

  try {
    const buscarCursosUseCase = makeBuscarCursosUseCase();

    const { cursos } = await buscarCursosUseCase.execute({ page });

    return reply.status(200).send({ cursos });
  } catch (error) {
    throw error;
  }
}
