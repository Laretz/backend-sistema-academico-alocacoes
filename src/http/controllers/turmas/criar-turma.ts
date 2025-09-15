import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeCriarTurmaUseCase } from "@/use-cases/@factories/turma/make-criar-turma-use-case";

export async function criarTurma(request: FastifyRequest, reply: FastifyReply) {
    const criarTurmaBodySchema = z.object({
        nome: z.string(),
        num_alunos: z.number(),
        periodo: z.number(),
        turno: z.string(),
        id_curso: z.string(),
    });

    const { nome, num_alunos, periodo, turno, id_curso } = criarTurmaBodySchema.parse(request.body);

    try {
        const criarTurmaUseCase = makeCriarTurmaUseCase();

        const { turma } = await criarTurmaUseCase.execute({
            nome,
            num_alunos,
            periodo,
            turno,
            id_curso,
        });

        return reply.status(201).send({ turma });
    } catch (error) {
        throw error;
    }
}
