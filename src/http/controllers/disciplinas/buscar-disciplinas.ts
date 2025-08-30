import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeBuscarDisciplinasUseCase } from '../../../use-cases/@factories/make-buscar-disciplinas-use-case';

export async function buscarDisciplinas(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const buscarDisciplinasQuerySchema = z.object({
    page: z.coerce.number().min(1).default(1),
  });

  const { page } = buscarDisciplinasQuerySchema.parse(request.query);

  try {
    const buscarDisciplinasUseCase = makeBuscarDisciplinasUseCase();

    const { disciplinas } = await buscarDisciplinasUseCase.execute({ page });

    return reply.status(200).send({ disciplinas });
  } catch (error) {
    throw error;
  }
}