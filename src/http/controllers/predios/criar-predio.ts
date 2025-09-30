import { FastifyReply, FastifyRequest } from "fastify";
import { PrismaClient } from "@prisma/client";
import { createPredioSchema } from "@/schemas/predio";

const prisma = new PrismaClient();

export async function criarPredio(request: FastifyRequest, reply: FastifyReply) {
    const { codigo, nome, descricao } = createPredioSchema.parse(request.body);

    try {
        // Verificar se já existe um prédio com o mesmo código
        const predioExistente = await prisma.predio.findUnique({
            where: { codigo }
        });

        if (predioExistente) {
            return reply.status(400).send({ 
                message: "Já existe um prédio com este código" 
            });
        }

        const predio = await prisma.predio.create({
            data: {
                codigo,
                nome,
                descricao: descricao ?? null,
            },
        });

        return reply.status(201).send({ predio });
    } catch (error) {
        console.error("Erro ao criar prédio:", error);
        return reply.status(500).send({ message: "Erro interno do servidor" });
    }
}
