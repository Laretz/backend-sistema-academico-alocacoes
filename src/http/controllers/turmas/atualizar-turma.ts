import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { RecursoNaoEncontradoError } from "../../../use-cases/errors/recurso-nao-encontrado";
import { makeAtualizarTurmaUseCase } from "../../../use-cases/@factories/make-atualizar-turma-use-case";

export async function atualizarTurma(request: FastifyRequest, reply: FastifyReply) {
    const atualizarTurmaParamsSchema = z.object({
        id: z.string().uuid(),
    });

    const atualizarTurmaBodySchema = z.object({
        nome: z.string().optional(),
        numAlunos: z.number().optional(),
        periodo: z.number().optional(),
        turno: z.string().optional(),
    });

    const { id } = atualizarTurmaParamsSchema.parse(request.params);
    const { nome, numAlunos, periodo, turno } = atualizarTurmaBodySchema.parse(request.body);

    try {
        const atualizarTurmaUseCase = makeAtualizarTurmaUseCase();

        const { turma } = await atualizarTurmaUseCase.execute({
            id,
            nome,
            numAlunos,
            periodo,
            turno,
        });

        return reply.status(200).send({ turma });
    } catch (error) {
        if (error instanceof RecursoNaoEncontradoError) {
            return reply.status(404).send({ message: error.message });
        }

        throw error;
    }
}