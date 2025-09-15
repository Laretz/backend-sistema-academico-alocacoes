import { Prisma, Alocacao } from "@prisma/client";

// Tipo para alocações com relacionamentos incluídos
export type AlocacaoWithRelations = Alocacao & {
  user?: {
    id: string;
    nome: string;
    email: string;
    especializacao?: string | null;
  } | null;
  disciplina?: {
    id: string;
    nome: string;
    codigo?: string | null;
    carga_horaria?: number;
    cargaHorariaTotal?: number;
  } | null;
  turma?: {
    id: string;
    nome: string;
    num_alunos: number;
    periodo: number;
    turno: string;
  } | null;
  sala?: {
    id: string;
    nome: string;
    numero: string;
    capacidade: number;
    tipo: string;
    computadores: number;
    predioId: string | null;
    ativa: boolean;
    predio?: {
      id: string;
      nome: string;
    } | null;
  } | null;
  horario?: {
    id: string;
    codigo: string;
    dia_semana: string;
    horario_inicio: Date;
    horario_fim: Date;
  } | null;
};

export interface AlocacoesRepository {
    create(data: Prisma.AlocacaoCreateInput): Promise<Alocacao>
    findById(id: string): Promise<AlocacaoWithRelations | null>
    findByUserIdAndHorarioId(id_user: string, id_horario: string): Promise<Alocacao | null>
    findBySalaIdAndHorarioId(id_sala: string, id_horario: string): Promise<Alocacao | null>
    findByTurmaIdAndHorarioId(id_turma: string, id_horario: string): Promise<Alocacao | null>
    findMany(page: number): Promise<AlocacaoWithRelations[]>
    findByUserId(id_user: string, page: number): Promise<AlocacaoWithRelations[]>
    findByTurmaId(id_turma: string, page: number): Promise<AlocacaoWithRelations[]>
    findAllByTurmaId(id_turma: string): Promise<AlocacaoWithRelations[]>
    findBySalaId(id_sala: string, page: number): Promise<AlocacaoWithRelations[]>
    update(id: string, data: Prisma.AlocacaoUpdateInput): Promise<Alocacao>
    delete(id: string): Promise<void>
}