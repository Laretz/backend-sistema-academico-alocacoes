import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { RecursoNaoEncontradoError } from "../../../use-cases/errors/recurso-nao-encontrado";
import { makeAtualizarAlocacaoUseCase } from "@/use-cases/@factories/alocacao/make-atualizar-alocacao-use-case";

export async function atualizarAlocacao(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const atualizarAlocacaoParamsSchema = z.object({
    id: z.uuid(),
  });

  const atualizarAlocacaoBodySchema = z.object({
    id_user: z.uuid().optional(),
    id_disciplina: z.string().uuid().optional(),
    id_turma: z.uuid().optional(),
    id_sala: z.uuid().optional(),
    id_horario: z.uuid().optional(),
  });

  const { id } = atualizarAlocacaoParamsSchema.parse(request.params);
  const { id_user, id_disciplina, id_turma, id_sala, id_horario } =
    atualizarAlocacaoBodySchema.parse(request.body);

  try {
    const atualizarAlocacaoUseCase = makeAtualizarAlocacaoUseCase();

    const { alocacao } = await atualizarAlocacaoUseCase.execute({
      id,
      id_user,
      id_disciplina,
      id_turma,
      id_sala,
      id_horario,
    });

    return reply.status(200).send({ alocacao });
  } catch (error) {
    if (error instanceof RecursoNaoEncontradoError) {
      return reply.status(404).send({ message: error.message });
    }

    throw error;
  }
}
