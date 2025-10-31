import { FastifyReply, FastifyRequest } from "fastify";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const paramsSchema = z.object({ id: z.string().uuid() });
const bodySchema = z.object({ idDisciplina: z.string().uuid() });

export async function vincularDisciplinaCurso(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { id } = paramsSchema.parse(request.params);
  const { idDisciplina } = bodySchema.parse(request.body);

  // Garantir que curso e disciplina existem
  const [curso, disciplina] = await Promise.all([
    prisma.curso.findUnique({ where: { id } }),
    prisma.disciplina.findUnique({ where: { id: idDisciplina } }),
  ]);
  if (!curso) {
    return reply.status(404).send({ message: "Curso não encontrado" });
  }
  if (!disciplina) {
    return reply.status(404).send({ message: "Disciplina não encontrada" });
  }

  try {
    const vinculo = await prisma.cursoDisciplina.create({
      data: { id_curso: id, id_disciplina: idDisciplina },
    });
    return reply.status(201).send({ message: "Disciplina vinculada ao curso", vinculo });
  } catch (e: any) {
    if (e.code === "P2002") {
      return reply.status(409).send({ message: "Vínculo já existe" });
    }
    throw e;
  }
}