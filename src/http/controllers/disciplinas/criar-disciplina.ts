import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { TipoDeSala } from "@prisma/client";
import { makeCriarDisciplinaUseCase } from "@/use-cases/@factories/disciplina/make-criar-disciplina-use-case";

export async function criarDisciplina(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const criarDisciplinaBodySchema = z.object({
    nome: z.string(),
    carga_horaria: z.number().int().min(1),
    id_curso: z.uuid(),
    tipo_de_sala: z.enum(["Sala", "Lab"]).optional().default("Sala"),
    data_inicio: z.string().datetime().optional(),
    data_fim_prevista: z.string().datetime().optional(),
    periodo_letivo: z.string().optional(),
    codigo: z.string().optional(),
    semestre: z.number().int().min(1).optional().default(1),
    obrigatoria: z.boolean().optional().default(true),
  });

  const {
    nome,
    carga_horaria,
    id_curso,
    tipo_de_sala,
    data_inicio,
    data_fim_prevista,
    periodo_letivo,
    codigo,
    semestre,
    obrigatoria,
  } = criarDisciplinaBodySchema.parse(request.body);

  try {
    const criarDisciplinaUseCase = makeCriarDisciplinaUseCase();

    const { disciplina } = await criarDisciplinaUseCase.execute({
      nome,
      carga_horaria,
      id_curso,
      tipo_de_sala: tipo_de_sala as TipoDeSala,
      data_inicio: data_inicio ? new Date(data_inicio) : undefined,
      data_fim_prevista: data_fim_prevista
        ? new Date(data_fim_prevista)
        : undefined,
      periodo_letivo,
      codigo,
      semestre,
      obrigatoria,
    });

    return reply.status(201).send({ disciplina });
  } catch (error) {
    throw error;
  }
}
