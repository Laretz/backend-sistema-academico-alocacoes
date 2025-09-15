import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { RecursoNaoEncontradoError } from "../../../use-cases/errors/recurso-nao-encontrado";
import { makeBuscarAlocacaoUseCase } from "@/use-cases/@factories/alocacao/make-buscar-alocacao-use-case";

export async function buscarAlocacao(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const buscarAlocacaoParamsSchema = z.object({
    id: z.string().uuid(),
  });

  const { id } = buscarAlocacaoParamsSchema.parse(request.params);

  try {
    const buscarAlocacaoUseCase = makeBuscarAlocacaoUseCase();

    const { alocacao } = await buscarAlocacaoUseCase.execute({
      id,
    });

    return reply.status(200).send({ alocacao });
  } catch (error) {
    if (error instanceof RecursoNaoEncontradoError) {
      return reply.status(404).send({ message: error.message });
    }

    throw error;
  }
}
