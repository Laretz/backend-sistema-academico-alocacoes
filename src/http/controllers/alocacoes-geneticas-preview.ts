import { FastifyRequest, FastifyReply } from 'fastify';
import { AllocationService } from '../../algorithms/allocation/allocation-service';
import { z } from 'zod';
import { prisma } from '../../lib/prisma';

/**
 * Formata a grade de horários para o preview no frontend
 */
async function formatScheduleForPreview(gradeHorarios: Record<string, any[]>) {
  const timeSlots = [
    { code: 'M1', time: '07:00 - 07:50' },
    { code: 'M2', time: '07:50 - 08:40' },
    { code: 'M3', time: '08:55 - 09:45' },
    { code: 'M4', time: '09:45 - 10:35' },
    { code: 'M5', time: '10:50 - 11:40' },
    { code: 'M6', time: '11:40 - 12:30' },
    { code: 'T1', time: '13:00 - 13:50' },
    { code: 'T2', time: '13:50 - 14:40' },
    { code: 'T3', time: '14:55 - 15:45' },
    { code: 'T4', time: '15:45 - 16:35' },
    { code: 'T5', time: '16:50 - 17:40' },
    { code: 'T6', time: '17:40 - 18:30' },
    { code: 'N1', time: '19:00 - 19:50' },
    { code: 'N2', time: '19:50 - 20:40' },
    { code: 'N3', time: '20:55 - 21:45' },
    { code: 'N4', time: '21:45 - 22:35' }
  ];

  const daysOfWeek = ['SEGUNDA', 'TERCA', 'QUARTA', 'QUINTA', 'SEXTA'];
  const dayLabels = ['Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira'];
  
  const schedule = [];
  
  for (const slot of timeSlots) {
    const row = {
      time: `${slot.time} ${slot.code}`, // Adiciona o código do horário
      days: []
    };
    
    for (let i = 0; i < daysOfWeek.length; i++) {
      const day = daysOfWeek[i];
      const key = `${day}_${slot.code}`;
      const allocation = gradeHorarios[key]?.[0]; // Pega a primeira alocação se houver
      
      if (allocation) {
        row.days.push({
          disciplina: allocation.disciplina,
          codigo: allocation.codigo,
          professor: allocation.professor,
          sala: allocation.sala
        });
      } else {
        row.days.push(null);
      }
    }
    
    schedule.push(row);
  }
  
  return schedule;
}

// Schema de validação para requisição de preview de alocação genética
const previewGeneticAllocationBodySchema = z.object({
  turmaId: z.string().uuid('ID da turma deve ser um UUID válido'),
  disciplinaIds: z.array(z.string().uuid()).min(1, 'Deve selecionar pelo menos uma disciplina'),
  params: z.object({
    populationSize: z.number().int().min(10).max(1000).optional().default(50),
    generations: z.number().int().min(10).max(500).optional().default(100),
    mutationRate: z.number().min(0).max(1).optional().default(0.1),
    crossoverRate: z.number().min(0).max(1).optional().default(0.8),
    elitismRate: z.number().min(0).max(1).optional().default(0.1)
  }).optional().default({})
});

/**
 * Controller para gerar preview de alocação genética sem salvar no banco
 */
export async function previewGeneticAllocation(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    // Validar dados da requisição
    const { turmaId, disciplinaIds, params } = previewGeneticAllocationBodySchema.parse(request.body);
    
    // Criar instância do serviço de alocação
    const allocationService = new AllocationService();
    
    // Executar algoritmo genético apenas para preview (sem salvar)
    const result = await allocationService.generatePreview({
      turmaId,
      disciplinaIds,
      params
    });
    
    if (!result.success) {
      return reply.status(400).send({
        error: 'Erro na geração do preview',
        message: result.error
      });
    }
    
    // Verificar se há alocações no resultado
    if (!result.alocacoes || !Array.isArray(result.alocacoes)) {
      return reply.status(400).send({
        success: false,
        error: 'Nenhuma alocação foi gerada no preview'
      });
    }

    // Buscar dados completos das alocações para o frontend
    const allocationsWithDetails = await Promise.all(
      result.alocacoes.map(async (alocacao) => {
        const [disciplina, professor, sala, horario] = await Promise.all([
          prisma.disciplina.findUnique({ where: { id: alocacao.disciplinaId } }),
          prisma.user.findUnique({ where: { id: alocacao.professorId } }),
          prisma.sala.findUnique({ 
            where: { id: alocacao.salaId },
            include: { predio: true }
          }),
          prisma.horario.findUnique({ where: { id: alocacao.horarioId } })
        ]);
        
        return {
          ...alocacao,
          disciplina,
          professor,
          sala,
          horario
        };
      })
    );

    return reply.status(200).send({
      success: true,
      message: 'Preview de alocação gerado com sucesso',
      data: {
        turmaId: result.turmaId,
        allocations: allocationsWithDetails,
        fitness: result.fitness,
        conflicts: result.conflitos || [],
        estatisticas: {
          geracoes: result.geracoes,
          tempoExecucao: result.tempoExecucao,
          melhorFitness: result.melhorFitness,
          totalAlocacoes: result.alocacoes?.length || 0,
          disciplinasAlocadas: disciplinaIds.length
        },
        gradeHorarios: result.gradeHorarios || {},
        schedule: await formatScheduleForPreview(result.gradeHorarios || {})
      }
    });
    
  } catch (error) {
    console.error('Erro no controller de preview de alocação genética:', error);
    
    if (error instanceof z.ZodError) {
      return reply.status(400).send({
        error: 'Dados de entrada inválidos',
        details: (error.errors || []).map(err => ({
          campo: err.path?.join('.') || 'unknown',
          mensagem: err.message || 'Erro de validação'
        }))
      });
    }
    
    return reply.status(500).send({
      error: 'Erro interno do servidor',
      message: 'Falha na geração do preview de alocação'
    });
  }
}