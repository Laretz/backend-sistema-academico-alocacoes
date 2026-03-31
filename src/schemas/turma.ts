import { z } from 'zod';
import { 
  uuidSchema, 
  paginationSchema, 
  searchSchema, 
  sortSchema,
  nonEmptyStringSchema,
  nomeSchema,
  turnoEnum
} from './common';

// ===== SCHEMAS DE PARÂMETROS =====

// Schema para parâmetros de rota (ID)
export const turmaParamsSchema = z.object({
  id: uuidSchema
});

// ===== SCHEMAS DE CRIAÇÃO =====

// Schema para criação de turma
export const createTurmaSchema = z.object({
  nome: nomeSchema,
  num_alunos: z.number().int().positive({ message: 'Número de alunos deve ser positivo' }),
  turno: turnoEnum,
  id_curso: uuidSchema,
  semestre: z.number().int().positive({ message: 'Semestre deve ser positivo' }),
  ativa: z.boolean().optional()
});

// ===== SCHEMAS DE ATUALIZAÇÃO =====

// Schema para atualização de turma
export const updateTurmaSchema = z.object({
  nome: nomeSchema.optional(),
  num_alunos: z.number().int().positive({ message: 'Número de alunos deve ser positivo' }).optional(),
  turno: turnoEnum.optional(),
  id_curso: uuidSchema.optional(),
  semestre: z.number().int().positive({ message: 'Semestre deve ser positivo' }).optional(),
  ativa: z.boolean().optional()
});

// ===== SCHEMAS DE BUSCA =====

// Schema para query parameters de busca
export const turmaQuerySchema = z.object({
  ...paginationSchema.shape,
  ...searchSchema.shape,
  ...sortSchema.shape,
  turno: turnoEnum.optional(),
  semestre: z.string().transform(val => parseInt(val)).pipe(z.number().int().positive()).optional(),
  ativa: z.string().transform(val => val === 'true').pipe(z.boolean()).optional(),
  id_curso: uuidSchema.optional()
});

// ===== SCHEMAS DE RESPOSTA =====

// Schema base da turma
export const turmaSchema = z.object({
  id: uuidSchema,
  nome: z.string(),
  num_alunos: z.number(),
  turno: z.string(),
  id_curso: z.string(),
  semestre: z.number(),
  ativa: z.boolean()
});

// Schema de resposta para criação/atualização
export const turmaResponseSchema = z.object({
  turma: turmaSchema
});

// Schema de resposta para listagem
export const turmasListResponseSchema = z.object({
  turmas: z.array(turmaSchema),
  pagination: z.object({
    page: z.number(),
    limit: z.number(),
    total: z.number(),
    totalPages: z.number(),
    hasNext: z.boolean(),
    hasPrev: z.boolean()
  })
});

// ===== TIPOS TYPESCRIPT =====

export type TurmaParams = z.infer<typeof turmaParamsSchema>;
export type CreateTurmaData = z.infer<typeof createTurmaSchema>;
export type UpdateTurmaData = z.infer<typeof updateTurmaSchema>;
export type TurmaQuery = z.infer<typeof turmaQuerySchema>;
export type Turma = z.infer<typeof turmaSchema>;
export type TurmaResponse = z.infer<typeof turmaResponseSchema>;
export type TurmasListResponse = z.infer<typeof turmasListResponseSchema>;
