import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { RecursoNaoEncontradoError } from "../../../use-cases/errors/recurso-nao-encontrado";
import { makeAtualizarDisciplinaUseCase } from '../../../use-cases/@factories/make-atualizar-disciplina-use-case';

export async function atualizarDisciplina(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const atualizarDisciplinaParamsSchema = z.object({
    id: z.string().uuid(),
  });

  const atualizarDisciplinaBodySchema = z.object({
    nome: z.string().optional(),
    cargaHorariaTotal: z.number().optional(),
  });

  const { id } = atualizarDisciplinaParamsSchema.parse(request.params);
  const { nome, cargaHorariaTotal } = atualizarDisciplinaBodySchema.parse(
    request.body
  );

  try {
    const atualizarDisciplinaUseCase = makeAtualizarDisciplinaUseCase();

    const { disciplina } = await atualizarDisciplinaUseCase.execute({
      id,
      nome,
      cargaHorariaTotal,
    });

    return reply.status(200).send({ disciplina });
  } catch (error) {
    if (error instanceof RecursoNaoEncontradoError) {
      return reply.status(404).send({ message: error.message });
    }

    throw error;
  }
}