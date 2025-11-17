import { z } from "zod";

export const createReservaSalaSchema = z.object({
  salaId: z.string().uuid(),
  horarioId: z.string().uuid(),
  date: z.string().or(z.date()),
  titulo: z.string().min(1),
  descricao: z.string().optional(),
  recurrenceRule: z.enum(["WEEKLY"]).optional(),
  recurrenceEnd: z.string().or(z.date()).optional(),
});

export const reservasQuerySchema = z.object({
  salaId: z.string().uuid().optional(),
  horarioId: z.string().uuid().optional(),
  dateFrom: z.string().optional(),
  dateTo: z.string().optional(),
  page: z.coerce.number().min(1).default(1),
});

export const reservaParamsSchema = z.object({
  id: z.string().uuid(),
});

export const seriesParamsSchema = z.object({
  seriesId: z.string().uuid(),
});

export const reservaSalaCoreSchema = z.object({
  id: z.string().uuid(),
  salaId: z.string().uuid(),
  horarioId: z.string().uuid(),
  date: z.string(),
  titulo: z.string(),
  descricao: z.string().nullable().optional(),
  criado_por: z.string().uuid(),
  status: z.enum(["ATIVA", "CANCELADA"]),
  recurrenceRule: z.string().nullable().optional(),
  recurrenceEnd: z.string().nullable().optional(),
  seriesId: z.string().nullable().optional(),
  created_at: z.string(),
  updated_at: z.string(),
  // Nome opcional do criador para exibição na UI
  criadorNome: z.string().optional(),
});

export const reservaSalaResponseSchema = z.object({
  reserva: reservaSalaCoreSchema,
});

export const reservasListResponseSchema = z.object({
  reservas: z.array(reservaSalaCoreSchema),
});