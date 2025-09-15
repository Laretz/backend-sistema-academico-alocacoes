import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { makeCriarHorarioCodigoUseCase } from "@/use-cases/@factories/horario/make-criar-horario-codigo-use-case";

export async function criarHorarioCodigo(request: FastifyRequest, reply: FastifyReply) {
    const criarHorarioCodigoBodySchema = z.object({
        codigo: z.string().min(3).max(10), // Exemplo: "2M12"
    });

    const { codigo } = criarHorarioCodigoBodySchema.parse(request.body);

    try {
        const criarHorarioCodigoUseCase = makeCriarHorarioCodigoUseCase();

        const { horario } = await criarHorarioCodigoUseCase.execute({
            codigo,
        });

        return reply.status(201).send({ horario });
    } catch (error) {
        if (error instanceof Error) {
            return reply.status(400).send({ message: error.message });
        }
        throw error;
    }
}
