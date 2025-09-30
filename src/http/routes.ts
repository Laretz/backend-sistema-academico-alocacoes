import { FastifyInstance } from "fastify";
import {
  register,
  autenticar,
  profile,
  refresh,
  buscarUsuarios,
  buscarUsuario,
  atualizarUsuario,
  excluirUsuario,
} from "./controllers/users";
import { verifyToken } from "./controllers/users/verify-token";

import {
  buscarGradeHorariosTurma,
} from "./controllers/turmas";
import {
  criarSala,
  buscarSalas,
  buscarSala,
  atualizarSala,
  excluirSala,
  buscarGradeHorariosSala,
} from "./controllers/salas";
import { buscarSalasPorPredio } from "./controllers/salas/buscar-salas-por-predio";
import {
  criarHorario,
  buscarHorarios,
  buscarHorario,
  atualizarHorario,
  excluirHorario,
  criarHorarioCodigo,
} from "./controllers/horarios";
import {
  criarAlocacao,
  buscarAlocacoes,
  buscarAlocacao,
  atualizarAlocacao,
  excluirAlocacao,
  buscarGradeHorarios,
  buscarAlocacoesPeriodoManha,
  buscarAlocacoesTurmaPeriodo,
  excluirTodasAlocacoesTurma,
} from "./controllers/alocacoes";
import { buscarAlocacoesProfessor } from "./controllers/alocacoes/buscar-alocacoes-professor";
import { buscarQuantidadeAulasPorProfessor } from "./controllers/alocacoes/buscar-quantidade-aulas-professores";
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
import {
  vincularProfessorDisciplina,
  desvincularProfessorDisciplina,
  buscarDisciplinasProfessor,
  buscarProfessoresDisciplina,
} from "./controllers/professor-disciplina";
import {
  vincularUserCurso,
  desvincularUserCurso,
  buscarCursosUsuario,
  buscarUsuariosCurso,
} from "./controllers/user-curso";
import { verifyJWT } from "./middlewares/verify-jwt";
import { verifyUseRole } from "./middlewares/verify-user-role";

export async function appRoutes(app: FastifyInstance) {
  // Usuários
  app.post("/users", register);
  app.post("/session", autenticar);
  app.patch("/token/refresh", refresh);
  app.get("/verify-token", verifyToken);
  //Autenticado
  app.get("/me", { onRequest: [verifyJWT] }, profile);
  app.get("/users", buscarUsuarios);
  app.get(
    "/users/:id",
    { onRequest: [verifyJWT, verifyUseRole("ADMIN")] },
    buscarUsuario
  );
  app.put(
    "/users/:id",
    { onRequest: [verifyJWT, verifyUseRole("ADMIN")] },
    atualizarUsuario
  );
  app.delete(
    "/users/:id",
    { onRequest: [verifyJWT, verifyUseRole("ADMIN")] },
    excluirUsuario
  );

  // Cursos - Rotas organizadas com schemas Zod
  await app.register(routesCursos);

  // Disciplinas - Rotas organizadas com schemas Zod
  await app.register(routesDisciplinas);

  // Prédios - Rotas organizadas com schemas Zod
  await app.register(prediosRoutes);

  // Turmas - Rotas organizadas com schemas Zod
  await app.register(routesTurmas);

  // Rota específica de grade de horários para turmas (mantida separada)
  app.get("/turmas/:id/grade-horarios", buscarGradeHorariosTurma);

  // Salas
  app.post("/salas", criarSala);
  app.get("/salas", buscarSalas);
  app.get("/salas/:id", buscarSala);
  app.get("/salas/:id/grade-horarios", buscarGradeHorariosSala);
  app.put("/salas/:id", atualizarSala);
  app.delete("/salas/:id", excluirSala);

  // Horários
  app.post("/horarios", criarHorario);
  app.post("/horarios/codigo", criarHorarioCodigo);
  app.get("/horarios", buscarHorarios);
  app.get("/horarios/:id", buscarHorario);
  app.put("/horarios/:id", atualizarHorario);
  app.delete("/horarios/:id", excluirHorario);

  // Alocações
  app.post("/alocacoes", criarAlocacao);
  app.get("/alocacoes", buscarAlocacoes);
  app.get("/alocacoes/periodo/manha", buscarAlocacoesPeriodoManha);
  app.get("/alocacoes/turma/:id_turma/periodo", buscarAlocacoesTurmaPeriodo);
  app.get("/alocacoes/professor/:id_professor", buscarAlocacoesProfessor);
  app.get("/alocacoes/aulas-professor", buscarQuantidadeAulasPorProfessor);
  app.get("/alocacoes/:id", buscarAlocacao);
  app.put("/alocacoes/:id", atualizarAlocacao);
  app.delete("/alocacoes/:id", excluirAlocacao);
  app.delete("/alocacoes/turma/:id_turma/todas", excluirTodasAlocacoesTurma);

  // Grade de Horários
  app.get("/grade-horarios", buscarGradeHorarios);

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

  // Professor-Disciplina
  app.post(
    "/professor-disciplina/vincular",
    { onRequest: [verifyJWT, verifyUseRole("ADMIN")] },
    vincularProfessorDisciplina
  );
  app.post(
    "/professor-disciplina/desvincular",
    { onRequest: [verifyJWT, verifyUseRole("ADMIN")] },
    desvincularProfessorDisciplina
  );
  app.get("/professores/:id_user/disciplinas", buscarDisciplinasProfessor);
  app.get(
    "/disciplinas/:id_disciplina/professores",
    buscarProfessoresDisciplina
  );

  // User-Curso
  app.post(
    "/user-curso/vincular",
    { onRequest: [verifyJWT, verifyUseRole("ADMIN")] },
    vincularUserCurso
  );
  app.post(
    "/user-curso/desvincular",
    { onRequest: [verifyJWT, verifyUseRole("ADMIN")] },
    desvincularUserCurso
  );
  app.get("/user-curso/cursos/:id_user", buscarCursosUsuario);
  app.get("/user-curso/usuarios/:id_curso", buscarUsuariosCurso);
}
