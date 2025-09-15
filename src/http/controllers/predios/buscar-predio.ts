import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function buscarPredio(request: FastifyRequest, reply: FastifyReply) {
    const buscarPredioParamsSchema = z.object({
        id: z.string().uuid(),
    });

    const { id } = buscarPredioParamsSchema.parse(request.params);

    try {
        const predio = await prisma.predio.findUnique({
            where: { id },
            include: {
                salas: {
                    select: {
                        id: true,
                        nome: true,
                        capacidade: true,
                        tipo: true,
                        computadores: true
                    }
                }
            }
        });

        if (!predio) {
            return reply.status(404).send({ message: "Prédio não encontrado" });
        }

        return reply.status(200).send({ predio });
    } catch (error) {
        console.error("Erro ao buscar prédio:", error);
        return reply.status(500).send({ message: "Erro interno do servidor" });
    }
}
