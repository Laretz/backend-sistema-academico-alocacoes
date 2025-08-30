import { Prisma } from "@prisma/client";
import { prisma } from "../../lib/prisma";
import { AlocacoesRepository } from "../alocacoes-repository";

export class PrismaAlocacoesRepository implements AlocacoesRepository {
    async create(data: Prisma.AlocacaoCreateInput) {
        const alocacao = await prisma.alocacao.create({
            data,
        });
        return alocacao;
    }

    async findById(id: string) {
        const alocacao = await prisma.alocacao.findUnique({
            where: { id },
            include: {
                user: true,
                disciplina: true,
                turma: true,
                sala: true,
                horario: true
            }
        });

        return alocacao;
    }

    async findByUserIdAndHorarioId(id_user: string, id_horario: string) {
        const alocacao = await prisma.alocacao.findFirst({
            where: {
                id_user,
                id_horario
            },
        });

        return alocacao;
    }

    async findBySalaIdAndHorarioId(id_sala: string, id_horario: string) {
        const alocacao = await prisma.alocacao.findFirst({
            where: {
                id_sala,
                id_horario
            },
        });

        return alocacao;
    }

    async findByTurmaIdAndHorarioId(id_turma: string, id_horario: string) {
        const alocacao = await prisma.alocacao.findFirst({
            where: {
                id_turma,
                id_horario
            },
        });

        return alocacao;
    }

    async findMany(page: number) {
        const alocacoes = await prisma.alocacao.findMany({
            take: 20,
            skip: (page - 1) * 20,
            include: {
                user: true,
                disciplina: true,
                turma: true,
                sala: true,
                horario: true
            }
        });

        return alocacoes;
    }

    async findByUserId(id_user: string, page: number) {
        const alocacoes = await prisma.alocacao.findMany({
            where: {
                id_user
            },
            take: 20,
            skip: (page - 1) * 20,
            include: {
                disciplina: true,
                turma: true,
                sala: true,
                horario: true
            }
        });

        return alocacoes;
    }

    async findByTurmaId(id_turma: string, page: number) {
        const alocacoes = await prisma.alocacao.findMany({
            where: {
                id_turma
            },
            take: 20,
            skip: (page - 1) * 20,
            include: {
                user: true,
                disciplina: true,
                sala: true,
                horario: true
            }
        });

        return alocacoes;
    }

    async findAllByTurmaId(id_turma: string) {
        const alocacoes = await prisma.alocacao.findMany({
            where: {
                id_turma
            },
            include: {
                user: true,
                disciplina: true,
                sala: true,
                horario: true
            }
        });

        return alocacoes;
    }

    async findBySalaId(id_sala: string, page: number) {
        const alocacoes = await prisma.alocacao.findMany({
            where: {
                id_sala
            },
            take: 20,
            skip: (page - 1) * 20,
            include: {
                user: true,
                disciplina: true,
                turma: true,
                horario: true
            }
        });

        return alocacoes;
    }

    async update(id: string, data: Prisma.AlocacaoUpdateInput) {
        const alocacao = await prisma.alocacao.update({
            where: { id },
            data,
            include: {
                user: true,
                disciplina: true,
                turma: true,
                sala: true,
                horario: true
            }
        });

        return alocacao;
    }

    async delete(id: string) {
        await prisma.alocacao.delete({
            where: { id },
        });
    }
}