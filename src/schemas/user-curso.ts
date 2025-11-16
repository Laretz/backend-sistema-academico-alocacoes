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

// Schema para resposta de curso (alinhado ao retorno do repositório PrismaUserCursoRepository)
export const cursoResponseSchema = z.object({
  id: uuidSchema,
  codigo: z.string(),
  nome: z.string(),
  turno: z.enum(['MATUTINO', 'VESPERTINO', 'NOTURNO', 'INTEGRAL']),
  duracao_semestres: z.number(),
  vinculo: z.object({
    id: uuidSchema,
    ativo: z.boolean(),
    created_at: z.date(),
  }),
});

// Schema para resposta de usuário (alinhado ao retorno do repositório PrismaUserCursoRepository)
export const usuarioResponseSchema = z.object({
  id: uuidSchema,
  nome: z.string(),
  email: z.string().email(),
  role: z.enum(['ADMIN', 'PROFESSOR', 'COORDENADOR']),
  especializacao: z.string().nullable(),
  carga_horaria_max: z.number().nullable(),
  preferencia: z.string().nullable(),
  vinculo: z.object({
    id: uuidSchema,
    ativo: z.boolean(),
    created_at: z.date(),
  }),
});

// Schema para resposta de vinculação user-curso
export const userCursoResponseSchema = z.object({
  id: uuidSchema,
  id_user: uuidSchema,
  id_curso: uuidSchema,
  ativo: z.boolean(),
  created_at: z.date(),
  updated_at: z.date()
});

// Schema para lista de cursos do usuário
export const cursosUsuarioListResponseSchema = z.object({
  cursos: z.array(cursoResponseSchema),
  total: z.number().optional(),
  page: z.number().optional(),
  limit: z.number().optional(),
  totalPages: z.number().optional()
});

// Schema para lista de usuários do curso
export const usuariosCursoListResponseSchema = z.object({
  usuarios: z.array(usuarioResponseSchema),
  total: z.number().optional(),
  page: z.number().optional(),
  limit: z.number().optional(),
  totalPages: z.number().optional()
});