import { Prisma } from "@prisma/client";
import { prisma } from "../../lib/prisma";
import { DisciplinasRepository } from "../disciplinas-repository";

export class PrismaDisciplinasRepository implements DisciplinasRepository {
    async create(data: Prisma.DisciplinaCreateInput) {
        const disciplina = await prisma.disciplina.create({
            data,
        });
        return disciplina;
    }

    async findById(id: string) {
        const disciplina = await prisma.disciplina.findUnique({
            where: { id },
        });

        return disciplina;
    }

    async findByNome(nome: string) {
        const disciplina = await prisma.disciplina.findFirst({
            where: { nome },
        });

        return disciplina;
    }

    async findMany(page: number) {
        const disciplinas = await prisma.disciplina.findMany({
            take: 20,
            skip: (page - 1) * 20,
        });

        return disciplinas;
    }

    async update(id: string, data: Prisma.DisciplinaUpdateInput) {
        const disciplina = await prisma.disciplina.update({
            where: { id },
            data,
            include: {
                alocacoes: true
            }
        });

        return disciplina;
    }

    async delete(id: string) {
        await prisma.disciplina.delete({
            where: { id },
        });
    }
}