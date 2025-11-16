import { FastifyReply, FastifyRequest } from "fastify";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const paramsSchema = z.object({ id: z.string().uuid() });

export async function buscarDisciplinasCursoVinculos(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { id } = paramsSchema.parse(request.params);

  const links = await prisma.cursoDisciplina.findMany({
    where: { id_curso: id },
    include: { disciplina: true },
    orderBy: { disciplina: { semestre: "asc" } },
  });

  const vinculos = links.map((l) => ({
    id: l.id,
    id_curso: l.id_curso,
    id_disciplina: l.id_disciplina,
    disciplina: l.disciplina,
  }));

  return reply.status(200).send({ vinculos });
}