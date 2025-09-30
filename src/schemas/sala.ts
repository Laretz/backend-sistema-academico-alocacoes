import { z } from "zod";
import { 
  uuidSchema, 
  searchSchema, 
  sortSchema,
  nonEmptyStringSchema,
  positiveIntegerSchema,
  nomeSchema
} from "./common";

// ===== SCHEMAS DE REQUEST =====

// Schema para parâmetros de rota (ID)
export const salaParamsSchema = z.object({
  id: uuidSchema,
});

// Schema para criação de sala
export const createSalaSchema = z.object({
  nome: nomeSchema,
  numero: z.string().optional(),
  predioId: uuidSchema,
  capacidade: positiveIntegerSchema,
  tipo: z.string(),
  computadores: positiveIntegerSchema.optional().default(0),
});

// Schema para atualização de sala (campos opcionais)
export const updateSalaSchema = z.object({
  nome: nomeSchema.optional(),
  numero: z.string().optional(),
  predioId: uuidSchema.optional(),
  capacidade: positiveIntegerSchema.optional(),
  tipo: z.string().optional(),
  computadores: positiveIntegerSchema.optional(),
});

// Schema para query de busca de salas
export const salaQuerySchema = z.object({
  ...searchSchema.shape,
  ...sortSchema.shape,
  predioId: uuidSchema.optional(),
});

// ===== SCHEMAS DE RESPOSTA =====

// Schema base da sala
export const salaSchema = z.object({
  id: uuidSchema,
  nome: z.string(),
  numero: z.string().nullable(),
  capacidade: z.number(),
  tipo: z.string(),
  computadores: z.number(),
  predioId: z.string().nullable(),
  ativa: z.boolean(),
  created_at: z.date(),
  updated_at: z.date(),
});

// Schema da sala com prédio incluído
export const salaComPredioSchema = salaSchema.extend({
  predio: z.object({
    id: uuidSchema,
    codigo: z.string(),
    nome: z.string(),
  }).nullable(),
});

// Schema de resposta para criação/atualização
export const salaResponseSchema = z.object({
  sala: salaSchema
});

// Schema de resposta para listagem
export const salasListResponseSchema = z.object({
  salas: z.array(salaComPredioSchema)
});

// ===== TIPOS TYPESCRIPT =====

export type SalaParams = z.infer<typeof salaParamsSchema>;
export type CreateSalaData = z.infer<typeof createSalaSchema>;
export type UpdateSalaData = z.infer<typeof updateSalaSchema>;
export type SalaQueryData = z.infer<typeof salaQuerySchema>;