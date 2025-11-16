import { z } from "zod";

export const notificacaoSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid(),
  type: z.enum(["SOLICITACAO_TROCA_SALA", "GENERICA"]).describe("Tipo da notificação"),
  title: z.string(),
  message: z.string(),
  status: z.enum(["PENDENTE", "LIDA", "RESPONDIDA"]),
  replyMessage: z.string().nullable().optional(),
  metadata: z.any().optional(),
  created_at: z.date(),
  read_at: z.date().nullable().optional(),
  responded_at: z.date().nullable().optional(),
});

export const criarNotificacaoBodySchema = z.object({
  userId: z.string().uuid(),
  type: z.enum(["SOLICITACAO_TROCA_SALA", "GENERICA"]).describe("Tipo da notificação"),
  title: z.string().min(1),
  message: z.string().min(1),
  metadata: z.any().optional(),
});

export const criarNotificacaoResponseSchema = z.object({
  notificacao: notificacaoSchema,
});

export const listarNotificacoesQuerySchema = z.object({
  status: z.enum(["PENDENTE", "LIDA", "RESPONDIDA"]).optional(),
});

export const listarNotificacoesResponseSchema = z.object({
  notificacoes: z.array(notificacaoSchema),
});

export const marcarNotificacaoLidaParamsSchema = z.object({
  id: z.string().uuid(),
});

export const responderNotificacaoParamsSchema = z.object({
  id: z.string().uuid(),
});

export const responderNotificacaoBodySchema = z.object({
  replyMessage: z.string().min(1),
});

export const responderNotificacaoResponseSchema = z.object({
  notificacao: notificacaoSchema,
});

