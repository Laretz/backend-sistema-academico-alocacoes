// Exportações centralizadas de todos os schemas

// Re-exportar Zod para facilitar importações
export { z } from "zod";

// Schemas comuns
export * from "./common";

// Schemas específicos por domínio
export * from "./curso";
export * from "./disciplina";
export * from "./predio";
export * from "./turma";