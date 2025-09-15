import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { makeDesvincularProfessorDisciplinaUseCase } from "@/use-cases/@factories/professor-disciplina/make-desvincular-professor-disciplina-use-case";
import { RecursoNaoEncontradoError } from "@/use-cases/errors/recurso-nao-encontrado";

export async function desvincularProfessorDisciplina(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const desvincularProfessorDisciplinaBodySchema = z.object({
    id_user: z.string().uuid(),
    id_disciplina: z.string().uuid(),
  });

  const { id_user, id_disciplina } =
    desvincularProfessorDisciplinaBodySchema.parse(request.body);

  try {
    const desvincularProfessorDisciplinaUseCase =
      makeDesvincularProfessorDisciplinaUseCase();

    await desvincularProfessorDisciplinaUseCase.execute({
      id_user,
      id_disciplina,
    });

    return reply.status(200).send({
      message: "Professor desvinculado da disciplina com sucesso",
    });
  } catch (err) {
    if (err instanceof RecursoNaoEncontradoError) {
      return reply.status(404).send({ message: err.message });
    }

    throw err;
  }
}
