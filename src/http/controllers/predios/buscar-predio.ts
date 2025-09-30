import { FastifyReply, FastifyRequest } from "fastify";
import { PrismaClient } from "@prisma/client";
import { predioParamsSchema } from "@/schemas/predio";

const prisma = new PrismaClient();

export async function buscarPredio(request: FastifyRequest, reply: FastifyReply) {
    const { id } = predioParamsSchema.parse(request.params);

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
