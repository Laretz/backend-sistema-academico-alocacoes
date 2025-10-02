import { FastifyRequest, FastifyReply } from "fastify";
import { makeBuscarGradeHorariosUseCase } from "@/use-cases/@factories/horario/make-buscar-grade-horarios-use-case";
import { RecursoNaoEncontradoError } from "../../../use-cases/errors/recurso-nao-encontrado";
import { gradeHorariosQuerySchema } from "@/schemas";

export async function buscarGradeHorarios(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { id_turma, id_user, id_sala } = gradeHorariosQuerySchema.parse(
    request.query
  );

  try {
    const buscarGradeHorariosUseCase = makeBuscarGradeHorariosUseCase();

    const { gradeHorarios } = await buscarGradeHorariosUseCase.execute({
      id_turma,
      id_user,
      id_sala: id_sala ?? undefined,
    });
    if (!gradeHorarios) {
      throw new RecursoNaoEncontradoError();
    }
    return reply.status(200).send({ gradeHorarios });
  } catch (error) {
    throw error;
  }
}
