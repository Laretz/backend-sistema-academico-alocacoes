import { FastifyInstance } from "fastify";
import { register, autenticar, profile, refresh, buscarUsuarios, buscarUsuario, atualizarUsuario, excluirUsuario } from "./controllers/users";
import { criarDisciplina, buscarDisciplinas, buscarDisciplina, atualizarDisciplina, excluirDisciplina } from "./controllers/disciplinas";
import { criarTurma, buscarTurmas, buscarTurma, atualizarTurma, excluirTurma, buscarGradeHorariosTurma } from "./controllers/turmas";
import { criarSala, buscarSalas, buscarSala, atualizarSala, excluirSala, buscarGradeHorariosSala } from "./controllers/salas";
import { criarHorario, buscarHorarios, buscarHorario, atualizarHorario, excluirHorario, criarHorarioCodigo } from "./controllers/horarios";
import { criarAlocacao, buscarAlocacoes, buscarAlocacao, atualizarAlocacao, excluirAlocacao, buscarGradeHorarios } from "./controllers/alocacoes";
import { verifyJWT } from "./middlewares/verify-jwt";
import { verifyUseRole } from "./middlewares/verify-user-role";


export async function appRoutes(app: FastifyInstance){
    // Usuários
    app.post('/users', register);
    app.post('/session', autenticar);
    app.patch('/token/refresh', refresh);
    //Autenticado
    app.get('/me', {onRequest: [verifyJWT]}, profile);
    app.get('/users', {onRequest: [verifyJWT, verifyUseRole('ADMIN')]}, buscarUsuarios);
    app.get('/users/:id', {onRequest: [verifyJWT, verifyUseRole('ADMIN')]}, buscarUsuario);
    app.put('/users/:id', {onRequest: [verifyJWT, verifyUseRole('ADMIN')]}, atualizarUsuario);
    app.delete('/users/:id', {onRequest: [verifyJWT, verifyUseRole('ADMIN')]}, excluirUsuario);
    
    // Disciplinas
    app.post('/disciplinas', {onRequest: [verifyJWT, verifyUseRole('COORDENADOR')]} , criarDisciplina);
    app.get('/disciplinas', buscarDisciplinas);
    app.get('/disciplinas/:id', buscarDisciplina);
    app.put('/disciplinas/:id', atualizarDisciplina);
    app.delete('/disciplinas/:id', excluirDisciplina);
    
    // Turmas
    app.post('/turmas', criarTurma);
    app.get('/turmas', buscarTurmas);
    app.get('/turmas/:id', buscarTurma);
    app.get('/turmas/:id/grade-horarios', buscarGradeHorariosTurma);
    app.put('/turmas/:id', atualizarTurma);
    app.delete('/turmas/:id', excluirTurma);
    
    // Salas
    app.post('/salas', criarSala);
    app.get('/salas', buscarSalas);
    app.get('/salas/:id', buscarSala);
    app.get('/salas/:id/grade-horarios', buscarGradeHorariosSala);
    app.put('/salas/:id', atualizarSala);
    app.delete('/salas/:id', excluirSala);
    
    // Horários
    app.post('/horarios', criarHorario);
    app.post('/horarios/codigo', criarHorarioCodigo);
    app.get('/horarios', buscarHorarios);
    app.get('/horarios/:id', buscarHorario);
    app.put('/horarios/:id', atualizarHorario);
    app.delete('/horarios/:id', excluirHorario);
    
    // Alocações
    app.post('/alocacoes', criarAlocacao);
    app.get('/alocacoes', buscarAlocacoes);
    app.get('/alocacoes/:id', buscarAlocacao);
    app.put('/alocacoes/:id', atualizarAlocacao);
    app.delete('/alocacoes/:id', excluirAlocacao);
    
    // Grade de Horários
    app.get('/grade-horarios', buscarGradeHorarios);
}