import { FastifyReply, FastifyRequest } from "fastify";
import { PrismaClient } from "@prisma/client";
import { predioParamsSchema } from "@/schemas/predio";

const prisma = new PrismaClient();

export async function excluirPredio(request: FastifyRequest, reply: FastifyReply) {
    const { id } = predioParamsSchema.parse(request.params);

    try {
        // Verificar se o prédio existe
        const predioExistente = await prisma.predio.findUnique({
            where: { id },
            include: {
                salas: true
            }
        });

        if (!predioExistente) {
            return reply.status(404).send({ message: "Prédio não encontrado" });
        }

        // Verificar se o prédio possui salas associadas
        if (predioExistente.salas.length > 0) {
            return reply.status(400).send({ 
                message: "Não é possível excluir um prédio que possui salas associadas" 
            });
        }

        await prisma.predio.delete({
            where: { id }
        });

        return reply.status(204).send();
    } catch (error) {
        console.error("Erro ao excluir prédio:", error);
        return reply.status(500).send({ message: "Erro interno do servidor" });
    }
}
