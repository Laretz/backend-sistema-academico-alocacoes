import { Prisma, Horario } from "@prisma/client";

export interface HorariosRepository {
    create(data: Prisma.HorarioCreateInput): Promise<Horario>
    findById(id: string): Promise<Horario | null>
    findByDiaEHorario(diaSemana: string, horarioInicio: Date, horarioFim: Date): Promise<Horario | null>
    findMany(page: number): Promise<Horario[]>
    update(id: string, data: Prisma.HorarioUpdateInput): Promise<Horario>
    delete(id: string): Promise<void>
}