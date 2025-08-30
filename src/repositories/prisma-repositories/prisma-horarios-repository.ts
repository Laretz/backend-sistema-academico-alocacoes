import { Prisma } from "@prisma/client";
import { prisma } from "../../lib/prisma";
import { HorariosRepository } from "../horarios-repository";

export class PrismaHorariosRepository implements HorariosRepository {
    async create(data: Prisma.HorarioCreateInput) {
        const horario = await prisma.horario.create({
            data,
        });
        return horario;
    }

    async findById(id: string) {
        const horario = await prisma.horario.findUnique({
            where: { id },
        });

        return horario;
    }

    async findByDiaEHorario(diaSemana: string, horarioInicio: Date, horarioFim: Date) {
        const horario = await prisma.horario.findFirst({
            where: {
                diaSemana,
                horarioInicio,
                horarioFim
            },
        });

        return horario;
    }

    async findMany(page: number) {
        const horarios = await prisma.horario.findMany({
            take: 20,
            skip: (page - 1) * 20,
        });

        return horarios;
    }

    async update(id: string, data: Prisma.HorarioUpdateInput) {
        const horario = await prisma.horario.update({
            where: { id },
            data,
            include: {
                alocacoes: true
            }
        });

        return horario;
    }

    async delete(id: string) {
        await prisma.horario.delete({
            where: { id },
        });
    }
}