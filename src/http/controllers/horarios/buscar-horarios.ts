import { FastifyReply, FastifyRequest } from "fastify";
import { makeBuscarHorariosUseCase } from "@/use-cases/@factories/horario/make-buscar-horarios-use-case";

export async function buscarHorarios(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const buscarHorariosUseCase = makeBuscarHorariosUseCase();

    const { horarios } = await buscarHorariosUseCase.execute();

    return reply.status(200).send({ horarios });
  } catch (error) {
    throw error;
  }
}
