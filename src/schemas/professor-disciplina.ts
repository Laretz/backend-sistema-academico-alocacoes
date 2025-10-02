import { z } from 'zod';
import { 
  uuidSchema, 
  paginationSchema, 
  searchSchema, 
  sortSchema
} from './common';

// ===== SCHEMAS DE PARÂMETROS =====

// Schema para parâmetros de rota (ID do usuário/professor)
export const idUserParamsSchema = z.object({
  id_user: uuidSchema
});

// Schema para parâmetros de rota (ID da disciplina)
export const idDisciplinaParamsSchema = z.object({
  id_disciplina: uuidSchema
});

// ===== SCHEMAS DE CRIAÇÃO/VINCULAÇÃO =====

// Schema para vincular professor a disciplina
export const vincularProfessorDisciplinaSchema = z.object({
  id_user: uuidSchema,
  id_disciplina: uuidSchema
});

// ===== SCHEMAS DE REMOÇÃO/DESVINCULAÇÃO =====

// Schema para desvincular professor de disciplina
export const desvincularProfessorDisciplinaSchema = z.object({
  id_user: uuidSchema,
  id_disciplina: uuidSchema
});

// ===== SCHEMAS DE BUSCA =====
// Nota: Query params removidos pois as buscas retornam poucos resultados

// ===== SCHEMAS DE RESPOSTA =====

// Schema para resposta de disciplina (usado em buscar disciplinas do professor)
export const disciplinaResponseSchema = z.object({
  id: uuidSchema,
  nome: z.string(),
  codigo: z.string(),
  descricao: z.string().nullable(),
  carga_horaria: z.number(),
  created_at: z.date(),
  updated_at: z.date()
});

// Schema para resposta de professor (usado em buscar professores da disciplina)
export const professorResponseSchema = z.object({
  id: uuidSchema,
  nome: z.string(),
  email: z.string().email(),
  role: z.enum(['ADMIN', 'PROFESSOR', 'COORDENADOR']),
  created_at: z.date(),
  updated_at: z.date()
});

// Schema para resposta de vinculação professor-disciplina
export const professorDisciplinaResponseSchema = z.object({
  id: uuidSchema,
  id_user: uuidSchema,
  id_disciplina: uuidSchema,
  ativo: z.boolean(),
  created_at: z.date(),
  updated_at: z.date()
});

// Schema para lista de disciplinas do professor (sem paginação)
export const disciplinasProfessorResponseSchema = z.object({
  disciplinas: z.array(disciplinaResponseSchema)
});

// Schema para lista de professores da disciplina (sem paginação)
export const professoresDisciplinaResponseSchema = z.object({
  professores: z.array(professorResponseSchema)
});

// ===== TIPOS TYPESCRIPT =====

export type IdUserParams = z.infer<typeof idUserParamsSchema>;
export type IdDisciplinaParams = z.infer<typeof idDisciplinaParamsSchema>;
export type VincularProfessorDisciplinaData = z.infer<typeof vincularProfessorDisciplinaSchema>;
export type DesvincularProfessorDisciplinaData = z.infer<typeof desvincularProfessorDisciplinaSchema>;
export type DisciplinaResponse = z.infer<typeof disciplinaResponseSchema>;
export type ProfessorResponse = z.infer<typeof professorResponseSchema>;
export type ProfessorDisciplinaResponse = z.infer<typeof professorDisciplinaResponseSchema>;
export type DisciplinasProfessorResponse = z.infer<typeof disciplinasProfessorResponseSchema>;
export type ProfessoresDisciplinaResponse = z.infer<typeof professoresDisciplinaResponseSchema>;