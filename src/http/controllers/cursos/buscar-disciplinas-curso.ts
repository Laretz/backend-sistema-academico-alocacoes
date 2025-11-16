import { FastifyReply, FastifyRequest } from "fastify";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const paramsSchema = z.object({ id: z.string().uuid() });

export async function buscarDisciplinasCurso(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { id } = paramsSchema.parse(request.params);

  const links = await prisma.cursoDisciplina.findMany({
    where: { id_curso: id },
    include: { disciplina: true },
    orderBy: { disciplina: { semestre: "asc" } },
  });

  const disciplinas = links.map((l) => l.disciplina);

  return reply.status(200).send({ disciplinas });
}