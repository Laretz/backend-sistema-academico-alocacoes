import { Prisma, Alocacao } from "@prisma/client";

export interface AlocacoesRepository {
    create(data: Prisma.AlocacaoCreateInput): Promise<Alocacao>
    findById(id: string): Promise<Alocacao | null>
    findByUserIdAndHorarioId(id_user: string, id_horario: string): Promise<Alocacao | null>
    findBySalaIdAndHorarioId(id_sala: string, id_horario: string): Promise<Alocacao | null>
    findByTurmaIdAndHorarioId(id_turma: string, id_horario: string): Promise<Alocacao | null>
    findMany(page: number): Promise<Alocacao[]>
    findByUserId(id_user: string, page: number): Promise<Alocacao[]>
    findByTurmaId(id_turma: string, page: number): Promise<Alocacao[]>
    findAllByTurmaId(id_turma: string): Promise<Alocacao[]>
    findBySalaId(id_sala: string, page: number): Promise<Alocacao[]>
    update(id: string, data: Prisma.AlocacaoUpdateInput): Promise<Alocacao>
    delete(id: string): Promise<void>
}