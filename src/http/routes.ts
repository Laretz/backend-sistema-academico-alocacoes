import { FastifyInstance } from "fastify";
import {
  executeGeneticAllocation,
  getGeneticAllocationStatus,
  cancelGeneticAllocation,
  getGeneticAllocationReport,
} from "./controllers/alocacoes-geneticas";
import { previewGeneticAllocation } from "./controllers/alocacoes-geneticas-preview";
import {
  criarModulo,
  buscarModulos,
  buscarModulo,
  atualizarModulo,
  excluirModulo,
  buscarModulosPorDisciplina,
} from "./controllers/modulos";
import { routesCursos } from "./controllers/cursos/routes";
import { routesDisciplinas } from "./controllers/disciplinas/routes";
import { prediosRoutes } from "./controllers/predios/routes";
import { routesTurmas } from "./controllers/turmas/routes";
import { routesUserCurso } from "./controllers/user-curso/routes";
import { routesProfessorDisciplina } from "./controllers/professor-disciplina/routes";
import { routesHorarios } from "./controllers/horarios/routes";
import { routesSalas } from "./controllers/salas/routes";
import { routesUsers } from "./controllers/users/routes";
import { routesAlocacoes } from "./controllers/alocacoes/routes";
import { routesFeedback } from "./controllers/feedback/routes";
import { routesNotificacoes } from "./controllers/notificacoes/routes";

import { verifyJWT } from "./middlewares/verify-jwt";
import { verifyUseRole } from "./middlewares/verify-user-role";

export async function appRoutes(app: FastifyInstance) {
  // Users - Rotas organizadas com schemas Zod
  await app.register(routesUsers);

  // Cursos - Rotas organizadas com schemas Zod
  await app.register(routesCursos);

  // Disciplinas - Rotas organizadas com schemas Zod
  await app.register(routesDisciplinas);

  // Prédios - Rotas organizadas com schemas Zod
  await app.register(prediosRoutes);

  // Turmas - Rotas organizadas com schemas Zod
  await app.register(routesTurmas);

  // User-Curso - Rotas organizadas com schemas Zod
  await app.register(routesUserCurso);

  // Professor-Disciplina - Rotas organizadas com schemas Zod
  await app.register(routesProfessorDisciplina);

  // Horários - Rotas organizadas com schemas Zod
  await app.register(routesHorarios);

  // Salas - Rotas organizadas com schemas Zod
  await app.register(routesSalas);

  // Alocações - Rotas organizadas com schemas Zod
  await app.register(routesAlocacoes);

  // Feedback - Rotas para avaliação de usuários
  await app.register(routesFeedback);

  // Notificações - Rotas in-app para professores
  await app.register(routesNotificacoes);

  // Alocações Genéticas (sem autenticação para testes)
  app.post("/alocacoes/genetica", executeGeneticAllocation);
  app.post("/alocacoes/genetica/preview", previewGeneticAllocation);
  app.get("/alocacoes/genetica/:turmaId/status", getGeneticAllocationStatus);
  app.delete("/alocacoes/genetica/:turmaId", cancelGeneticAllocation);
  app.get("/alocacoes/genetica/:turmaId/relatorio", getGeneticAllocationReport);

  // Módulos
  app.post("/modulos", { onRequest: [verifyJWT] }, criarModulo);
  app.get("/modulos", buscarModulos);
  app.get("/modulos/:id", buscarModulo);
  app.get("/disciplinas/:disciplinaId/modulos", buscarModulosPorDisciplina);
  app.put("/modulos/:id", { onRequest: [verifyJWT] }, atualizarModulo);
  app.delete("/modulos/:id", { onRequest: [verifyJWT] }, excluirModulo);




}
