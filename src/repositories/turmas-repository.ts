import { Prisma, Turma } from "@prisma/client";

export interface TurmasRepository {
    create(data: Prisma.TurmaCreateInput): Promise<Turma>
    findById(id: string): Promise<Turma | null>
    findByNome(nome: string): Promise<Turma | null>
    findMany(page: number): Promise<Turma[]>
    update(id: string, data: Prisma.TurmaUpdateInput): Promise<Turma>
    delete(id: string): Promise<void>
}