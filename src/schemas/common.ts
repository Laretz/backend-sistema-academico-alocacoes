import { z } from "zod";

/**
 * Schemas comuns reutilizáveis para validações
 */

// Schema para UUID
export const uuidSchema = z.uuid({
  message: "Deve ser um UUID válido"
});

// Schema para paginação
export const paginationSchema = z.object({
  page: z
    .union([z.string(), z.number()])
    .optional()
    .transform((val) => {
      if (val === undefined) return 1;
      if (typeof val === 'string') return parseInt(val, 10);
      return val;
    })
    .refine((val) => val > 0, {
      message: "Página deve ser maior que 0"
    }),
  limit: z
    .union([z.string(), z.number()])
    .optional()
    .transform((val) => {
      if (val === undefined) return 20;
      if (typeof val === 'string') return parseInt(val, 10);
      return val;
    })
    .refine((val) => val > 0 && val <= 100, {
      message: "Limite deve estar entre 1 e 100"
    })
});

// Schema para busca/filtros
export const searchSchema = z.object({
  search: z
    .string()
    .optional()
    .transform((val) => val?.trim())
    .refine((val) => !val || val.length >= 2, {
      message: "Busca deve ter pelo menos 2 caracteres"
    })
});

// Schema para ordenação
export const sortSchema = z.object({
  sortBy: z.string().optional(),
  sortOrder: z.enum(["asc", "desc"]).optional().default("asc")
});

// Enum para turnos
export const turnoEnum = z.enum(["MATUTINO", "VESPERTINO", "NOTURNO", "INTEGRAL"], {
  message: "Turno deve ser MATUTINO, VESPERTINO, NOTURNO ou INTEGRAL"
});

// Schema para strings não vazias
export const nonEmptyStringSchema = z
  .string()
  .min(1, "Campo obrigatório")
  .transform((val) => val.trim())
  .refine((val) => val.length > 0, {
    message: "Campo não pode estar vazio"
  });

// Schema para números positivos
export const positiveNumberSchema = z
  .number()
  .positive("Deve ser um número positivo");

// Schema para números inteiros positivos
export const positiveIntegerSchema = z
  .number()
  .int("Deve ser um número inteiro")
  .positive("Deve ser um número positivo");

// Schema para códigos (letras e números)
export const codigoSchema = z
  .string()
  .min(1, "Código é obrigatório")
  .max(20, "Código deve ter no máximo 20 caracteres")
  .regex(/^[A-Z0-9-_]+$/i, "Código deve conter apenas letras, números, hífens e underscores")
  .transform((val) => val.trim().toUpperCase());

// Schema para nomes
export const nomeSchema = z
  .string()
  .min(2, "Nome deve ter pelo menos 2 caracteres")
  .max(100, "Nome deve ter no máximo 100 caracteres")
  .transform((val) => val.trim())
  .refine((val) => val.length >= 2, {
    message: "Nome não pode estar vazio após remoção de espaços"
  });