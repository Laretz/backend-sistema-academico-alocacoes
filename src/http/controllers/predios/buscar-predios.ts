import { FastifyReply, FastifyRequest } from "fastify";
import { PrismaClient } from "@prisma/client";
import { predioQuerySchema } from "@/schemas/predio";

const prisma = new PrismaClient();

export async function buscarPredios(request: FastifyRequest, reply: FastifyReply) {
    const { search, sortBy = 'nome', sortOrder = 'asc' } = predioQuerySchema.parse(request.query);

    try {
        const where = search ? {
            OR: [
                { nome: { contains: search, mode: 'insensitive' as const } },
                { codigo: { contains: search, mode: 'insensitive' as const } },
                { descricao: { contains: search, mode: 'insensitive' as const } }
            ]
        } : {};

        const predios = await prisma.predio.findMany({
            where,
            orderBy: {
                [sortBy]: sortOrder
            },
            include: {
                salas: {
                    where: {
                        ativa: true
                    },
                    select: {
                        id: true,
                        nome: true,
                        numero: true,
                        capacidade: true,
                        tipo: true,
                        computadores: true,
                        ativa: true
                    }
                }
            }
        });

        return reply.status(200).send({ 
            predios
        });
    } catch (error) {
        console.error("Erro ao buscar prédios:", error);
        return reply.status(500).send({ message: "Erro interno do servidor" });
    }
}
