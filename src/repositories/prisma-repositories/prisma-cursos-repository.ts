import { Prisma } from "@prisma/client";
import { prisma } from "../../lib/prisma";
import { CursosRepository } from "../cursos-repository";

export class PrismaCursosRepository implements CursosRepository {
    async create(data: Prisma.CursoCreateInput) {
        const curso = await prisma.curso.create({
            data,
        });
        return curso;
    }

    async findById(id: string) {
        const curso = await prisma.curso.findUnique({
            where: { id },
        });

        return curso;
    }

    async findByNome(nome: string) {
        const curso = await prisma.curso.findFirst({
            where: { nome },
        });

        return curso;
    }

    async findMany(page: number) {
        const cursos = await prisma.curso.findMany({
            take: 20,
            skip: (page - 1) * 20,
        });

        return cursos;
    }

    async update(id: string, data: Prisma.CursoUpdateInput) {
        const curso = await prisma.curso.update({
            where: { id },
            data,
            include: {
                disciplinas: true
            }
        });

        return curso;
    }

    async delete(id: string) {
        await prisma.curso.delete({
            where: { id },
        });
    }
}