import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeCriarCursoUseCase } from "@/use-cases/@factories/curso/make-criar-curso-use-case";

export async function criarCurso(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const criarCursoBodySchema = z.object({
    codigo: z.string(),
    nome: z.string(),
    turno: z.enum(["MATUTINO", "VESPERTINO", "NOTURNO", "INTEGRAL"]),
    duracao_semestres: z.number().int().positive(),
  });

  const {
    codigo,
    nome,
    turno,
    duracao_semestres,
  } = criarCursoBodySchema.parse(request.body);

  try {
    const criarCursoUseCase = makeCriarCursoUseCase();

    const { curso } = await criarCursoUseCase.execute({
      codigo,
      nome,
      turno,
      duracao_semestres,
    });

    return reply.status(201).send({ curso });
  } catch (error) {
    throw error;
  }
}
