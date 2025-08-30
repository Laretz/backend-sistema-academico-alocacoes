import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeCriarTurmaUseCase } from "../../../use-cases/@factories/make-criar-turma-use-case";

export async function criarTurma(request: FastifyRequest, reply: FastifyReply) {
    const criarTurmaBodySchema = z.object({
        nome: z.string(),
        numAlunos: z.number(),
        periodo: z.number(),
        turno: z.string(),
    });

    const { nome, numAlunos, periodo, turno } = criarTurmaBodySchema.parse(request.body);

    try {
        const criarTurmaUseCase = makeCriarTurmaUseCase();

        const { turma } = await criarTurmaUseCase.execute({
            nome,
            numAlunos,
            periodo,
            turno,
        });

        return reply.status(201).send({ turma });
    } catch (error) {
        throw error;
    }
}