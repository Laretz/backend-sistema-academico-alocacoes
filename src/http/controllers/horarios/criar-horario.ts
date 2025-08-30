import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { makeCriarHorarioUseCase } from "../../../use-cases/@factories/make-criar-horario-use-case";

export async function criarHorario(request: FastifyRequest, reply: FastifyReply) {
    const criarHorarioBodySchema = z.object({
        diaSemana: z.string(),
        horarioInicio: z.string().transform(str => new Date(str)),
        horarioFim: z.string().transform(str => new Date(str)),
    });

    const { diaSemana, horarioInicio, horarioFim } = criarHorarioBodySchema.parse(request.body);

    try {
        const criarHorarioUseCase = makeCriarHorarioUseCase();

        const { horario } = await criarHorarioUseCase.execute({
            diaSemana,
            horarioInicio,
            horarioFim,
        });

        return reply.status(201).send({ horario });
    } catch (error) {
        throw error;
    }
}