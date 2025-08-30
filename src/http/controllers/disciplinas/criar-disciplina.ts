import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeCriarDisciplinaUseCase } from '../../../use-cases/@factories/make-criar-disciplina-use-case';

export async function criarDisciplina(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const criarDisciplinaBodySchema = z.object({
    nome: z.string(),
    cargaHorariaTotal: z.number(),
  });

  const { nome, cargaHorariaTotal } = criarDisciplinaBodySchema.parse(
    request.body
  );

  try {
    const criarDisciplinaUseCase = makeCriarDisciplinaUseCase();

    const { disciplina } = await criarDisciplinaUseCase.execute({
      nome,
      cargaHorariaTotal,
    });

    return reply.status(201).send({ disciplina });
  } catch (error) {
    throw error;
  }
}