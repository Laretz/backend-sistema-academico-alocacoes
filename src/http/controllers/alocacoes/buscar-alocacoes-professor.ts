import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { makeBuscarAlocacoesProfessorUseCase } from "@/use-cases/@factories/alocacao/make-buscar-alocacoes-professor-use-case";

export async function buscarAlocacoesProfessor(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const buscarAlocacoesProfessorParamsSchema = z.object({
    id_professor: z.string().uuid(),
  });

  const buscarAlocacoesProfessorQuerySchema = z.object({
    page: z.coerce.number().min(1).default(1),
  });

  const { id_professor } = buscarAlocacoesProfessorParamsSchema.parse(
    request.params
  );
  const { page } = buscarAlocacoesProfessorQuerySchema.parse(request.query);

  try {
    const buscarAlocacoesProfessorUseCase =
      makeBuscarAlocacoesProfessorUseCase();

    const { alocacoes } = await buscarAlocacoesProfessorUseCase.execute({
      id_professor,
      page,
    });

    return reply.status(200).send({ alocacoes });
  } catch (error) {
    throw error;
  }
}
