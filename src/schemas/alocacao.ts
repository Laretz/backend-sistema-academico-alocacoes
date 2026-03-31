import { z } from "zod";
import { positiveIntegerSchema } from "./common";

// Helper para transformar Date em string
const dateToStringTransform = z
  .union([z.date(), z.string()])
  .transform((val) => {
    if (val instanceof Date) {
      return val.toISOString();
    }
    return val;
  });

// Helper para transformar Date nullable em string nullable
const nullableDateToStringTransform = z
  .union([z.date(), z.string(), z.null()])
  .transform((val) => {
    if (val instanceof Date) {
      return val.toISOString();
    }
    return val;
  });

// ===== SCHEMAS DE REQUISIÇÃO =====

// Schema para parâmetros de rota (ID da alocação)
export const alocacaoParamsSchema = z.object({
  id: z.string().uuid("ID deve ser um UUID válido"),
});

// Schema para criar alocação
export const createAlocacaoSchema = z
  .object({
    id_user: z.string().uuid("ID do usuário deve ser um UUID válido"),
    id_curso_disciplina: z
      .string()
      .uuid("ID de cursoDisciplina deve ser um UUID válido"),
    id_turma: z.string().uuid("ID da turma deve ser um UUID válido"),
    id_sala: z.string().uuid("ID da sala deve ser um UUID válido"),
    id_horario: z
      .string()
      .uuid("ID do horário deve ser um UUID válido")
      .optional(),
    id_horarios: z
      .array(z.string().uuid("ID do horário deve ser um UUID válido"))
      .optional(),
  })
  .refine(
    (data) => {
      // Deve ter exatamente um dos dois: id_horario OU id_horarios
      return (
        (data.id_horario && !data.id_horarios) ||
        (!data.id_horario && data.id_horarios)
      );
    },
    {
      message:
        "Deve fornecer exatamente um dos campos: 'id_horario' ou 'id_horarios'",
    },
  );

// Schema para atualizar alocação
export const updateAlocacaoSchema = z.object({
  id_user: z.string().uuid("ID do usuário deve ser um UUID válido").optional(),
  id_curso_disciplina: z
    .string()
    .uuid("ID de cursoDisciplina deve ser um UUID válido")
    .optional(),
  id_turma: z.string().uuid("ID da turma deve ser um UUID válido").optional(),
  id_sala: z.string().uuid("ID da sala deve ser um UUID válido").optional(),
  id_horario: z
    .string()
    .uuid("ID do horário deve ser um UUID válido")
    .optional(),
});

// Schema para buscar alocações (paginação)
export const alocacoesQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  id_turma: z.string().uuid("ID da turma deve ser um UUID válido").optional(),
});

// Schema para buscar grade de horários
export const gradeHorariosQuerySchema = z.object({
  id_turma: z.string().uuid("ID da turma deve ser um UUID válido").optional(),
  id_user: z.string().uuid("ID do usuário deve ser um UUID válido").optional(),
  id_sala: z.string().uuid("ID da sala deve ser um UUID válido").optional(),
});

// Schema para buscar alocações por professor
export const alocacoesProfessorParamsSchema = z.object({
  id_professor: z.string().uuid("ID do professor deve ser um UUID válido"),
});

// Schema para buscar alocações por turma e turno
export const alocacoesTurmaTurnoParamsSchema = z.object({
  id_turma: z.string().uuid("ID da turma deve ser um UUID válido"),
});

// Schema para query de buscar alocações por turma e turno
export const alocacoesTurmaTurnoQuerySchema = z.object({
  turno: z.string().min(1, "Turno é obrigatório"),
  page: z.coerce.number().int().positive().default(1),
});

// Schema para excluir todas as alocações de uma turma
export const excluirAlocacoesTurmaParamsSchema = z.object({
  id_turma: z.string().uuid("ID da turma deve ser um UUID válido"),
});

export const excluirAlocacoesDisciplinaTurmaParamsSchema = z.object({
  id_turma: z.string().uuid("ID da turma deve ser um UUID válido"),
  id_disciplina: z.string().uuid("ID da disciplina deve ser um UUID válido"),
});

// ===== SCHEMAS DE RESPOSTA =====

// Schema para horário na resposta
export const horarioAlocacaoResponseSchema = z.object({
  id: z.string(),
  codigo: z.string(),
  dia_semana: z.string(),
  horario_inicio: dateToStringTransform,
  horario_fim: dateToStringTransform,
});

// Schema para disciplina na resposta
export const disciplinaAlocacaoResponseSchema = z.object({
  id: z.string(),
  nome: z.string(),
  codigo: z.string().nullable(),
  carga_horaria: z.number(),
  carga_horaria_atual: z.number(),
  total_aulas: z.number(),
  aulas_ministradas: z.number(),
  tipo_de_sala: z.string(),
  data_inicio: nullableDateToStringTransform,
  data_fim_prevista: nullableDateToStringTransform,
  data_fim_real: nullableDateToStringTransform,
  periodo_letivo: z.string().nullable(),
  horario_consolidado: z.string().nullable(),
  id_curso: z.string(),
  semestre: z.number(),
  obrigatoria: z.boolean(),
});

// Schema para usuário (professor) na resposta
export const usuarioAlocacaoResponseSchema = z.object({
  id: z.string(),
  nome: z.string(),
  email: z.string(),
  role: z.string(),
  especializacao: z.string().nullable(),
  carga_horaria_max: z.number().nullable(),
  preferencia: z.string().nullable(),
});

// Schema para turma na resposta
export const turmaAlocacaoResponseSchema = z.object({
  id: z.string(),
  nome: z.string(),
  num_alunos: z.number(),
  semestre: z.number(),
  turno: z.string(),
  id_curso: z.string(),
  ativa: z.boolean(),
});

// Schema para prédio na resposta
export const predioAlocacaoResponseSchema = z.object({
  id: z.string(),
  nome: z.string(),
  codigo: z.string(),
  descricao: z.string().nullable(),
});

// Schema para sala na resposta
export const salaAlocacaoResponseSchema = z.object({
  id: z.string(),
  nome: z.string(),
  ativa: z.boolean(),
  numero: z.string().nullable(),
  capacidade: z.number(),
  tipo: z.string(),
  computadores: z.number(),
  predioId: z.string().nullable(),
  predio: predioAlocacaoResponseSchema.nullable().optional(),
});

// Schema para alocação individual
export const alocacaoResponseSchema = z.object({
  id: z.string(),
  id_user: z.string(),
  id_curso_disciplina: z.string(),
  id_turma: z.string(),
  id_sala: z.string(),
  id_horario: z.string(),
  created_at: dateToStringTransform,
  user: usuarioAlocacaoResponseSchema.optional(),
  disciplina: disciplinaAlocacaoResponseSchema.optional(),
  turma: turmaAlocacaoResponseSchema.optional(),
  sala: salaAlocacaoResponseSchema.optional(),
  horario: horarioAlocacaoResponseSchema.optional(),
});

// Resposta para criação de alocação: único ou múltiplos
export const createAlocacaoResponseSchema = z.union([
  z.object({ alocacao: alocacaoResponseSchema, conflitos: z.any().optional() }),
  z.object({
    alocacoes: z.array(alocacaoResponseSchema),
    conflitos: z.any().optional(),
  }),
]);

// Schema simples para alocação (sem relacionamentos)
export const alocacaoSimpleResponseSchema = z.object({
  id: z.string(),
  id_user: z.string(),
  id_curso_disciplina: z.string(),
  id_turma: z.string(),
  id_sala: z.string(),
  id_horario: z.string(),
  created_at: dateToStringTransform,
});

// Schema para lista de alocações
export const alocacoesListResponseSchema = z.object({
  alocacoes: z.array(alocacaoResponseSchema),
});

// Schema para horário de alocação na grade
export const horarioAlocacaoSchema = z.object({
  id: z.string(),
  dia_semana: z.string(),
  horario_inicio: dateToStringTransform,
  horario_fim: dateToStringTransform,
  disciplina: z.object({
    id: z.string(),
    nome: z.string(),
    cargaHorariaTotal: z.number(),
  }),
  professor: z.object({
    id: z.string(),
    nome: z.string(),
    especializacao: z.string().nullable(),
  }),
  sala: z.object({
    id: z.string(),
    nome: z.string(),
    predio: z.string(),
    capacidade: z.number(),
    tipo: z.string(),
  }),
  turma: z.object({
    id: z.string(),
    nome: z.string(),
    num_alunos: z.number(),
    periodo: z.number(),
    turno: z.string(),
  }),
});

// Schema para grade de horários
export const gradeHorariosResponseSchema = z.object({
  gradeHorarios: z.object({
    segunda: z.array(horarioAlocacaoSchema),
    terca: z.array(horarioAlocacaoSchema),
    quarta: z.array(horarioAlocacaoSchema),
    quinta: z.array(horarioAlocacaoSchema),
    sexta: z.array(horarioAlocacaoSchema),
    sabado: z.array(horarioAlocacaoSchema),
  }),
});

// Schema para quantidade de aulas por professor
export const quantidadeAulasProfessorResponseSchema = z.object({
  cargaHoraria: z.record(z.string(), z.number()),
});

// ===== SCHEMAS DE ERRO =====

// Schema para erro de alocação não encontrada
export const alocacaoNotFoundErrorSchema = z.object({
  message: z.string().default("Alocação não encontrada"),
});

// Schema para erro de conflito de horário
export const conflictErrorSchema = z.object({
  message: z.string(),
});

// Schema para erro de validação de alocação
export const alocacaoValidationErrorSchema = z.object({
  message: z.string(),
  errors: z
    .array(
      z.object({
        field: z.string(),
        message: z.string(),
      }),
    )
    .optional(),
});

// ===== TIPOS TYPESCRIPT =====

export type AlocacaoParams = z.infer<typeof alocacaoParamsSchema>;
export type CreateAlocacaoRequest = z.infer<typeof createAlocacaoSchema>;
export type UpdateAlocacaoRequest = z.infer<typeof updateAlocacaoSchema>;
export type AlocacoesQueryRequest = z.infer<typeof alocacoesQuerySchema>;
export type GradeHorariosQueryRequest = z.infer<
  typeof gradeHorariosQuerySchema
>;
export type AlocacoesProfessorParams = z.infer<
  typeof alocacoesProfessorParamsSchema
>;
export type AlocacoesTurmaTurnoParams = z.infer<
  typeof alocacoesTurmaTurnoParamsSchema
>;
export type ExcluirAlocacoesTurmaParams = z.infer<
  typeof excluirAlocacoesTurmaParamsSchema
>;

export type AlocacaoResponse = z.infer<typeof alocacaoResponseSchema>;
export type AlocacoesListResponse = z.infer<typeof alocacoesListResponseSchema>;
export type GradeHorariosResponse = z.infer<typeof gradeHorariosResponseSchema>;
export type QuantidadeAulasProfessorResponse = z.infer<
  typeof quantidadeAulasProfessorResponseSchema
>;

export type AlocacaoNotFoundError = z.infer<typeof alocacaoNotFoundErrorSchema>;
export type ConflictError = z.infer<typeof conflictErrorSchema>;
export type AlocacaoValidationError = z.infer<
  typeof alocacaoValidationErrorSchema
>;
