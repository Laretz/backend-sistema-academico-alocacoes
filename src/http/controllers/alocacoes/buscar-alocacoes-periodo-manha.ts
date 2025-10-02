import { FastifyRequest, FastifyReply } from "fastify";
import { makeBuscarAlocacoesPeriodoManhaUseCase } from "@/use-cases/factories/make-buscar-alocacoes-periodo-manha-use-case";
import { alocacoesQuerySchema } from "@/schemas";

export async function buscarAlocacoesPeriodoManha(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { page } = alocacoesQuerySchema.parse(request.query);

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
