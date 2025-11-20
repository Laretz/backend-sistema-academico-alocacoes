import { FastifyRequest, FastifyReply } from "fastify";
import { makeBuscarGradeHorariosUseCase } from "@/use-cases/@factories/alocacao/make-buscar-grade-horarios-use-case";
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
    // Logs temporários para caça-bugs (remover após validação)
    try {
      const contagem = {
        segunda: gradeHorarios.segunda.length,
        terca: gradeHorarios.terca.length,
        quarta: gradeHorarios.quarta.length,
        quinta: gradeHorarios.quinta.length,
        sexta: gradeHorarios.sexta.length,
        sabado: gradeHorarios.sabado.length,
      };
      console.debug("[DEBUG] /grade-horarios", { params: { id_turma, id_user, id_sala }, contagem });
    } catch (_) {
      // noop
    }

    return reply.status(200).send({ gradeHorarios });
  } catch (error) {
    throw error;
  }
}
