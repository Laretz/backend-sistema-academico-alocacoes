import { FastifyTypedInstance } from "@/@types/fastify-instances";
import { z } from "zod";
import {
  cursoParamsSchema,
  criarCursoBodySchema,
  atualizarCursoBodySchema,
  buscarCursosQuerySchema,
} from "@/schemas/curso";

// Controllers que existem (para fins de exemplo)
import { criarCurso } from "@/http/controllers/cursos/criar-curso";
import { atualizarCurso } from "@/http/controllers/cursos/atualizar-curso";

/**
 * Exemplo de rotas usando middleware de validação automática
 *
 * Esta abordagem usa preHandler para validação automática,
 * deixando os controllers mais limpos
 */
export const routesCursosComMiddleware = async (app: FastifyTypedInstance) => {
  // POST /cursos - Criar curso com validação automática
  app.post(
    "/cursos/com-middleware",
    {
      preHandler: async (request, reply) => {
        // Validação automática do body
        try {
          request.body = criarCursoBodySchema.parse(request.body);
        } catch (error) {
          return reply.status(400).send({
            error: "Dados inválidos",
            message: "Verifique os dados enviados",
            issues: error.errors?.map((e) => e.message) || [],
          });
        }
      },
      schema: {
        description: "Criar curso com validação automática via middleware",
        tags: ["Cursos 🎓"],
        body: criarCursoBodySchema,
        response: {
          201: z.object({
            curso: z.object({
              id: z.string().uuid(),
              codigo: z.string(),
              nome: z.string(),
              turno: z.enum(["MATUTINO", "VESPERTINO", "NOTURNO", "INTEGRAL"]),
              duracao_semestres: z.number().int().positive(),
              ativo: z.boolean(),
              created_at: z.date(),
              updated_at: z.date(),
            }),
            message: z.string(),
          }),
          400: z.object({
            error: z.string(),
            message: z.string(),
            issues: z.array(z.string()).optional(),
          }),
          500: z.object({
            error: z.string().default("Erro interno do servidor"),
            message: z.string().default("Ocorreu um erro inesperado"),
          }),
        },
      },
    },
    criarCurso
  );

  // PUT /cursos/:id - Atualizar curso com validação automática
  app.put(
    "/cursos/:id/com-middleware",
    {
      preHandler: async (request, reply) => {
        // Validação automática de params e body
        try {
          request.params = cursoParamsSchema.parse(request.params);
          request.body = atualizarCursoBodySchema.parse(request.body);
        } catch (error) {
          return reply.status(400).send({
            error: "Dados inválidos",
            message: "Verifique os dados enviados",
            issues: error.errors?.map((e) => e.message) || [],
          });
        }
      },
      schema: {
        description: "Atualizar curso com validação automática via middleware",
        tags: ["Cursos 🎓"],
        params: cursoParamsSchema,
        body: atualizarCursoBodySchema,
        response: {
          200: z.object({
            curso: z.object({
              id: z.string().uuid(),
              codigo: z.string(),
              nome: z.string(),
              turno: z.enum(["MATUTINO", "VESPERTINO", "NOTURNO", "INTEGRAL"]),
              duracao_semestres: z.number().int().positive(),
              ativo: z.boolean(),
              created_at: z.date(),
              updated_at: z.date(),
            }),
            message: z.string(),
          }),
          400: z.object({
            error: z.string(),
            message: z.string(),
            issues: z.array(z.string()).optional(),
          }),
          404: z.object({
            error: z.string().default("Recurso não encontrado"),
            message: z.string(),
          }),
          500: z.object({
            error: z.string().default("Erro interno do servidor"),
            message: z.string().default("Ocorreu um erro inesperado"),
          }),
        },
      },
    },
    atualizarCurso
  );

  // GET /cursos - Buscar cursos com validação de query
  app.get(
    "/cursos/com-middleware",
    {
      preHandler: async (request, reply) => {
        // Validação automática de query parameters
        try {
          request.query = buscarCursosQuerySchema.parse(request.query);
        } catch (error) {
          return reply.status(400).send({
            error: "Parâmetros de busca inválidos",
            message: "Verifique os filtros aplicados",
            issues: error.errors?.map((e) => e.message) || [],
          });
        }
      },
      schema: {
        description: "Buscar cursos com validação automática de filtros",
        tags: ["Cursos 🎓"],
        querystring: buscarCursosQuerySchema,
        response: {
          200: z.object({
            cursos: z.array(
              z.object({
                id: z.string().uuid(),
                codigo: z.string(),
                nome: z.string(),
                turno: z.enum([
                  "MATUTINO",
                  "VESPERTINO",
                  "NOTURNO",
                  "INTEGRAL",
                ]),
                duracao_semestres: z.number().int().positive(),
                ativo: z.boolean(),
                created_at: z.date(),
                updated_at: z.date(),
              })
            ),
            total: z.number().int().nonnegative(),
            page: z.number().int().positive(),
            limit: z.number().int().positive(),
            totalPages: z.number().int().nonnegative(),
          }),
          400: z.object({
            error: z.string(),
            message: z.string(),
            issues: z.array(z.string()).optional(),
          }),
          500: z.object({
            error: z.string().default("Erro interno do servidor"),
            message: z.string().default("Ocorreu um erro inesperado"),
          }),
        },
      },
    },
    async (request, reply) => {
      // Controller inline simplificado
      // Os dados já estão validados pelo preHandler
      const query = request.query as any; // Tipado automaticamente

      return reply.send({
        cursos: [],
        total: 0,
        page: query.page || 1,
        limit: query.limit || 10,
        totalPages: 0,
        message: "Busca realizada com sucesso",
      });
    }
  );
};
