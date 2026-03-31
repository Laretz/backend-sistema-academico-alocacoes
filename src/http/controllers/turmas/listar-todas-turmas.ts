import { FastifyReply, FastifyRequest } from "fastify";
import { makeListarTodasTurmasUseCase } from "@/use-cases/@factories/turma/make-listar-todas-turmas-use-case";

export async function listarTodasTurmas(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const listarTodasTurmasUseCase = makeListarTodasTurmasUseCase();

    const { turmas } = await listarTodasTurmasUseCase.execute();

  
    return reply.status(200).send({ turmas });
  } catch (error) {
    throw error;
  }
}
