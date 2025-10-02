import { z } from 'zod';
import { 
  uuidSchema, 
  paginationSchema, 
  searchSchema, 
  sortSchema
} from './common';

// ===== SCHEMAS DE PARÂMETROS =====

// Schema para parâmetros de rota (ID do usuário)
export const userCursoUserParamsSchema = z.object({
  id_user: uuidSchema
});

// Schema para parâmetros de rota (ID do curso)
export const userCursoCursoParamsSchema = z.object({
  id_curso: uuidSchema
});

// ===== SCHEMAS DE CRIAÇÃO/VINCULAÇÃO =====

// Schema para vincular usuário a curso
export const vincularUserCursoSchema = z.object({
  id_user: uuidSchema,
  id_curso: uuidSchema
});

// ===== SCHEMAS DE REMOÇÃO/DESVINCULAÇÃO =====

// Schema para desvincular usuário de curso
export const desvincularUserCursoSchema = z.object({
  id_user: uuidSchema,
  id_curso: uuidSchema
});

// ===== SCHEMAS DE BUSCA =====

// Schema para query parameters de busca
export const userCursoQuerySchema = z.object({
  ...paginationSchema.shape,
  ...searchSchema.shape,
  ...sortSchema.shape
});

// ===== SCHEMAS DE RESPOSTA =====

// Schema para resposta de curso (usado em buscar cursos do usuário)
export const cursoResponseSchema = z.object({
  id: uuidSchema,
  nome: z.string(),
  codigo: z.string(),
  descricao: z.string().nullable(),
  carga_horaria: z.number(),
  created_at: z.date(),
  updated_at: z.date()
});

// Schema para resposta de usuário (usado em buscar usuários do curso)
export const usuarioResponseSchema = z.object({
  id: uuidSchema,
  nome: z.string(),
  email: z.string().email(),
  role: z.enum(['ADMIN', 'PROFESSOR', 'COORDENADOR']),
  created_at: z.date(),
  updated_at: z.date()
});

// Schema para resposta de vinculação user-curso
export const userCursoResponseSchema = z.object({
  id: uuidSchema,
  id_user: uuidSchema,
  id_curso: uuidSchema,
  created_at: z.date(),
  updated_at: z.date()
});

// Schema para lista de cursos do usuário
export const cursosUsuarioListResponseSchema = z.object({
  cursos: z.array(cursoResponseSchema),
  total: z.number(),
  page: z.number(),
  limit: z.number(),
  totalPages: z.number()
});

// Schema para lista de usuários do curso
export const usuariosCursoListResponseSchema = z.object({
  usuarios: z.array(usuarioResponseSchema),
  total: z.number(),
  page: z.number(),
  limit: z.number(),
  totalPages: z.number()
});