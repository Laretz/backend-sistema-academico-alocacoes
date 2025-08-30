import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { makeCriarAlocacaoUseCase } from "../../../use-cases/@factories/make-criar-alocacao-use-case";

export async function criarAlocacao(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const criarAlocacaoBodySchema = z
    .object({
      id_user: z.string().uuid(),
      id_disciplina: z.string().uuid(),
      id_turma: z.string().uuid(),
      id_sala: z.string().uuid(),
      id_horario: z.string().uuid().optional(),
      id_horarios: z.array(z.string().uuid()).optional(),
    })
    .refine(
      (data) => {
        // Deve ter exatamente um dos dois: id_horario OU id_horarios
        return (
          (data.id_horario && !data.id_horarios) ||
          (!data.id_horario && data.id_horarios)
        );
      },
      {
        message:
          "Deve fornecer exatamente um dos campos: 'id_horario' ou 'id_horarios'",
      }
    );

  const { id_user, id_disciplina, id_turma, id_sala, id_horario, id_horarios } =
    criarAlocacaoBodySchema.parse(request.body);

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
