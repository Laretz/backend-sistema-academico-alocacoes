import { FastifyRequest, FastifyReply } from "fastify";
import { makeBuscarAlocacoesTurmaPeriodoUseCase } from "@/use-cases/factories/make-buscar-alocacoes-turma-periodo-use-case";
import { alocacoesTurmaPeriodoParamsSchema, alocacoesTurmaPeriodoQuerySchema } from "@/schemas";

export async function buscarAlocacoesTurmaPeriodo(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { id_turma } = alocacoesTurmaPeriodoParamsSchema.parse(
    request.params
  );
  const { periodo, page } = alocacoesTurmaPeriodoQuerySchema.parse(
    request.query
  );

  try {
    const buscarAlocacoesTurmaPeriodoUseCase =
      makeBuscarAlocacoesTurmaPeriodoUseCase();

    const { alocacoes } = await buscarAlocacoesTurmaPeriodoUseCase.execute({
      id_turma,
      periodo,
      page,
    });

    return reply.status(200).send({
      alocacoes,
    });
  } catch (err) {
    throw err;
  }
}
