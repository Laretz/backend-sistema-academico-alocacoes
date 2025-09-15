import { prisma } from '../../lib/prisma';
import { GeneticAlgorithm, GeneticAlgorithmParams, Cromossomo } from '../genetic/genetic-algorithm';
import { GeneticOperators } from '../genetic/genetic-operators';
import { constraintManager } from '../genetic/constraints';

interface AllocationRequest {
  turmaId: string;
  params?: Partial<GeneticAlgorithmParams>;
}

interface AlocacaoData {
  disciplinaId: string;
  professorId: string;
  salaId: string;
  horarioId: string;
}

interface AllocationResult {
  success: boolean;
  cromossomo?: Cromossomo;
  alocacoes?: AlocacaoData[];
  metrics?: {
    fitness: number;
    generations: number;
    executionTime: number;
    conflictsResolved: number;
  };
  error?: string;
}

interface AllocationMetrics {
  totalDisciplinas: number;
  conflitosIniciais: number;
  conflitosFinais: number;
  fitnessInicial: number;
  fitnessFinal: number;
  geracoesExecutadas: number;
  tempoExecucao: number;
  taxaSucesso: number;
}

interface AllocationStatus {
  turmaId: string;
  status: 'completed' | 'not_started' | 'in_progress' | 'error';
  totalAlocacoes: number;
  ultimaExecucao: Date | null;
}

interface AllocationMetrics {
  turmaId: string;
  alocacoes: AlocacaoData[];
  estatisticas: {
    totalAlocacoes: number;
    disciplinasUnicas: number;
    professoresUnicos: number;
    turmasUnicas: number;
  };
  gradeHorarios: Record<string, AlocacaoData[]>;
}

export class AllocationService {
  private defaultParams: GeneticAlgorithmParams;

  constructor() {
    this.defaultParams = {
      populationSize: 100,
      generations: 500,
      mutationRate: 0.1,
      crossoverRate: 0.8,
      elitismRate: 0.1
    };
  }

  /**
   * Executa o algoritmo genético para alocar disciplinas de uma turma
   */
  public async execute(request: AllocationRequest): Promise<AllocationResult> {
    const result = await this.allocateSchedule(request);
    
    if (!result.success) {
      return {
        success: false,
        error: result.error
      };
    }

    // Salvar alocações no banco de dados
    if (result.alocacoes) {
      await this.saveAllocations(request.turmaId, result.alocacoes);
    }

    return {
      success: true,
      turmaId: request.turmaId,
      alocacoes: result.alocacoes,
      fitness: result.cromossomo?.fitness,
      conflitos: 0, // TODO: calcular conflitos reais
      relatorio: await this.generateAllocationReport(request.turmaId),
      geracoes: result.metrics?.generations,
      tempoExecucao: result.metrics?.executionTime,
      melhorFitness: result.cromossomo?.fitness,
      convergencia: true // TODO: implementar lógica de convergência
    };
  }

  /**
   * Executa o algoritmo genético para alocar disciplinas de uma turma
   */
  public async allocateSchedule(request: AllocationRequest): Promise<AllocationResult> {
    const startTime = Date.now();
    
    try {
      // Validar entrada
      const validation = await this.validateRequest(request);
      if (!validation.isValid) {
        return {
          success: false,
          error: validation.error || 'Erro de validação desconhecido'
        };
      }

      // Buscar dados necessários
      const data = await this.fetchAllocationData(request.turmaId);
      if (!data) {
        return {
          success: false,
          error: 'Dados insuficientes para gerar alocação'
        };
      }

      // Configurar parâmetros do algoritmo
      const params = { ...this.defaultParams, ...request.params };
      
      // Executar algoritmo genético
      const algorithm = new GeneticAlgorithm(
        params,
        data.turma,
        data.professores,
        data.salas,
        data.horarios
      );

      console.log(`Iniciando algoritmo genético para turma ${request.turmaId}`);
      console.log(`Parâmetros: ${JSON.stringify(params)}`);
      
      const bestSolution = await algorithm.execute();
      const executionTime = Date.now() - startTime;

      // Validar solução
      const solutionValidation = this.validateSolution(bestSolution, data);
      if (!solutionValidation.isValid) {
        console.warn('Solução gerada contém violações:', solutionValidation.violations);
      }

      // Converter para formato de alocações
      const alocacoes = await this.convertToAllocations(bestSolution, data);

      // Calcular métricas
      const metrics = {
        fitness: bestSolution.fitness,
        generations: params.generations,
        executionTime,
        conflictsResolved: this.countResolvedConflicts(bestSolution)
      };

      console.log(`Algoritmo concluído em ${executionTime}ms`);
      console.log(`Fitness final: ${bestSolution.fitness}`);

      return {
        success: true,
        cromossomo: bestSolution,
        alocacoes,
        metrics
      };

    } catch (error) {
      console.error('Erro durante execução do algoritmo genético:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Erro desconhecido'
      };
    }
  }

  /**
   * Salva as alocações geradas no banco de dados
   */
  public async saveAllocations(turmaId: string, alocacoes: AlocacaoData[]): Promise<boolean> {
    try {
      await prisma.$transaction(async (tx) => {
        // Remover alocações existentes da turma
        await tx.alocacao.deleteMany({
          where: { id_turma: turmaId }
        });

        // Criar novas alocações
        for (const alocacao of alocacoes) {
          await tx.alocacao.create({
            data: {
              id_turma: turmaId,
              id_disciplina: alocacao.disciplinaId,
              id_user: alocacao.professorId,
              id_sala: alocacao.salaId,
              id_horario: alocacao.horarioId,
              is_modulo_principal: true // Assumindo que todas são módulo principal
            }
          });
        }
      });

      console.log(`${alocacoes.length} alocações salvas para turma ${turmaId}`);
      return true;

    } catch (error) {
      console.error('Erro ao salvar alocações:', error);
      return false;
    }
  }

  /**
   * Busca dados necessários para execução do algoritmo
   */
  private async fetchAllocationData(turmaId: string) {
    try {
      const turma = await prisma.turma.findUnique({
        where: { id: turmaId },
        include: {
          alocacoes: {
            include: {
              disciplina: true
            }
          }
        }
      });

      if (!turma) {
        throw new Error(`Turma ${turmaId} não encontrada`);
      }

      const professores = await prisma.user.findMany({
        where: { role: 'PROFESSOR' }
      });

      if (!professores || professores.length === 0) {
        return {
          success: false,
          error: 'Nenhum professor encontrado'
        };
      }

      const salas = await prisma.sala.findMany();
      if (!salas || salas.length === 0) {
        return {
          success: false,
          error: 'Nenhuma sala encontrada'
        };
      }

      const horarios = await prisma.horario.findMany();
      if (!horarios || horarios.length === 0) {
        return {
          success: false,
          error: 'Nenhum horário encontrado'
        };
      }

      // Obter disciplinas únicas das alocações existentes
      const disciplinasUnicas = turma.alocacoes.reduce((acc: any[], alocacao: any) => {
        if (!acc.find(d => d.id === alocacao.disciplina.id)) {
          acc.push(alocacao.disciplina);
        }
        return acc;
      }, []);

      // Converter para formato esperado pelo algoritmo
      const turmaData = {
        id: turma.id,
        num_alunos: turma.num_alunos,
        turno: turma.turno || 'MATUTINO', // Incluir turno da turma
        disciplinas: disciplinasUnicas.map(d => ({
          id: d.id,
          nome: d.nome,
          cargaHoraria: d.carga_horaria_total || 60,
          tipoSala: d.tipo_de_sala === 'Lab' ? 'Lab' : 'Sala'
        }))
      };

      const professoresData = professores.map(p => ({
        id: p.id,
        nome: p.nome,
        carga_horaria_max: p.carga_horaria_max || 40, // Default 40h
        preferencias: [] // TODO: Implementar preferências de horário
      }));

      const salasData = salas.map(s => ({
        id: s.id,
        nome: s.nome,
        capacidade: s.capacidade,
        tipo: s.tipo,
        computadores: s.computadores
      }));

      const horariosData = horarios.map(h => ({
        id: h.id,
        codigo: h.codigo,
        dia_semana: h.dia_semana
      }));

      return {
        turma: turmaData,
        professores: professoresData,
        salas: salasData,
        horarios: horariosData
      };

    } catch (error) {
      console.error('Erro ao buscar dados para alocação:', error);
      return null;
    }
  }

  /**
   * Valida a requisição de alocação
   */
  private async validateRequest(request: AllocationRequest): Promise<{ isValid: boolean; error?: string }> {
    if (!request.turmaId) {
      return { isValid: false, error: 'ID da turma é obrigatório' };
    }

    // Verificar se a turma existe
    const turma = await prisma.turma.findUnique({
      where: { id: request.turmaId },
      include: { 
        alocacoes: {
          include: {
            disciplina: true
          }
        }
      }
    });

    if (!turma) {
      return { isValid: false, error: 'Turma não encontrada' };
    }

    if (turma.alocacoes.length === 0) {
      return { isValid: false, error: 'Turma não possui alocações cadastradas para processar' };
    }

    // Validar parâmetros do algoritmo
    if (request.params) {
      const { populationSize, generations, mutationRate, crossoverRate, elitismRate } = request.params;
      
      if (populationSize && (populationSize < 10 || populationSize > 1000)) {
        return { isValid: false, error: 'Tamanho da população deve estar entre 10 e 1000' };
      }
      
      if (generations && (generations < 10 || generations > 2000)) {
        return { isValid: false, error: 'Número de gerações deve estar entre 10 e 2000' };
      }
      
      if (mutationRate && (mutationRate < 0 || mutationRate > 1)) {
        return { isValid: false, error: 'Taxa de mutação deve estar entre 0 e 1' };
      }
      
      if (crossoverRate && (crossoverRate < 0 || crossoverRate > 1)) {
        return { isValid: false, error: 'Taxa de crossover deve estar entre 0 e 1' };
      }
      
      if (elitismRate && (elitismRate < 0 || elitismRate > 0.5)) {
        return { isValid: false, error: 'Taxa de elitismo deve estar entre 0 e 0.5' };
      }
    }

    return { isValid: true };
  }

  /**
   * Valida a solução gerada pelo algoritmo
   */
  private validateSolution(cromossomo: Cromossomo, data: {
    professores: any[];
    salas: any[];
    horarios: any[];
    disciplinas: any[];
    turma: any;
  }): { isValid: boolean; violations: string[] } {
    const violations: string[] = [];
    const context = {
      allGenes: cromossomo.genes,
      professores: data.professores,
      salas: data.salas,
      disciplinas: data.turma.disciplinas,
      turma: data.turma
    };

    // Verificar cada gene
    for (const gene of cromossomo.genes) {
      const validation = constraintManager.validateHardConstraints(gene, context);
      violations.push(...validation.violations);
    }

    return {
      isValid: violations.length === 0,
      violations: [...new Set(violations)] // Remover duplicatas
    };
  }

  /**
   * Converte cromossomo para formato de alocações
   */
  private async convertToAllocations(cromossomo: Cromossomo, data: {
    professores: any[];
    salas: any[];
    horarios: any[];
    disciplinas: any[];
    turma: any;
  }): Promise<AlocacaoData[]> {
    const alocacoes: AlocacaoData[] = [];

    for (const gene of cromossomo.genes) {
      // Para cada horário do gene, criar uma alocação
      for (const horarioStr of gene.horarios) {
        // Encontrar o horário correspondente
        const horario = data.horarios.find(h => 
          `${h.dia_semana}_${h.codigo}` === horarioStr
        );

        if (horario) {
          alocacoes.push({
            disciplinaId: gene.disciplinaId,
            professorId: gene.professorId,
            salaId: gene.salaId,
            horarioId: horario.id,
            horarioStr
          });
        }
      }
    }

    return alocacoes;
  }

  /**
   * Conta conflitos resolvidos na solução
   */
  private countResolvedConflicts(cromossomo: Cromossomo): number {
    // Implementação simplificada
    // Na prática, compararia com uma solução inicial ou baseline
    const professorHorarios = new Map<string, Set<string>>();
    const salaHorarios = new Map<string, Set<string>>();
    let conflicts = 0;

    for (const gene of cromossomo.genes) {
      // Verificar conflitos de professor
      if (!professorHorarios.has(gene.professorId)) {
        professorHorarios.set(gene.professorId, new Set());
      }
      const profHorarios = professorHorarios.get(gene.professorId)!;
      
      for (const horario of gene.horarios) {
        if (profHorarios.has(horario)) {
          conflicts++;
        }
        profHorarios.add(horario);
      }

      // Verificar conflitos de sala
      if (!salaHorarios.has(gene.salaId)) {
        salaHorarios.set(gene.salaId, new Set());
      }
      const salaHors = salaHorarios.get(gene.salaId)!;
      
      for (const horario of gene.horarios) {
        if (salaHors.has(horario)) {
          conflicts++;
        }
        salaHors.add(horario);
      }
    }

    // Retorna o número de conflitos que foram evitados
    // (assumindo que uma solução aleatória teria mais conflitos)
    return Math.max(0, cromossomo.genes.length * 2 - conflicts);
  }

  /**
   * Gera relatório detalhado da alocação
   */
  public async generateAllocationReport(turmaId: string): Promise<AllocationMetrics | null> {
    try {
      const alocacoes = await prisma.alocacao.findMany({
         where: { id_turma: turmaId },
         include: {
           disciplina: true,
           user: true,
           sala: true,
           horario: true
         }
       });

      if (alocacoes.length === 0) {
        return null;
      }

      // Calcular métricas
      const disciplinasUnicas = new Set(alocacoes.map(a => a.disciplinaId)).size;
      const conflitos = this.analyzeConflicts(alocacoes);
      
      return {
        totalDisciplinas: disciplinasUnicas,
        conflitosIniciais: 0, // TODO: Implementar baseline
        conflitosFinais: conflitos.total,
        fitnessInicial: 0, // TODO: Implementar baseline
        fitnessFinal: 1000 - conflitos.total * 100, // Estimativa
        geracoesExecutadas: 0, // TODO: Armazenar no banco
        tempoExecucao: 0, // TODO: Armazenar no banco
        taxaSucesso: conflitos.total === 0 ? 100 : Math.max(0, 100 - conflitos.total * 10)
      };

    } catch (error) {
      console.error('Erro ao gerar relatório:', error);
      return null;
    }
  }

  /**
   * Analisa conflitos nas alocações existentes
   */
  private analyzeConflicts(alocacoes: AlocacaoData[]): { total: number; byType: { [key: string]: number } } {
    const conflicts = { total: 0, byType: { professor: 0, sala: 0, capacity: 0 } };
    
    const professorHorarios = new Map<string, Set<string>>();
    const salaHorarios = new Map<string, Set<string>>();

    for (const alocacao of alocacoes) {
      const horarioKey = `${alocacao.horario.dia_semana}_${alocacao.horario.codigo}`;
      
      // Verificar conflitos de professor
      if (!professorHorarios.has(alocacao.professorId)) {
        professorHorarios.set(alocacao.professorId, new Set());
      }
      const profHorarios = professorHorarios.get(alocacao.professorId)!;
      
      if (profHorarios.has(horarioKey)) {
        conflicts.byType.professor++;
        conflicts.total++;
      }
      profHorarios.add(horarioKey);

      // Verificar conflitos de sala
      if (!salaHorarios.has(alocacao.salaId)) {
        salaHorarios.set(alocacao.salaId, new Set());
      }
      const salaHors = salaHorarios.get(alocacao.salaId)!;
      
      if (salaHors.has(horarioKey)) {
        conflicts.byType.sala++;
        conflicts.total++;
      }
      salaHors.add(horarioKey);
    }

    return conflicts;
  }

  /**
   * Obtém status de uma execução de algoritmo genético
   */
  async getStatus(turmaId: string): Promise<AllocationStatus> {
    try {
      // Verificar se existe uma execução em andamento
      // Por simplicidade, vamos retornar um status básico
      const alocacoes = await prisma.alocacao.findMany({
        where: { turmaId },
        include: {
          disciplina: true,
          professor: true,
          sala: true,
          horario: true
        }
      });

      return {
        turmaId,
        status: alocacoes.length > 0 ? 'completed' : 'not_started',
        totalAlocacoes: alocacoes.length,
        ultimaExecucao: alocacoes.length > 0 ? alocacoes[0].created_at : null
      };
    } catch (error) {
      console.error('Erro ao obter status:', error);
      return {
        turmaId,
        status: 'error',
        error: 'Erro ao verificar status'
      };
    }
  }

  /**
   * Cancela execução do algoritmo genético
   */
  async cancel(turmaId: string): Promise<{ success: boolean; error?: string }> {
    try {
      // Por simplicidade, vamos apenas retornar sucesso
      // Em uma implementação real, aqui cancelaríamos a execução em andamento
      return { success: true };
    } catch (error) {
      console.error('Erro ao cancelar execução:', error);
      return { 
        success: false, 
        error: 'Erro ao cancelar execução do algoritmo' 
      };
    }
  }

  /**
   * Obtém relatório detalhado de uma alocação
   */
  async getDetailedReport(turmaId: string): Promise<DetailedReport> {
    try {
      const alocacoes = await prisma.alocacao.findMany({
         where: { id_turma: turmaId },
         include: {
           disciplina: true,
           user: true,
           sala: true,
           horario: true,
           turma: true
         }
       });

      if (alocacoes.length === 0) {
        return null;
      }

      // Calcular estatísticas
       const professoresUnicos = new Set(alocacoes.map(a => a.id_user)).size;
       const disciplinasUnicas = new Set(alocacoes.map(a => a.id_disciplina)).size;
       const salasUnicas = new Set(alocacoes.map(a => a.id_sala)).size;

      // Agrupar por dia da semana
      const porDiaSemana = alocacoes.reduce((acc, alocacao) => {
        const dia = alocacao.horario?.dia_semana || 'INDEFINIDO';
        if (!acc[dia]) acc[dia] = [];
        acc[dia].push(alocacao);
        return acc;
      }, {} as Record<string, AlocacaoData[]>);

      return {
        turmaId,
        turma: alocacoes[0].turma,
        estatisticas: {
          totalAlocacoes: alocacoes.length,
          professoresUnicos,
          disciplinasUnicas,
          salasUnicas
        },
        distribuicao: {
          porDiaSemana: Object.keys(porDiaSemana).map(dia => ({
            dia,
            quantidade: porDiaSemana[dia].length
          }))
        },
        alocacoes: alocacoes.map(a => ({
          id: a.id,
          disciplina: a.disciplina?.nome,
          professor: a.user?.nome,
          sala: a.sala?.nome,
          horario: `${a.horario?.dia_semana} - ${a.horario?.codigo}`,
          criadoEm: a.created_at
        }))
      };
    } catch (error) {
      console.error('Erro ao gerar relatório detalhado:', error);
      return null;
    }
  }

  /**
   * Limpa recursos
   */
  public async cleanup(): Promise<void> {
    await prisma.$disconnect();
  }
}

export const allocationService = new AllocationService();