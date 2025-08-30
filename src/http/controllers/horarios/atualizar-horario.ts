import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { RecursoNaoEncontradoError } from "../../../use-cases/errors/recurso-nao-encontrado";
import { makeAtualizarHorarioUseCase } from "../../../use-cases/@factories/make-atualizar-horario-use-case";

export async function atualizarHorario(request: FastifyRequest, reply: FastifyReply) {
    const atualizarHorarioParamsSchema = z.object({
        id: z.string().uuid(),
    });

    const atualizarHorarioBodySchema = z.object({
        diaSemana: z.string().optional(),
        horarioInicio: z.string().transform(str => new Date(str)).optional(),
        horarioFim: z.string().transform(str => new Date(str)).optional(),
    });

    const { id } = atualizarHorarioParamsSchema.parse(request.params);
    const { diaSemana, horarioInicio, horarioFim } = atualizarHorarioBodySchema.parse(request.body);

    try {
        const atualizarHorarioUseCase = makeAtualizarHorarioUseCase();

        const { horario } = await atualizarHorarioUseCase.execute({
            id,
            diaSemana,
            horarioInicio,
            horarioFim,
        });

        return reply.status(200).send({ horario });
    } catch (error) {
        if (error instanceof RecursoNaoEncontradoError) {
            return reply.status(404).send({ message: error.message });
        }

        throw error;
    }
}