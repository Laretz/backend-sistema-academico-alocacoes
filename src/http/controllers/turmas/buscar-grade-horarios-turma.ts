import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { makeBuscarGradeHorariosTurmaUseCase } from "../../../use-cases/@factories/make-buscar-grade-horarios-turma-use-case";

export async function buscarGradeHorariosTurma(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const buscarGradeHorariosTurmaParamsSchema = z.object({
    id: z.string().uuid(),
  });

  const { id } = buscarGradeHorariosTurmaParamsSchema.parse(request.params);

  try {
    const buscarGradeHorariosTurmaUseCase =
      makeBuscarGradeHorariosTurmaUseCase();

    const { turmaId, grade, resumo } =
      await buscarGradeHorariosTurmaUseCase.execute({
        turmaId: id,
      });

    return reply.status(200).send({
      turmaId,
      grade,
      resumo,
    });
  } catch (err) {
    throw err;
  }
}
