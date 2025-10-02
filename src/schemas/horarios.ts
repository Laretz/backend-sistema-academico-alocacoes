import { z } from "zod";
import { uuidSchema, paginationSchema, searchSchema, sortSchema } from "./common";

// Helper para transformar Date em string
const dateToStringTransform = z.union([z.date(), z.string()]).transform((val) => {
  if (val instanceof Date) {
    return val.toISOString();
  }
  return val;
});

// ========================================
// SCHEMAS DE PARÂMETROS DE ROTA
// ========================================

export const idHorarioParamsSchema = z.object({
  id: uuidSchema,
});

// ========================================
// SCHEMAS DE CRIAÇÃO/CADASTRO
// ========================================

export const criarHorarioSchema = z.object({
  codigo: z.string().min(1, "Código é obrigatório"),
  dia_semana: z.string().min(1, "Dia da semana é obrigatório"),
  horario_inicio: z.string().transform(str => new Date(str)),
  horario_fim: z.string().transform(str => new Date(str)),
});

export const criarHorarioCodigoSchema = z.object({
  codigo: z.string().min(1, "Código é obrigatório"),
});

// ========================================
// SCHEMAS DE ATUALIZAÇÃO
// ========================================

export const atualizarHorarioSchema = z.object({
  codigo: z.string().min(1, "Código é obrigatório").optional(),
  dia_semana: z.string().min(1, "Dia da semana é obrigatório").optional(),
  horario_inicio: z.string().transform(str => new Date(str)).optional(),
  horario_fim: z.string().transform(str => new Date(str)).optional(),
});

// ========================================
// SCHEMAS DE BUSCA (QUERY PARAMS)
// ========================================

export const buscarHorariosQuerySchema = z.object({
  ...paginationSchema.shape,
  ...searchSchema.shape,
  dia_semana: z.string().optional(),
  ...sortSchema.shape,
  orderBy: z.enum(["codigo", "dia_semana", "horario_inicio", "horario_fim", "created_at"]).default("codigo"),
});

// ========================================
// SCHEMAS DE RESPOSTA
// ========================================

export const horarioResponseSchema = z.object({
  id: uuidSchema,
  codigo: z.string(),
  dia_semana: z.string(),
  horario_inicio: dateToStringTransform,
  horario_fim: dateToStringTransform,
});

export const horariosListResponseSchema = z.object({
  horarios: z.array(horarioResponseSchema),
  total: z.number().int().nonnegative(),
  page: z.number().int().positive(),
  limit: z.number().int().positive(),
  totalPages: z.number().int().nonnegative(),
});

// Schema simples para buscar todos os horários (sem paginação)
export const horariosSimpleResponseSchema = z.object({
  horarios: z.array(horarioResponseSchema),
});

// ========================================
// TIPOS TYPESCRIPT
// ========================================

export type IdHorarioParams = z.infer<typeof idHorarioParamsSchema>;
export type CriarHorarioData = z.infer<typeof criarHorarioSchema>;
export type CriarHorarioCodigoData = z.infer<typeof criarHorarioCodigoSchema>;
export type AtualizarHorarioData = z.infer<typeof atualizarHorarioSchema>;
export type BuscarHorariosQuery = z.infer<typeof buscarHorariosQuerySchema>;
export type HorarioResponse = z.infer<typeof horarioResponseSchema>;
export type HorariosListResponse = z.infer<typeof horariosListResponseSchema>;