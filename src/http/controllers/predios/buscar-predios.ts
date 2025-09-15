import { FastifyReply, FastifyRequest } from "fastify";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function buscarPredios(request: FastifyRequest, reply: FastifyReply) {
    try {
        const predios = await prisma.predio.findMany({
            include: {
                salas: {
                    select: {
                        id: true,
                        nome: true,
                        capacidade: true,
                        tipo: true
                    }
                }
            },
            orderBy: {
                nome: 'asc'
            }
        });

        return reply.status(200).send({ predios });
    } catch (error) {
        console.error("Erro ao buscar prédios:", error);
        return reply.status(500).send({ message: "Erro interno do servidor" });
    }
}
