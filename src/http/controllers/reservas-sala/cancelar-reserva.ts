import { FastifyReply, FastifyRequest } from "fastify";
import { prisma } from "@/lib/prisma";
import { reservaParamsSchema } from "@/schemas/reserva-sala";

export async function cancelarReservaSala(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const { id } = reservaParamsSchema.parse(request.params);

    const reserva = await prisma.reservaSala.findUnique({ where: { id } });
    if (!reserva) {
      return reply.status(404).send({ message: "Reserva não encontrada" });
    }

    const updated = await prisma.reservaSala.update({
      where: { id },
      data: { status: "CANCELADA" },
    });

    return reply.status(200).send({ message: "reserva cancelada" });
  } catch (error) {
    console.error(
      "[DELETE /reservas-sala/:id] Erro ao cancelar reserva:",
      error
    );
    return reply.status(500).send({
      error: "Erro Interno do Servidor",
      message: "Ocorreu um erro inesperado. Tente novamente mais tarde.",
    });
  }
}
