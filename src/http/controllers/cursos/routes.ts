import { FastifyTypedInstance } from "@/@types/fastify-instances";
import { verifyJWT } from "@/http/middlewares/verify-jwt";
import { verifyUseRole } from "@/http/middlewares/verify-user-role";
import { z } from "zod";
import {
  cursoParamsSchema,
  criarCursoBodySchema,
  atualizarCursoBodySchema,
  buscarCursosQuerySchema,
  criarCursoResponseSchema,
  buscarCursoResponseSchema,
  atualizarCursoResponseSchema,
  buscarCursosResponseSchema,
  notFoundResponseSchema,
  internalServerErrorResponseSchema,
  validationErrorResponseSchema,
} from "@/schemas/curso";

// Importar controllers
import { criarCurso } from "./criar-curso";
import { buscarCurso } from "./buscar-curso";
import { buscarCursos } from "./buscar-cursos";
import { atualizarCurso } from "./atualizar-curso";
import { excluirCurso } from "./excluir-curso";

export const routesCursos = async (app: FastifyTypedInstance) => {
  // POST /cursos - Criar curso
  app.post(
    "/cursos",
    {
      onRequest: [verifyJWT, verifyUseRole("ADMIN")],
      schema: {
        description: "Essa rota serve para criar um novo curso",
        tags: ["Cursos 🎓"],
        body: criarCursoBodySchema,
        response: {
          201: criarCursoResponseSchema,
          400: validationErrorResponseSchema,
          500: internalServerErrorResponseSchema,
        },
      },
    },
    criarCurso
  );

  // GET /cursos - Buscar cursos
  app.get(
    "/cursos",
    {
      schema: {
        description: "Essa rota serve para buscar todos os cursos",
        tags: ["Cursos 🎓"],
        response: {
          200: buscarCursosResponseSchema,
          500: internalServerErrorResponseSchema,
        },
      },
    },
    buscarCursos
  );

  // GET /cursos/:id - Buscar curso por ID
  app.get(
    "/cursos/:id",
    {
      schema: {
        description: "Essa rota serve para buscar um curso específico por ID",
        tags: ["Cursos 🎓"],
        params: cursoParamsSchema,
        response: {
          200: buscarCursoResponseSchema,
          400: validationErrorResponseSchema,
          404: notFoundResponseSchema,
          500: internalServerErrorResponseSchema,
        },
      },
    },
    buscarCurso
  );

  // PUT /cursos/:id - Atualizar curso
  app.put(
    "/cursos/:id",
    {
      onRequest: [verifyJWT, verifyUseRole("ADMIN")],
      schema: {
        description: "Essa rota serve para atualizar um curso",
        tags: ["Cursos 🎓"],
        params: cursoParamsSchema,
        body: atualizarCursoBodySchema,
        response: {
          200: atualizarCursoResponseSchema,
          400: validationErrorResponseSchema,
          404: notFoundResponseSchema,
          500: internalServerErrorResponseSchema,
        },
      },
    },
    atualizarCurso
  );

  // DELETE /cursos/:id - Excluir curso
  app.delete(
    "/cursos/:id",
    {
      onRequest: [verifyJWT, verifyUseRole("ADMIN")],
      schema: {
        description: "Essa rota serve para excluir um curso",
        tags: ["Cursos 🎓"],
        params: cursoParamsSchema,
        response: {
          204: z.void().describe("Curso excluído com sucesso"),
          400: validationErrorResponseSchema,
          404: notFoundResponseSchema,
          500: internalServerErrorResponseSchema,
        },
      },
    },
    excluirCurso
  );
};