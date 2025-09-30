import { FastifyInstance } from "fastify";
import { routesCursos } from "@/http/controllers/cursos/routes";

/**
 * Exemplo de como integrar as rotas de cursos no arquivo principal de rotas
 * 
 * Este arquivo demonstra como registrar as rotas modulares no Fastify
 */

// Opção 1: Registrar diretamente no arquivo routes.ts principal
export async function exemploIntegracaoRotas(app: FastifyInstance) {
  // Registrar as rotas de cursos
  await app.register(routesCursos);
  
  // Outras rotas podem ser registradas aqui...
  // await app.register(routesDisciplinas);
  // await app.register(routesTurmas);
}

// Opção 2: Registrar com prefixo
export async function exemploIntegracaoComPrefixo(app: FastifyInstance) {
  // Registrar as rotas de cursos com prefixo /api/v1
  await app.register(routesCursos, { prefix: '/api/v1' });
}

// Opção 3: Registrar com middleware de autenticação
export async function exemploIntegracaoComAuth(app: FastifyInstance) {
  // Registrar as rotas de cursos com middleware de autenticação
  await app.register(async function (app) {
    // Aplicar middleware de autenticação para todas as rotas deste grupo
    app.addHook('preHandler', async (request, reply) => {
      // Verificar JWT ou outras validações de autenticação
      await request.jwtVerify();
    });
    
    // Registrar as rotas de cursos
    await app.register(routesCursos);
  });
}

/**
 * Como usar no arquivo routes.ts principal:
 * 
 * import { FastifyInstance } from "fastify";
 * import { routesCursos } from "./controllers/cursos/routes";
 * 
 * export async function appRoutes(app: FastifyInstance) {
 *   // Registrar rotas de cursos
 *   await app.register(routesCursos);
 *   
 *   // Outras rotas...
 * }
 */