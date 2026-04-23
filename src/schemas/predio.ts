import { z } from 'zod';
import { 
  uuidSchema, 
  searchSchema, 
  sortSchema,
  nonEmptyStringSchema,
  codigoSchema,
  nomeSchema
} from './common';

// ===== SCHEMAS DE PARÂMETROS =====

// Schema para parâmetros de rota (ID)
export const predioParamsSchema = z.object({
  id: uuidSchema
});

// ===== SCHEMAS DE CRIAÇÃO =====

// Schema para criação de prédio
export const createPredioSchema = z.object({
  codigo: codigoSchema,
  nome: nomeSchema,
  descricao: z.string().optional()
});

// ===== SCHEMAS DE ATUALIZAÇÃO =====

// Schema para atualização de prédio
export const updatePredioSchema = z.object({
  codigo: codigoSchema.optional(),
  nome: nomeSchema.optional(),
  descricao: z.string().optional()
});

// ===== SCHEMAS DE BUSCA =====

// Schema para query parameters de busca
export const predioQuerySchema = z.object({
  ...searchSchema.shape,
  sortBy: z
    .enum(["nome", "codigo", "created_at", "updated_at", "descricao"])
    .optional()
    .default("nome"),
  sortOrder: z.enum(["asc", "desc"]).optional().default("asc"),
});

// ===== SCHEMAS DE RESPOSTA =====

// Schema base do prédio
export const predioSchema = z.object({
  id: uuidSchema,
  codigo: z.string(),
  nome: z.string(),
  descricao: z.string().nullable(),
  created_at: z.date(),
  updated_at: z.date()
});

// Schema da sala simplificado para uso no prédio
export const salaSimplificadaSchema = z.object({
  id: uuidSchema,
  nome: z.string(),
  numero: z.string().nullable(),
  capacidade: z.number(),
  tipo: z.string(),
  computadores: z.number(),
  ativa: z.boolean(),
});

// Schema do prédio com salas incluídas
export const predioComSalasSchema = predioSchema.extend({
  salas: z.array(salaSimplificadaSchema)
});

// Schema de resposta para criação/atualização
export const predioResponseSchema = z.object({
  predio: predioSchema
});

// Schema de resposta para listagem (com salas)
export const prediosListResponseSchema = z.object({
  predios: z.array(predioComSalasSchema)
});

// ===== TIPOS TYPESCRIPT =====

export type PredioParams = z.infer<typeof predioParamsSchema>;
export type CreatePredioData = z.infer<typeof createPredioSchema>;
export type UpdatePredioData = z.infer<typeof updatePredioSchema>;
export type PredioQuery = z.infer<typeof predioQuerySchema>;
export type Predio = z.infer<typeof predioSchema>;
export type PredioResponse = z.infer<typeof predioResponseSchema>;
export type PrediosListResponse = z.infer<typeof prediosListResponseSchema>;
