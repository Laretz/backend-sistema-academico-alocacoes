import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { RecursoNaoEncontradoError } from "../../../use-cases/errors/recurso-nao-encontrado";
import { makeExcluirAlocacaoUseCase } from "@/use-cases/@factories/alocacao/make-excluir-alocacao-use-case";

export async function excluirAlocacao(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const excluirAlocacaoParamsSchema = z.object({
    id: z.string().uuid(),
  });

  const { id } = excluirAlocacaoParamsSchema.parse(request.params);

  try {
    const excluirAlocacaoUseCase = makeExcluirAlocacaoUseCase();

    await excluirAlocacaoUseCase.execute({
      id,
    });

    return reply.status(204).send();
  } catch (error) {
    if (error instanceof RecursoNaoEncontradoError) {
      return reply.status(404).send({ message: error.message });
    }

    throw error;
  }
}
