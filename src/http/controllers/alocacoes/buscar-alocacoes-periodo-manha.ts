import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { makeBuscarAlocacoesPeriodoManhaUseCase } from "@/use-cases/factories/make-buscar-alocacoes-periodo-manha-use-case";

export async function buscarAlocacoesPeriodoManha(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const buscarAlocacoesPeriodoManhaQuerySchema = z.object({
    page: z.coerce.number().min(1).default(1),
  });

  const { page } = buscarAlocacoesPeriodoManhaQuerySchema.parse(request.query);

  try {
    const buscarAlocacoesPeriodoManhaUseCase =
      makeBuscarAlocacoesPeriodoManhaUseCase();

    const { alocacoes } = await buscarAlocacoesPeriodoManhaUseCase.execute({
      page,
    });

    return reply.status(200).send({
      alocacoes,
    });
  } catch (err) {
    throw err;
  }
}
