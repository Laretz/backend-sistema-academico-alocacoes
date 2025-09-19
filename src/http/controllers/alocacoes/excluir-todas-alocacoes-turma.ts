import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { makeExcluirTodasAlocacoesTurmaUseCase } from "@/use-cases/factories/make-excluir-todas-alocacoes-turma-use-case";

export async function excluirTodasAlocacoesTurma(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const excluirTodasAlocacoesTurmaParamsSchema = z.object({
    id_turma: z.string().uuid(),
  });

  const { id_turma } = excluirTodasAlocacoesTurmaParamsSchema.parse(
    request.params
  );

  try {
    const excluirTodasAlocacoesTurmaUseCase =
      makeExcluirTodasAlocacoesTurmaUseCase();

    const { message } = await excluirTodasAlocacoesTurmaUseCase.execute({
      id_turma,
    });

    return reply.status(200).send({
      message,
    });
  } catch (err) {
    throw err;
  }
}
