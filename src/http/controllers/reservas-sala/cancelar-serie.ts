import { FastifyReply, FastifyRequest } from "fastify";
import { prisma } from "@/lib/prisma";
import { seriesParamsSchema } from "@/schemas/reserva-sala";

export async function cancelarSerieReservasSala(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { seriesId } = seriesParamsSchema.parse(request.params);

  const reservas = await prisma.reservaSala.findMany({ where: { seriesId } });
  if (reservas.length === 0) {
    return reply.status(404).send({ message: "Série de reservas não encontrada" });
  }

  await prisma.reservaSala.updateMany({
    where: { seriesId },
    data: { status: "CANCELADA" },
  });

  return reply.status(200).send({ message: "Série cancelada com sucesso" });
}