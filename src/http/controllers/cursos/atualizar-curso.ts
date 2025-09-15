import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeAtualizarCursoUseCase } from "@/use-cases/@factories/curso/make-atualizar-curso-use-case";
import { RecursoNaoEncontradoError } from "../../../use-cases/errors/recurso-nao-encontrado";

export async function atualizarCurso(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const atualizarCursoParamsSchema = z.object({
    id: z.string().uuid(),
  });

  const atualizarCursoBodySchema = z.object({
    nome: z.string().optional(),
    turno: z.enum(["MATUTINO", "VESPERTINO", "NOTURNO", "INTEGRAL"]).optional(),
    descricao: z.string().optional(),
  });

  const { id } = atualizarCursoParamsSchema.parse(request.params);
  const { nome, turno, descricao } = atualizarCursoBodySchema.parse(request.body);

  try {
    const atualizarCursoUseCase = makeAtualizarCursoUseCase();

    const { curso } = await atualizarCursoUseCase.execute({
      id,
      nome,
      turno,
      descricao,
    });

    return reply.status(200).send({ curso });
  } catch (error) {
    if (error instanceof RecursoNaoEncontradoError) {
      return reply.status(404).send({ message: error.message });
    }

    throw error;
  }
}
