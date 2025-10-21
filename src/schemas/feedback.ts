import { z } from "zod";
import { Role } from "@prisma/client";
import { validationErrorResponseSchema, internalServerErrorResponseSchema } from "./curso";

// ===== Request Schemas =====
export const createFeedbackBodySchema = z.object({
  npsScore: z.number().int().min(0).max(10),
  comment: z.string().min(1).max(1000),
  page: z.string().optional(),
  feature: z.string().optional(),
  metadata: z.any().optional(),
});

export const listFeedbacksQuerySchema = z.object({
  page: z.string().optional(),
  feature: z.string().optional(),
  limit: z.coerce.number().int().min(1).max(500).optional(),
});

// Query de métricas (filtros opcionais)
export const metricsQuerySchema = z.object({
  page: z.string().optional(),
  feature: z.string().optional(),
});

// ===== Response Schemas =====
export const feedbackUserSchema = z.object({
  id: z.string(),
  nome: z.string(),
  email: z.string().email(),
  role: z.nativeEnum(Role),
});

export const feedbackSchema = z.object({
  id: z.string(),
  userId: z.string(),
  npsScore: z.number().int(),
  comment: z.string(),
  page: z.string().nullable().optional(),
  feature: z.string().nullable().optional(),
  metadata: z.any().optional(),
  created_at: z.date(),
  user: feedbackUserSchema.optional(),
});

export const createFeedbackResponseSchema = z.object({
  feedback: feedbackSchema,
  message: z.string().default("Feedback registrado com sucesso"),
});

export const listFeedbacksResponseSchema = z.object({
  feedbacks: z.array(feedbackSchema),
});

export const feedbackMetricsSchema = z.object({
  total: z.number().int(),
  averageNps: z.number().nullable(),
  promoters: z.number().int(),
  passives: z.number().int(),
  detractors: z.number().int(),
  byFeature: z.array(
    z.object({ feature: z.string().nullable(), count: z.number().int(), avgNps: z.number().nullable() })
  ),
  byPage: z.array(
    z.object({ page: z.string().nullable(), count: z.number().int(), avgNps: z.number().nullable() })
  ),
});

// ===== Error Schemas (re-export common)
export { validationErrorResponseSchema, internalServerErrorResponseSchema };

// ===== TS Types =====
export type CreateFeedbackBody = z.infer<typeof createFeedbackBodySchema>;
export type ListFeedbacksQuery = z.infer<typeof listFeedbacksQuerySchema>;
export type FeedbackItem = z.infer<typeof feedbackSchema>;
export type CreateFeedbackResponse = z.infer<typeof createFeedbackResponseSchema>;
export type ListFeedbacksResponse = z.infer<typeof listFeedbacksResponseSchema>;
export type FeedbackMetricsResponse = z.infer<typeof feedbackMetricsSchema>;
export type FeedbackMetricsQuery = z.infer<typeof metricsQuerySchema>;