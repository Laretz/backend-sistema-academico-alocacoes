import { z } from "zod";
import { Role } from "@prisma/client";
import { 
  uuidSchema, 
  searchSchema, 
  sortSchema,
  paginationSchema,
  nonEmptyStringSchema
} from "./common";

// ===== SCHEMAS DE REQUEST =====

// Schema para parâmetros de rota (ID)
export const userParamsSchema = z.object({
  id: uuidSchema,
});

// Schema para registro de usuário
export const registerUserSchema = z.object({
  nome: nonEmptyStringSchema,
  email: z.string().email({
    message: "Email deve ter um formato válido"
  }),
  senha: z.string().min(6, {
    message: "Senha deve ter pelo menos 6 caracteres"
  }),
  role: z.nativeEnum(Role).optional(),
  especializacao: z.string().optional(),
  carga_horaria_max: z.number().positive().optional(),
  preferencia: z.string().optional(),
});

// Schema para autenticação
export const authenticateUserSchema = z.object({
  email: z.string().email({
    message: "Email deve ter um formato válido"
  }),
  senha: z.string().min(6, {
    message: "Senha deve ter pelo menos 6 caracteres"
  }),
});

// Schema para atualização de usuário (campos opcionais)
export const updateUserSchema = z.object({
  nome: nonEmptyStringSchema.optional(),
  email: z.string().email().optional(),
  senha: z.string().min(6).optional(),
  role: z.nativeEnum(Role).optional(),
  especializacao: z.string().optional(),
  carga_horaria_max: z.number().positive().optional(),
  preferencia: z.string().optional(),
});

// Schema para query de busca de usuários
export const userQuerySchema = z.object({
  ...searchSchema.shape,
  ...sortSchema.shape,
  ...paginationSchema.shape,
  role: z.nativeEnum(Role).optional(),
});

// Schema para refresh token
export const refreshTokenSchema = z.object({
  token: z.string().min(1, "Token é obrigatório"),
});

// ===== SCHEMAS DE RESPOSTA =====

// Schema base do usuário (sem senha)
export const userSchema = z.object({
  id: uuidSchema,
  nome: z.string(),
  email: z.string().email(),
  role: z.enum(Role),
  especializacao: z.string().nullable(),
  carga_horaria_max: z.number().nullable(),
  preferencia: z.string().nullable(),
});

// Schema de resposta para autenticação
export const authResponseSchema = z.object({
  token: z.string(),
  refreshToken: z.string(),
  user: userSchema,
});

// Schema de resposta para refresh token
export const refreshResponseSchema = z.object({
  token: z.string(),
});

// Schema de resposta para criação/atualização/consulta de usuário
// Aceita tanto { usuario: User } quanto { user: User } para compatibilidade
export const userResponseSchema = z.union([
  z.object({ usuario: userSchema }),
  z.object({ user: userSchema }),
]);

// Schema de resposta para listagem de usuários
export const usersListResponseSchema = z.object({
  usuarios: z.array(userSchema),
});

// Schema de resposta para perfil do usuário
export const profileResponseSchema = z.object({
  user: userSchema
});

// Schema de resposta para verificação de token
export const verifyTokenResponseSchema = z.object({
  valid: z.boolean(),
  user: z.object({
    id: z.string(),
    role: z.nativeEnum(Role),
  }).optional(),
});

// ===== SCHEMAS DE ERRO =====

// Schema para erro de credenciais inválidas
export const invalidCredentialsErrorSchema = z.object({
  message: z.string(),
});

// Schema para erro de usuário já existe
export const userAlreadyExistsErrorSchema = z.object({
  message: z.string(),
});

// Schema para erro de usuário não encontrado
export const userNotFoundErrorSchema = z.object({
  message: z.string(),
});

// Schema para erro de token inválido
export const invalidTokenErrorSchema = z.object({
  message: z.string(),
});

// ===== TIPOS TYPESCRIPT =====

export type UserParams = z.infer<typeof userParamsSchema>;
export type RegisterUserData = z.infer<typeof registerUserSchema>;
export type AuthenticateUserData = z.infer<typeof authenticateUserSchema>;
export type UpdateUserData = z.infer<typeof updateUserSchema>;
export type UserQueryData = z.infer<typeof userQuerySchema>;
export type RefreshTokenData = z.infer<typeof refreshTokenSchema>;
export type User = z.infer<typeof userSchema>;
export type AuthResponse = z.infer<typeof authResponseSchema>;
export type RefreshResponse = z.infer<typeof refreshResponseSchema>;
export type UserResponse = z.infer<typeof userResponseSchema>;
export type UsersListResponse = z.infer<typeof usersListResponseSchema>;
export type ProfileResponse = z.infer<typeof profileResponseSchema>;
export type VerifyTokenResponse = z.infer<typeof verifyTokenResponseSchema>;