import { Prisma, Horario } from "@prisma/client";

export interface HorariosRepository {
    create(data: Prisma.HorarioCreateInput): Promise<Horario>
    findById(id: string): Promise<Horario | null>
    findByDiaEHorario(dia_semana: string, horario_inicio: Date, horario_fim: Date): Promise<Horario | null>
    findMany(page: number): Promise<Horario[]>
    update(id: string, data: Prisma.HorarioUpdateInput): Promise<Horario>
    delete(id: string): Promise<void>
}