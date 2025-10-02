import { FastifyRequest, FastifyReply } from "fastify";
import { makeCriarAlocacaoUseCase } from "@/use-cases/@factories/alocacao/make-criar-alocacao-use-case";
import { createAlocacaoSchema } from "@/schemas";

export async function criarAlocacao(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { id_user, id_disciplina, id_turma, id_sala, id_horario, id_horarios } =
    createAlocacaoSchema.parse(request.body);

  try {
    const criarAlocacaoUseCase = makeCriarAlocacaoUseCase();

    // Normalizar para sempre usar array de horários
    const horariosArray = id_horarios || (id_horario ? [id_horario] : []);

    const { alocacoes } = await criarAlocacaoUseCase.execute({
      id_user,
      id_disciplina,
      id_turma,
      id_sala,
      id_horarios: horariosArray,
    });

    // Se foi um único horário, retornar como objeto único para compatibilidade
    if (id_horario) {
      return reply.status(201).send({ alocacao: alocacoes[0] });
    }

    // Se foram múltiplos horários, retornar array
    return reply.status(201).send({ alocacoes });
  } catch (error) {
    throw error;
  }
}
