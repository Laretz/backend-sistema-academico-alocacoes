import { FastifyRequest, FastifyReply } from "fastify";
import { makeCriarAlocacaoUseCase } from "@/use-cases/@factories/alocacao/make-criar-alocacao-use-case";
import { createAlocacaoSchema } from "@/schemas";

export async function criarAlocacao(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { id_user, id_curso_disciplina, id_turma, id_sala, id_horario, id_horarios } =
    createAlocacaoSchema.parse(request.body);

  try {
    const criarAlocacaoUseCase = makeCriarAlocacaoUseCase();

    // Normalizar para sempre usar array de horários
    const horariosArray = id_horarios || (id_horario ? [id_horario] : []);

    const { alocacoes, conflitos } = await criarAlocacaoUseCase.execute({
      id_user,
      id_curso_disciplina,
      id_turma,
      id_sala,
      id_horarios: horariosArray,
    });

    // Se foi um único horário, tratar retorno único
    if (id_horario) {
      if (alocacoes.length === 0) {
        return reply.status(409).send({
          message: "Conflito detectado. Nenhuma alocação foi criada para o horário informado.",
          conflitos,
        });
      }
      return reply.status(201).send({ alocacao: alocacoes[0], conflitos });
    }

    // Vários horários: criar parcial possível e retornar detalhes dos conflitos
    if (alocacoes.length === 0) {
      return reply.status(409).send({
        message: "Conflitos detectados. Nenhuma alocação foi criada.",
        conflitos,
      });
    }

    return reply.status(201).send({ alocacoes, conflitos });
  } catch (error) {
    throw error;
  }
}
