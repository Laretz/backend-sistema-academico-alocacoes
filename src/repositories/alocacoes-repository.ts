import { Prisma, Alocacao } from "@prisma/client";

// Tipo para alocações com relacionamentos incluídos
export type AlocacaoWithRelations = Alocacao & {
  user: {
    id: string;
    nome: string;
    email: string;
    senha: string;
    role: any;
    especializacao: string | null;
    carga_horaria_max: number | null;
    preferencia: string | null;
  };
  disciplina: {
    id: string;
    nome: string;
    codigo: string | null;
    carga_horaria: number;
    carga_horaria_atual: number;
    total_aulas: number;
    aulas_ministradas: number;
    tipo_de_sala: any;
    data_inicio: Date | null;
    data_fim_prevista: Date | null;
    data_fim_real: Date | null;
    periodo_letivo: string | null;
    horario_consolidado: string | null;
    id_curso: string;
    semestre: number;
    obrigatoria: boolean;
  };
  turma: {
    id: string;
    nome: string;
    num_alunos: number;
    periodo: number;
    turno: string;
    id_curso: string;
    ativa: boolean;
  };
  sala: {
    id: string;
    nome: string;
    ativa: boolean;
    numero: string | null;
    capacidade: number;
    tipo: string;
    computadores: number;
    predioId: string | null;
    predio?: {
      id: string;
      nome: string;
      codigo: string;
      created_at: Date;
      updated_at: Date;
      descricao: string | null;
    } | null;
  };
  horario: {
    id: string;
    codigo: string;
    dia_semana: string;
    horario_inicio: Date;
    horario_fim: Date;
  };
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
    findByDisciplinaId(id_disciplina: string): Promise<AlocacaoWithRelations[]>
    findByPeriodoManha(page: number): Promise<AlocacaoWithRelations[]>
    findByTurmaIdWithPeriodo(id_turma: string, periodo: string, page: number): Promise<AlocacaoWithRelations[]>
    deleteAllByTurmaId(id_turma: string): Promise<void>
    update(id: string, data: Prisma.AlocacaoUpdateInput): Promise<Alocacao>
    delete(id: string): Promise<void>
}