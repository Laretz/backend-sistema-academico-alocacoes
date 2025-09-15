import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function atualizarPredio(request: FastifyRequest, reply: FastifyReply) {
    const atualizarPredioParamsSchema = z.object({
        id: z.string().uuid(),
    });

    const atualizarPredioBodySchema = z.object({
        codigo: z.string().optional(),
        nome: z.string().optional(),
        descricao: z.string().optional(),
    });

    const { id } = atualizarPredioParamsSchema.parse(request.params);
    const { codigo, nome, descricao } = atualizarPredioBodySchema.parse(request.body);

    try {
        // Verificar se o prédio existe
        const predioExistente = await prisma.predio.findUnique({
            where: { id }
        });

        if (!predioExistente) {
            return reply.status(404).send({ message: "Prédio não encontrado" });
        }

        // Se está tentando alterar o código, verificar se não existe outro prédio com o mesmo código
        if (codigo && codigo !== predioExistente.codigo) {
            const predioComMesmoCodigo = await prisma.predio.findUnique({
                where: { codigo }
            });

            if (predioComMesmoCodigo) {
                return reply.status(400).send({ 
                    message: "Já existe um prédio com este código" 
                });
            }
        }

        const predio = await prisma.predio.update({
            where: { id },
            data: {
                ...(codigo && { codigo }),
                ...(nome && { nome }),
                ...(descricao !== undefined && { descricao }),
            },
            include: {
                salas: {
                    select: {
                        id: true,
                        nome: true,
                        capacidade: true,
                        tipo: true
                    }
                }
            }
        });

        return reply.status(200).send({ predio });
    } catch (error) {
        console.error("Erro ao atualizar prédio:", error);
        return reply.status(500).send({ message: "Erro interno do servidor" });
    }
}
