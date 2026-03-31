import { z } from "zod";
import {
  uuidSchema,
  paginationSchema,
  searchSchema,
  sortSchema,
} from "./common";

// ===== SCHEMAS DE PARÂMETROS =====

// Schema para parâmetros de rota (ID do usuário/professor)
export const idUserParamsSchema = z.object({
  id_user: uuidSchema,
});

// Schema para parâmetros de rota (ID da disciplina)
export const idDisciplinaParamsSchema = z.object({
  id_disciplina: uuidSchema,
});

// ===== SCHEMAS DE CRIAÇÃO/VINCULAÇÃO =====

// Schema para vincular professor a disciplina
export const vincularProfessorDisciplinaSchema = z.object({
  id_user: uuidSchema,
  id_disciplina: uuidSchema,
});

// ===== SCHEMAS DE REMOÇÃO/DESVINCULAÇÃO =====

// Schema para desvincular professor de disciplina
export const desvincularProfessorDisciplinaSchema = z.object({
  id_user: uuidSchema,
  id_disciplina: uuidSchema,
});

// ===== SCHEMAS DE BUSCA =====
// Nota: Query params removidos pois as buscas retornam poucos resultados

// ===== SCHEMAS DE RESPOSTA =====

// Schema para resposta de disciplina (usado em buscar disciplinas do professor)
export const disciplinaProfessorResponseSchema = z.object({
  id: uuidSchema,
  nome: z.string(),
  carga_horaria: z.number(),
  total_aulas: z.number(),
  carga_horaria_atual: z.number(),
  tipo_de_sala: z.enum(["Sala", "Lab"]),
  codigo: z.string().nullable(),
  semestre: z.number(),
  obrigatoria: z.boolean(),
  curso: z.object({
    id: uuidSchema,
    nome: z.string(),
    codigo: z.string(),
  }),
  vinculo: z.object({
    id: uuidSchema,
    ativo: z.boolean(),
    created_at: z.date(),
  }),
});

// Schema para resposta de professor (usado em buscar professores da disciplina)
export const professorResponseSchema = z.object({
  id: uuidSchema,
  nome: z.string(),
  email: z.string().email(),
  especializacao: z.string().nullable(),
  carga_horaria_max: z.number().nullable(),
  preferencia: z.string().nullable(),
  vinculo: z.object({
    id: uuidSchema,
    ativo: z.boolean(),
    created_at: z.date(),
  }),
});

// Schema para resposta de vinculação professor-disciplina
export const professorDisciplinaResponseSchema = z.object({
  id: uuidSchema,
  id_user: uuidSchema,
  id_disciplina: uuidSchema,
  ativo: z.boolean(),
  created_at: z.date(),
  updated_at: z.date(),
});

// Schema simples de sucesso (usado em desvincular)
export const successResponseSchema = z.object({
  success: z.boolean(),
});

// Schema para lista de disciplinas do professor (sem paginação)
export const disciplinasProfessorResponseSchema = z.object({
  disciplinas: z.array(disciplinaProfessorResponseSchema),
});

// Schema para lista de professores da disciplina (sem paginação)
export const professoresDisciplinaResponseSchema = z.object({
  professores: z.array(professorResponseSchema),
});

// ===== TIPOS TYPESCRIPT =====

export type IdUserParams = z.infer<typeof idUserParamsSchema>;
export type IdDisciplinaParams = z.infer<typeof idDisciplinaParamsSchema>;
export type VincularProfessorDisciplinaData = z.infer<
  typeof vincularProfessorDisciplinaSchema
>;
export type DesvincularProfessorDisciplinaData = z.infer<
  typeof desvincularProfessorDisciplinaSchema
>;
export type DisciplinaProfessorResponse = z.infer<
  typeof disciplinaProfessorResponseSchema
>;
export type ProfessorResponse = z.infer<typeof professorResponseSchema>;
export type ProfessorDisciplinaResponse = z.infer<
  typeof professorDisciplinaResponseSchema
>;
export type SuccessResponse = z.infer<typeof successResponseSchema>;
export type DisciplinasProfessorResponse = z.infer<
  typeof disciplinasProfessorResponseSchema
>;
export type ProfessoresDisciplinaResponse = z.infer<
  typeof professoresDisciplinaResponseSchema
>;
