import { FastifyReply, FastifyRequest } from "fastify";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const paramsSchema = z.object({ id: z.string().uuid(), idDisciplina: z.string().uuid() });

export async function desvincularDisciplinaCurso(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { id, idDisciplina } = paramsSchema.parse(request.params);

  const vinculo = await prisma.cursoDisciplina.findFirst({
    where: { id_curso: id, id_disciplina: idDisciplina },
    select: { id: true },
  });

  if (!vinculo) {
    return reply.status(404).send({ message: "Vínculo não encontrado" });
  }

  await prisma.cursoDisciplina.delete({ where: { id: vinculo.id } });

  return reply.status(204).send();
}