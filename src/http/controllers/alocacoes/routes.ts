import { FastifyInstance } from "fastify";
import { z } from "zod";
import { verifyJWT } from "@/http/middlewares/verify-jwt";
import { verifyUseRole } from "@/http/middlewares/verify-user-role";

// Importação dos controllers
import { criarAlocacao } from "./criar-alocacao";
import { buscarAlocacoes } from "./buscar-alocacoes";
import { buscarAlocacao } from "./buscar-alocacao";
import { atualizarAlocacao } from "./atualizar-alocacao";
import { excluirAlocacao } from "./excluir-alocacao";
import { buscarGradeHorarios } from "./buscar-grade-horarios";
import { buscarGradeHorarios as buscarGradeHorariosGeral } from "./buscar-grade-horarios-geral";
import { buscarAlocacoesPeriodoManha } from "./buscar-alocacoes-periodo-manha";
import { buscarAlocacoesTurmaPeriodo } from "./buscar-alocacoes-turma-periodo";
import { excluirTodasAlocacoesTurma } from "./excluir-todas-alocacoes-turma";
import { buscarAlocacoesProfessor } from "./buscar-alocacoes-professor";
import { buscarQuantidadeAulasPorProfessor } from "./buscar-quantidade-aulas-professores";

// Importação dos schemas
import {
  alocacaoParamsSchema,
  createAlocacaoSchema,
  updateAlocacaoSchema,
  alocacoesQuerySchema,
  gradeHorariosQuerySchema,
  alocacoesProfessorParamsSchema,
  alocacoesTurmaPeriodoParamsSchema,
  excluirAlocacoesTurmaParamsSchema,
  alocacaoResponseSchema,
  createAlocacaoResponseSchema,
  alocacoesListResponseSchema,
  gradeHorariosResponseSchema,
  quantidadeAulasProfessorResponseSchema,
  alocacaoNotFoundErrorSchema,
  conflictErrorSchema,
  alocacaoValidationErrorSchema,
  invalidTokenErrorSchema,
  validationErrorResponseSchema,
  internalServerErrorResponseSchema,
} from "@/schemas";

export async function routesAlocacoes(app: FastifyInstance) {
  // Criar alocação
  app.post("/alocacoes", {
    onRequest: [verifyJWT, verifyUseRole("ADMIN")],
    schema: {
      tags: ["Alocações"],
      summary: "Criar nova alocação",
      description: "Cria uma nova alocação de professor, disciplina, turma e sala em horário(s) específico(s)",
      body: createAlocacaoSchema,
      response: {
        201: createAlocacaoResponseSchema,
        400: alocacaoValidationErrorSchema,
        401: invalidTokenErrorSchema,
        403: invalidTokenErrorSchema,
        409: conflictErrorSchema,
        500: internalServerErrorResponseSchema,
      },
    },
  }, criarAlocacao);

  // Buscar todas as alocações
  app.get("/alocacoes", {
    onRequest: [verifyJWT],
    schema: {
      tags: ["Alocações"],
      summary: "Listar alocações",
      description: "Lista todas as alocações com paginação",
      querystring: alocacoesQuerySchema,
      response: {
        200: alocacoesListResponseSchema,
        401: invalidTokenErrorSchema,
        500: internalServerErrorResponseSchema,
      },
    },
  }, buscarAlocacoes);

  // Buscar alocações do período da manhã
  app.get("/alocacoes/periodo/manha", {
    onRequest: [verifyJWT],
    schema: {
      tags: ["Alocações"],
      summary: "Buscar alocações do período da manhã",
      description: "Lista todas as alocações do período da manhã",
      response: {
        200: alocacoesListResponseSchema,
        401: invalidTokenErrorSchema,
        500: internalServerErrorResponseSchema,
      },
    },
  }, buscarAlocacoesPeriodoManha);

  // Buscar alocações por turma e período
  app.get("/alocacoes/turma/:id_turma/periodo", {
    onRequest: [verifyJWT],
    schema: {
      tags: ["Alocações"],
      summary: "Buscar alocações por turma e período",
      description: "Lista alocações de uma turma específica em um período",
      params: alocacoesTurmaPeriodoParamsSchema,
      response: {
        200: alocacoesListResponseSchema,
        401: invalidTokenErrorSchema,
        404: alocacaoNotFoundErrorSchema,
        500: internalServerErrorResponseSchema,
      },
    },
  }, buscarAlocacoesTurmaPeriodo);

  // Buscar alocações por professor
  app.get("/alocacoes/professor/:id_professor", {
    onRequest: [verifyJWT],
    schema: {
      tags: ["Alocações"],
      summary: "Buscar alocações por professor",
      description: "Lista todas as alocações de um professor específico",
      params: alocacoesProfessorParamsSchema,
      response: {
        200: alocacoesListResponseSchema,
        401: invalidTokenErrorSchema,
        404: alocacaoNotFoundErrorSchema,
        500: internalServerErrorResponseSchema,
      },
    },
  }, buscarAlocacoesProfessor);

  // Buscar quantidade de aulas por professor
  app.get("/alocacoes/aulas-professor", {
    onRequest: [verifyJWT],
    schema: {
      tags: ["Alocações"],
      summary: "Buscar quantidade de aulas por professor",
      description: "Lista a quantidade de aulas e carga horária de cada professor",
      response: {
        200: quantidadeAulasProfessorResponseSchema,
        401: invalidTokenErrorSchema,
        500: internalServerErrorResponseSchema,
      },
    },
  }, buscarQuantidadeAulasPorProfessor);

  // Buscar alocação por ID
  app.get("/alocacoes/:id", {
    onRequest: [verifyJWT],
    schema: {
      tags: ["Alocações"],
      summary: "Buscar alocação por ID",
      description: "Busca uma alocação específica pelo seu ID",
      params: alocacaoParamsSchema,
      response: {
        200: alocacaoResponseSchema,
        401: invalidTokenErrorSchema,
        404: alocacaoNotFoundErrorSchema,
        500: internalServerErrorResponseSchema,
      },
    },
  }, buscarAlocacao);

  // Atualizar alocação
  app.put("/alocacoes/:id", {
    onRequest: [verifyJWT, verifyUseRole("ADMIN")],
    schema: {
      tags: ["Alocações"],
      summary: "Atualizar alocação",
      description: "Atualiza os dados de uma alocação existente",
      params: alocacaoParamsSchema,
      body: updateAlocacaoSchema,
      response: {
        200: alocacaoResponseSchema,
        400: validationErrorResponseSchema,
        401: invalidTokenErrorSchema,
        403: invalidTokenErrorSchema,
        404: alocacaoNotFoundErrorSchema,
        409: conflictErrorSchema,
        500: internalServerErrorResponseSchema,
      },
    },
  }, atualizarAlocacao);

  // Excluir alocação
  app.delete("/alocacoes/:id", {
    onRequest: [verifyJWT, verifyUseRole("ADMIN")],
    schema: {
      tags: ["Alocações"],
      summary: "Excluir alocação",
      description: "Remove uma alocação do sistema",
      params: alocacaoParamsSchema,
      response: {
        204: z.void().describe("Alocação excluída com sucesso"),
        401: invalidTokenErrorSchema,
        403: invalidTokenErrorSchema,
        404: alocacaoNotFoundErrorSchema,
        500: internalServerErrorResponseSchema,
      },
    },
  }, excluirAlocacao);

  // Excluir todas as alocações de uma turma
  app.delete("/alocacoes/turma/:id_turma/todas", {
    onRequest: [verifyJWT, verifyUseRole("ADMIN")],
    schema: {
      tags: ["Alocações"],
      summary: "Excluir todas as alocações de uma turma",
      description: "Remove todas as alocações de uma turma específica",
      params: excluirAlocacoesTurmaParamsSchema,
      response: {
        204: z.void().describe("Alocações da turma excluídas com sucesso"),
        401: invalidTokenErrorSchema,
        403: invalidTokenErrorSchema,
        404: alocacaoNotFoundErrorSchema,
        500: internalServerErrorResponseSchema,
      },
    },
  }, excluirTodasAlocacoesTurma);

  // Buscar grade de horários
  app.get("/grade-horarios", {
    onRequest: [verifyJWT],
    schema: {
      tags: ["Grade de Horários"],
      summary: "Buscar grade de horários",
      description: "Busca a grade de horários filtrada por turma, professor ou sala",
      querystring: gradeHorariosQuerySchema,
      response: {
        200: gradeHorariosResponseSchema,
        401: invalidTokenErrorSchema,
        500: internalServerErrorResponseSchema,
      },
    },
  }, buscarGradeHorarios);

  // Buscar grade de horários geral
  app.get("/alocacoes/grade-horarios-geral", {
    onRequest: [verifyJWT],
    schema: {
      tags: ["Grade de Horários"],
      summary: "Buscar grade de horários geral",
      description: "Busca a grade de horários geral filtrada por turma, professor ou sala",
      querystring: gradeHorariosQuerySchema,
      response: {
        200: gradeHorariosResponseSchema,
        401: invalidTokenErrorSchema,
        404: alocacaoNotFoundErrorSchema,
        500: internalServerErrorResponseSchema,
      },
    },
  }, buscarGradeHorariosGeral);
}