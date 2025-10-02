// Exportações centralizadas de todos os schemas

// Re-exportar Zod para facilitar// Exportações centralizadas de schemas
export { z } from "zod";

// Schemas comuns
export * from "./common";

// Schemas específicos por domínio
export * from "./alocacao";
export * from "./curso";
export * from "./disciplina";
export * from "./predio";
export * from "./turma";
export * from "./user";