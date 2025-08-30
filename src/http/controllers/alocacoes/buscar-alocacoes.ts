import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { makeBuscarAlocacoesUseCase } from "../../../use-cases/@factories/make-buscar-alocacoes-use-case";

export async function buscarAlocacoes(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const buscarAlocacoesQuerySchema = z.object({
    page: z.coerce.number().min(1).default(1),
  });

  const { page } = buscarAlocacoesQuerySchema.parse(request.query);

  try {
    const buscarAlocacoesUseCase = makeBuscarAlocacoesUseCase();

    const { alocacoes } = await buscarAlocacoesUseCase.execute({
      page,
    });

    return reply.status(200).send({ alocacoes });
  } catch (error) {
    throw error;
  }
}
