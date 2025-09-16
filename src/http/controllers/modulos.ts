import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Schema de validação para criar módulo
const createModuloBodySchema = z.object({
  id_disciplina: z.string().uuid(),
  id_alocacao_principal: z.string().uuid(),
  id_sala: z.string().uuid(),
  id_horario: z.string().uuid(),
  data_inicio: z.string().datetime(),
  data_fim: z.string().datetime()
});

// Schema de validação para atualizar módulo
const updateModuloBodySchema = z.object({
  id_sala: z.string().uuid().optional(),
  id_horario: z.string().uuid().optional(),
  data_inicio: z.string().datetime().optional(),
  data_fim: z.string().datetime().optional(),
  ativo: z.boolean().optional()
});

const getModuloParamsSchema = z.object({
  id: z.string().uuid()
});

const getModulosByDisciplinaParamsSchema = z.object({
  disciplinaId: z.string().uuid()
});

// Listar módulos de uma disciplina
export async function buscarModulosPorDisciplina(request: FastifyRequest, reply: FastifyReply) {
  try {
    const { disciplinaId } = getModulosByDisciplinaParamsSchema.parse(request.params);
    
    const modulos = await prisma.moduloDisciplina.findMany({
      where: {
        id_disciplina: disciplinaId,
        ativo: true
      },
      include: {
        disciplina: {
          select: {
            id: true,
            nome: true,
            carga_horaria: true,
            carga_horaria_atual: true
          }
        },
        sala: {
          select: {
            id: true,
            nome: true,
            predio: true,
            capacidade: true
          }
        },
        horario: {
          select: {
            id: true,
            codigo: true,
            dia_semana: true,
            horario_inicio: true,
            horario_fim: true
          }
        }
      },
      orderBy: {
        created_at: 'desc'
      }
    });

    return reply.status(200).send(modulos);
  } catch (error) {
    console.error('Erro ao buscar módulos:', error);
    return reply.status(500).send({ message: 'Erro interno do servidor' });
  }
}

// Buscar módulo específico
export async function buscarModulo(request: FastifyRequest, reply: FastifyReply) {
  try {
    const { id } = getModuloParamsSchema.parse(request.params);
    
    const modulo = await prisma.moduloDisciplina.findUnique({
      where: { id },
      include: {
        disciplina: {
          select: {
            id: true,
            nome: true,
            carga_horaria: true,
            carga_horaria_atual: true
          }
        },
        sala: {
          select: {
            id: true,
            nome: true,
            predio: true,
            capacidade: true
          }
        },
        horario: {
          select: {
            id: true,
            codigo: true,
            dia_semana: true,
            horario_inicio: true,
              horario_fim: true
          }
        }
      }
    });

    if (!modulo) {
      return reply.status(404).send({ message: 'Módulo não encontrado' });
    }

    return reply.status(200).send(modulo);
  } catch (error) {
    console.error('Erro ao buscar módulo:', error);
    return reply.status(500).send({ message: 'Erro interno do servidor' });
  }
}

// Criar novo módulo
export async function criarModulo(request: FastifyRequest, reply: FastifyReply) {
  try {
    const validatedData = createModuloBodySchema.parse(request.body);
    
    // Verificar se a disciplina existe
    const disciplina = await prisma.disciplina.findUnique({
      where: { id: validatedData.id_disciplina }
    });
    
    if (!disciplina) {
      return reply.status(404).send({ message: 'Disciplina não encontrada' });
    }

    // Verificar se a sala está disponível no horário
    const conflito = await prisma.moduloDisciplina.findFirst({
      where: {
        id_sala: validatedData.id_sala,
        id_horario: validatedData.id_horario,
        ativo: true,
        AND: [
          {
            data_inicio: {
              lte: new Date(validatedData.data_fim)
            }
          },
          {
            data_fim: {
              gte: new Date(validatedData.data_inicio)
            }
          }
        ]
      }
    });

    if (conflito) {
      return reply.status(400).send({ message: 'Sala já ocupada neste horário' });
    }

    const novoModulo = await prisma.moduloDisciplina.create({
      data: {
        ...validatedData,
        data_inicio: new Date(validatedData.data_inicio),
        data_fim: new Date(validatedData.data_fim)
      },
      include: {
        disciplina: {
          select: {
            id: true,
            nome: true,
            carga_horaria: true,
            carga_horaria_atual: true
          }
        },
        sala: {
          select: {
            id: true,
            nome: true,
            predio: true,
            capacidade: true
          }
        },
        horario: {
          select: {
            id: true,
            codigo: true,
            dia_semana: true,
            horario_inicio: true,
              horario_fim: true
          }
        }
      }
    });

    // Recalcular a data de fim da disciplina
    await recalcularDataFimDisciplina(validatedData.id_disciplina);

    return reply.status(201).send(novoModulo);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return reply.status(400).send({ message: 'Dados inválidos', issues: error.format() });
    }
    console.error('Erro ao criar módulo:', error);
    return reply.status(500).send({ message: 'Erro interno do servidor' });
  }
}

// Atualizar módulo
export async function atualizarModulo(request: FastifyRequest, reply: FastifyReply) {
  try {
    const { id } = getModuloParamsSchema.parse(request.params);
    const validatedData = updateModuloBodySchema.parse(request.body);

    const moduloExistente = await prisma.moduloDisciplina.findUnique({
      where: { id }
    });

    if (!moduloExistente) {
      return reply.status(404).send({ message: 'Módulo não encontrado' });
    }

    const moduloAtualizado = await prisma.moduloDisciplina.update({
      where: { id },
      data: {
        ...validatedData,
        data_inicio: validatedData.data_inicio ? new Date(validatedData.data_inicio) : undefined,
        data_fim: validatedData.data_fim ? new Date(validatedData.data_fim) : undefined
      },
      include: {
        disciplina: {
          select: {
            id: true,
            nome: true,
            carga_horaria: true,
            carga_horaria_atual: true
          }
        },
        sala: {
          select: {
            id: true,
            nome: true,
            predio: true,
            capacidade: true
          }
        },
        horario: {
          select: {
            id: true,
            codigo: true,
            dia_semana: true,
            horario_inicio: true,
            horario_fim: true
          }
        }
      }
    });

    // Recalcular a data de fim da disciplina
    await recalcularDataFimDisciplina(moduloExistente.id_disciplina);

    return reply.status(200).send(moduloAtualizado);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return reply.status(400).send({ message: 'Dados inválidos', issues: error.format() });
    }
    console.error('Erro ao atualizar módulo:', error);
    return reply.status(500).send({ message: 'Erro interno do servidor' });
  }
}

// Deletar módulo (soft delete)
export async function excluirModulo(request: FastifyRequest, reply: FastifyReply) {
  try {
    const { id } = getModuloParamsSchema.parse(request.params);

    const moduloExistente = await prisma.moduloDisciplina.findUnique({
      where: { id }
    });

    if (!moduloExistente) {
      return reply.status(404).send({ message: 'Módulo não encontrado' });
    }

    await prisma.moduloDisciplina.update({
      where: { id },
      data: { ativo: false }
    });

    // Recalcular a data de fim da disciplina
    await recalcularDataFimDisciplina(moduloExistente.id_disciplina);

    return reply.status(204).send();
  } catch (error) {
    console.error('Erro ao deletar módulo:', error);
    return reply.status(500).send({ message: 'Erro interno do servidor' });
  }
}

// Função auxiliar para recalcular a data de fim da disciplina
async function recalcularDataFimDisciplina(id_disciplina: string) {
  try {
    const disciplina = await prisma.disciplina.findUnique({
      where: { id: id_disciplina },
      include: {
        alocacoes: {
          include: {
            horario: true
          }
        },
        modulos: {
          where: { ativo: true },
          include: {
            horario: true
          }
        }
      }
    });

    if (!disciplina || !disciplina.data_inicio) {
      return;
    }

    // Calcular horas semanais (alocações principais + módulos)
    const horasSemanais = disciplina.alocacoes.length + disciplina.modulos.length;
    
    if (horasSemanais === 0) {
      return;
    }

    // Calcular quantas semanas são necessárias
    const semanasNecessarias = Math.ceil(disciplina.carga_horaria / horasSemanais);
    
    // Calcular nova data de fim
    const dataFimReal = new Date(disciplina.data_inicio);
    dataFimReal.setDate(dataFimReal.getDate() + (semanasNecessarias * 7));

    // Atualizar a disciplina
    await prisma.disciplina.update({
      where: { id: id_disciplina },
      data: {
        data_fim_real: dataFimReal,
        carga_horaria_atual: Math.min(disciplina.carga_horaria, horasSemanais * semanasNecessarias)
      }
    });
  } catch (error) {
    console.error('Erro ao recalcular data de fim da disciplina:', error);
  }
}

// Buscar todos os módulos
export async function buscarModulos(request: FastifyRequest, reply: FastifyReply) {
  try {
    const modulos = await prisma.moduloDisciplina.findMany({
      where: {
        ativo: true
      },
      include: {
        disciplina: {
          select: {
            id: true,
            nome: true,
            carga_horaria: true,
            carga_horaria_atual: true
          }
        },
        sala: {
          select: {
            id: true,
            nome: true,
            predio: true,
            capacidade: true
          }
        },
        horario: {
          select: {
            id: true,
            codigo: true,
            dia_semana: true,
            horario_inicio: true,
            horario_fim: true
          }
        }
      },
      orderBy: {
        created_at: 'desc'
      }
    });

    return reply.status(200).send(modulos);
  } catch (error) {
    console.error('Erro ao buscar módulos:', error);
    return reply.status(500).send({ message: 'Erro interno do servidor' });
  }
}
