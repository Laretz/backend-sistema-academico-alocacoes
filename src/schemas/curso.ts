import { z } from "zod";
import {
  uuidSchema,
  paginationSchema,
  searchSchema,
  sortSchema,
  turnoEnum,
  nonEmptyStringSchema,
  positiveIntegerSchema,
  codigoSchema,
  nomeSchema,
} from "./common";

// ===== SCHEMAS DE REQUEST =====

// Schema para parâmetros de rota (ID)
export const cursoParamsSchema = z.object({
  id: uuidSchema,
});

// Schema para criação de curso
export const criarCursoBodySchema = z.object({
  codigo: codigoSchema,
  nome: nomeSchema,
  turno: turnoEnum,
  duracao_semestres: positiveIntegerSchema,
});

// Schema para atualização de curso (campos opcionais)
export const atualizarCursoBodySchema = z
  .object({
    codigo: codigoSchema.optional(),
    nome: nomeSchema.optional(),
    turno: turnoEnum.optional(),
    duracao_semestres: positiveIntegerSchema.optional(),
  })
  .refine((data) => Object.values(data).some((value) => value !== undefined), {
    message: "Pelo menos um campo deve ser fornecido para atualização",
  });

// Schema para busca de cursos
export const buscarCursosQuerySchema = paginationSchema
  .merge(searchSchema)
  .merge(sortSchema)
  .merge(
    z.object({
      turno: turnoEnum.optional(),
      ativo: z.coerce.boolean().optional(),
    })
  );

// Schema para filtros avançados
export const filtrosCursoSchema = z.object({
  turno: turnoEnum.optional(),
  duracao_semestres: positiveIntegerSchema.optional(),
});

// Schema combinado para busca avançada
export const buscarCursosAvancadoQuerySchema =
  buscarCursosQuerySchema.merge(filtrosCursoSchema);

// ===== SCHEMAS DE RESPONSE =====

// Schema base do curso para responses
export const cursoResponseSchema = z.object({
  id: z.uuid(),
  codigo: z.string(),
  nome: z.string(),
  turno: turnoEnum,
  duracao_semestres: z.number().int().positive(),
  ativo: z.boolean(),
  created_at: z.date(),
  updated_at: z.date(),
});

// Schema de erro padrão
export const errorResponseSchema = z.object({
  error: z.string(),
  message: z.string(),
});

// Schema de erro de validação
export const validationErrorResponseSchema = z.object({
  error: z.string(),
  message: z.string(),
  issues: z.array(z.string()).optional(),
});

// Responses para criar curso
export const criarCursoResponseSchema = z.object({
  curso: cursoResponseSchema,
  message: z.string(),
});

// Responses para buscar curso
export const buscarCursoResponseSchema = z.object({
  curso: cursoResponseSchema,
});

// Responses para atualizar curso
export const atualizarCursoResponseSchema = z.object({
  curso: cursoResponseSchema,
  message: z.string(),
});

// Responses para buscar cursos (lista)
export const buscarCursosResponseSchema = z.object({
  cursos: z.array(cursoResponseSchema),
});

// Responses de erro HTTP comuns
export const notFoundResponseSchema = z.object({
  error: z.string().default("Recurso não encontrado"),
  message: z.string(),
});

export const internalServerErrorResponseSchema = z.object({
  error: z.string().default("Erro interno do servidor"),
  message: z.string().default("Ocorreu um erro inesperado"),
});

// ===== TIPOS TYPESCRIPT =====

// Tipos de request
export type CursoParams = z.infer<typeof cursoParamsSchema>;
export type CriarCursoBody = z.infer<typeof criarCursoBodySchema>;
export type AtualizarCursoBody = z.infer<typeof atualizarCursoBodySchema>;
export type BuscarCursosQuery = z.infer<typeof buscarCursosQuerySchema>;
export type FiltrosCurso = z.infer<typeof filtrosCursoSchema>;
export type BuscarCursosAvancadoQuery = z.infer<
  typeof buscarCursosAvancadoQuerySchema
>;

// Tipos de response
export type CursoResponse = z.infer<typeof cursoResponseSchema>;
export type CriarCursoResponse = z.infer<typeof criarCursoResponseSchema>;
export type BuscarCursoResponse = z.infer<typeof buscarCursoResponseSchema>;
export type AtualizarCursoResponse = z.infer<
  typeof atualizarCursoResponseSchema
>;
export type BuscarCursosResponse = z.infer<typeof buscarCursosResponseSchema>;
