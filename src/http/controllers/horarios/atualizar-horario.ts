import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { RecursoNaoEncontradoError } from "../../../use-cases/errors/recurso-nao-encontrado";
import { makeAtualizarHorarioUseCase } from "@/use-cases/@factories/horario/make-atualizar-horario-use-case";

export async function atualizarHorario(request: FastifyRequest, reply: FastifyReply) {
    const atualizarHorarioParamsSchema = z.object({
        id: z.string().uuid(),
    });

    const atualizarHorarioBodySchema = z.object({
        codigo: z.string().optional(),
        dia_semana: z.string().optional(),
        horario_inicio: z.string().optional(),
    horario_fim: z.string().optional(),
    });

    const { id } = atualizarHorarioParamsSchema.parse(request.params);
    const { dia_semana, horario_inicio, horario_fim } = atualizarHorarioBodySchema.parse(request.body);

    try {
        const atualizarHorarioUseCase = makeAtualizarHorarioUseCase();

        const horario = await atualizarHorarioUseCase.execute({
            id,
            dia_semana,
            horario_inicio: horario_inicio ? new Date(`1970-01-01T${horario_inicio}:00.000Z`) : undefined,
            horario_fim: horario_fim ? new Date(`1970-01-01T${horario_fim}:00.000Z`) : undefined,
        });

        return reply.status(200).send({ horario });
    } catch (error) {
        if (error instanceof RecursoNaoEncontradoError) {
            return reply.status(404).send({ message: error.message });
        }

        throw error;
    }
}
