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
            include: {
                curso: {
                    select: {
                        id: true,
                        nome: true,
                        codigo: true,
                    },
                },
            },
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
            select: {
                id: true,
                nome: true,
                codigo: true,
                carga_horaria: true,
                carga_horaria_atual: true,
                total_aulas: true,
                aulas_ministradas: true,
                data_inicio: true,
                data_fim_prevista: true,
                data_fim_real: true,
                periodo_letivo: true,
                tipo_de_sala: true,
                horario_consolidado: true,
                obrigatoria: true,
                semestre: true,
                id_curso: true,
                curso: {
                    select: {
                        id: true,
                        nome: true,
                        codigo: true,
                    },
                },
            },
        });

        return disciplinas;
    }

    async findByIds(ids: string[]) {
        const disciplinas = await prisma.disciplina.findMany({
            where: {
                id: {
                    in: ids
                }
            },
            include: {
                curso: {
                    select: {
                        id: true,
                        nome: true,
                        codigo: true,
                    },
                },
            },
        });

        return disciplinas;
    }

    async findByCurso(cursoId: string) {
        const disciplinas = await prisma.disciplina.findMany({
            where: {
                id_curso: cursoId
            },
            include: {
                curso: {
                    select: {
                        id: true,
                        nome: true,
                        codigo: true,
                    },
                },
            },
        });

        return disciplinas;
    }

    async findAll() {
        const disciplinas = await prisma.disciplina.findMany({
            include: {
                curso: {
                    select: {
                        id: true,
                        nome: true,
                        codigo: true,
                    },
                },
            },
        });

        return disciplinas;
    }

    async update(id: string, data: Prisma.DisciplinaUpdateInput) {
        const disciplina = await prisma.disciplina.update({
            where: { id },
            data,
            include: {
                curso: {
                    select: {
                        id: true,
                        nome: true,
                        codigo: true,
                    },
                },
                alocacoes: true
            },
        });

        return disciplina;
    }

    async delete(id: string) {
        await prisma.disciplina.delete({
            where: { id },
        });
    }
}