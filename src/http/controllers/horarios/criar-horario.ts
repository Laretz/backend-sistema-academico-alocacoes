import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { makeCriarHorarioUseCase } from "@/use-cases/@factories/horario/make-criar-horario-use-case";

export async function criarHorario(request: FastifyRequest, reply: FastifyReply) {
    const criarHorarioBodySchema = z.object({
        codigo: z.string(),
        dia_semana: z.string(),
        horario_inicio: z.string().transform(str => new Date(str)),
  horario_fim: z.string().transform(str => new Date(str)),
    });

    const { codigo, dia_semana, horario_inicio, horario_fim } = criarHorarioBodySchema.parse(request.body);

    try {
        const criarHorarioUseCase = makeCriarHorarioUseCase();

        const { horario } = await criarHorarioUseCase.execute({
            codigo,
            dia_semana,
            horario_inicio,
      horario_fim,
        });

        return reply.status(201).send({ horario });
    } catch (error) {
        throw error;
    }
}
