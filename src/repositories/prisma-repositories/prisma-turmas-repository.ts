import { Prisma } from "@prisma/client";
import { prisma } from "../../lib/prisma";
import { TurmasRepository } from "../turmas-repository";

export class PrismaTurmasRepository implements TurmasRepository {
    async create(data: Prisma.TurmaCreateInput) {
        const turma = await prisma.turma.create({
            data,
        });
        return turma;
    }

    async findById(id: string) {
        const turma = await prisma.turma.findUnique({
            where: { id },
        });

        return turma;
    }

    async findByNome(nome: string) {
        const turma = await prisma.turma.findFirst({
            where: { nome },
        });

        return turma;
    }

    async findMany(page: number) {
        const turmas = await prisma.turma.findMany({
            take: 20,
            skip: (page - 1) * 20,
        });

        if (!turmas) {
            return [];
        }

        return turmas;
    }

    async update(id: string, data: Prisma.TurmaUpdateInput) {
        const turma = await prisma.turma.update({
            where: { id },
            data,
            include: {
                alocacoes: true
            }
        });

        return turma;
    }

    async delete(id: string) {
        await prisma.turma.delete({
            where: { id },
        });
    }
}