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
      
    const filtros = {
      ...(turmaId ? { turmaId } : {}),
      ...(cursoId ? { cursoId } : {}),
    };

    const { disciplinas } = await buscarDisciplinasComProgressoUseCase.execute(filtros);

    return reply.status(200).send({
      disciplinas,
    });
  } catch (error) {
    console.error("Erro ao buscar disciplinas com progresso:", { turmaId: (request.query as any)?.turmaId, cursoId: (request.query as any)?.cursoId, error });
    return reply.status(500).send({
      message: "Erro interno do servidor",
    });
  }
}
