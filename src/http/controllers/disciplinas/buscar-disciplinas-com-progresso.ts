import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { makeBuscarDisciplinasComProgressoUseCase } from "@/use-cases/factories/make-buscar-disciplinas-com-progresso-use-case";

const buscarDisciplinasComProgressoQuerySchema = z.object({
  turmaId: z.string().optional(),
  cursoId: z.string().optional(),
});

export async function buscarDisciplinasComProgresso(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const { turmaId, cursoId } = buscarDisciplinasComProgressoQuerySchema.parse(
      request.query
    );

    const buscarDisciplinasComProgressoUseCase =
      makeBuscarDisciplinasComProgressoUseCase();

    const { disciplinas } = await buscarDisciplinasComProgressoUseCase.execute({
      turmaId,
      cursoId,
    });

    return reply.status(200).send({
      disciplinas,
    });
  } catch (error) {
    console.error("Erro ao buscar disciplinas com progresso:", error);
    return reply.status(500).send({
      message: "Erro interno do servidor",
    });
  }
}
