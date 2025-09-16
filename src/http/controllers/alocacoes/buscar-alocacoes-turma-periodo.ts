import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { makeBuscarAlocacoesTurmaPeriodoUseCase } from "@/use-cases/factories/make-buscar-alocacoes-turma-periodo-use-case";

export async function buscarAlocacoesTurmaPeriodo(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const buscarAlocacoesTurmaPeriodoParamsSchema = z.object({
    id_turma: z.string().uuid(),
  });

  const buscarAlocacoesTurmaPeriodoQuerySchema = z.object({
    periodo: z.string(),
    page: z.coerce.number().min(1).default(1),
  });

  const { id_turma } = buscarAlocacoesTurmaPeriodoParamsSchema.parse(
    request.params
  );
  const { periodo, page } = buscarAlocacoesTurmaPeriodoQuerySchema.parse(
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
