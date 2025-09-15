export interface Gene {
  disciplinaId: string;
  professorId: string;
  salaId: string;
  horarios: string[]; // ["SEGUNDA_M1", "SEGUNDA_M2", "QUARTA_M1"]
}

export interface Cromossomo {
  genes: Gene[];
  fitness: number;
}

export interface GeneticAlgorithmParams {
  populationSize: number;
  generations: number;
  mutationRate: number;
  crossoverRate: number;
  elitismRate: number;
}

export interface DisciplinaInput {
  id: string;
  nome: string;
  cargaHoraria: number;
  tipoSala: 'Lab' | 'Sala';
}

export interface ProfessorInput {
  id: string;
  nome: string;
  carga_horaria_max: number;
  preferencias?: string[];
}

export interface SalaInput {
  id: string;
  nome: string;
  capacidade: number;
  tipo: string;
  computadores: number;
}

export interface HorarioInput {
  id: string;
  codigo: string;
  dia_semana: string;
}

export interface TurmaInput {
  id: string;
  num_alunos: number;
  turno: string; // 'MATUTINO', 'VESPERTINO', 'NOTURNO'
  disciplinas: DisciplinaInput[];
}

export class GeneticAlgorithm {
  private params: GeneticAlgorithmParams;
  private turma: TurmaInput;
  private professores: ProfessorInput[];
  private salas: SalaInput[];
  private horarios: HorarioInput[];
  private population: Cromossomo[];
  
  // Métricas para seleção adaptativa
  private operatorMetrics: {
    crossover: { successes: number; attempts: number; };
    mutation: { successes: number; attempts: number; };
  };
  private adaptiveCrossoverRate: number;
  private adaptiveMutationRate: number;
  private lastBestFitness: number;
  private stagnationCount: number;

  constructor(
    params: GeneticAlgorithmParams,
    turma: TurmaInput,
    professores: ProfessorInput[],
    salas: SalaInput[],
    horarios: HorarioInput[]
  ) {
    this.params = params;
    this.turma = turma;
    this.professores = professores;
    this.salas = salas;
    this.horarios = horarios;
    this.population = [];
    
    // Inicializar métricas adaptativas
    this.operatorMetrics = {
      crossover: { successes: 0, attempts: 0 },
      mutation: { successes: 0, attempts: 0 }
    };
    this.adaptiveCrossoverRate = params.crossoverRate;
    this.adaptiveMutationRate = params.mutationRate;
    this.lastBestFitness = 0;
    this.stagnationCount = 0;
  }

  public async execute(): Promise<Cromossomo> {
    // Inicializar população
    this.initializePopulation();
    
    // Evoluir por N gerações
    for (let generation = 0; generation < this.params.generations; generation++) {
      // Avaliar fitness de todos os cromossomos
      this.evaluatePopulation();
      
      // Verificar se encontrou solução ótima
      const best = this.getBestChromosome();
      if (best.fitness >= 950) { // 95% do score máximo
        console.log(`Solução ótima encontrada na geração ${generation}`);
        return best;
      }
      
      // Adaptar taxas de operadores a cada 10 gerações
      if (generation % 10 === 0 && generation > 0) {
        this.adaptOperatorRates(best.fitness);
      }
      
      // Criar nova geração
      this.evolveGeneration();
      
      // Log do progresso
      if (generation % 50 === 0) {
        console.log(`Geração ${generation}: Melhor fitness = ${best.fitness}`);
      }
      
      this.lastBestFitness = best.fitness;
    }
    
    // Retornar o melhor cromossomo da última geração
    this.evaluatePopulation();
    return this.getBestChromosome();
  }

  private initializePopulation(): void {
    this.population = [];
    
    for (let i = 0; i < this.params.populationSize; i++) {
      let cromossomo = this.createRandomChromosome();
      cromossomo = this.repairChromosome(cromossomo);
      this.population.push(cromossomo);
    }
  }

  private createRandomChromosome(): Cromossomo {
    const genes: Gene[] = [];
    const usedProfessorHorarios = new Map<string, Set<string>>();
    const usedSalaHorarios = new Map<string, Set<string>>();
    
    for (const disciplina of this.turma.disciplinas) {
      // Selecionar professor com base em disponibilidade e preferências
      const professor = this.selectBestProfessor(disciplina, usedProfessorHorarios);
      
      // Selecionar sala compatível com prioridade para capacidade adequada
      const sala = this.selectBestSala(disciplina, usedSalaHorarios);
      
      // Selecionar horários com base no turno da turma e evitar sábados
      const horariosNecessarios = Math.ceil(disciplina.cargaHoraria / 50); // 50min por aula
      const horariosEscolhidos = this.selectOptimalHorarios(
        horariosNecessarios, 
        usedProfessorHorarios.get(professor.id) || new Set(),
        usedSalaHorarios.get(sala.id) || new Set()
      );
      
      // Registrar horários utilizados
      if (!usedProfessorHorarios.has(professor.id)) {
        usedProfessorHorarios.set(professor.id, new Set());
      }
      if (!usedSalaHorarios.has(sala.id)) {
        usedSalaHorarios.set(sala.id, new Set());
      }
      
      horariosEscolhidos.forEach(horario => {
        usedProfessorHorarios.get(professor.id)!.add(horario);
        usedSalaHorarios.get(sala.id)!.add(horario);
      });
      
      genes.push({
        disciplinaId: disciplina.id,
        professorId: professor.id,
        salaId: sala.id,
        horarios: horariosEscolhidos
      });
    }
    
    return {
      genes,
      fitness: 0
    };
  }

  private selectRandomHorarios(quantidade: number): string[] {
    const horariosDisponiveis = [...this.horarios];
    const selecionados: string[] = [];
    
    for (let i = 0; i < quantidade && horariosDisponiveis.length > 0; i++) {
      const index = Math.floor(Math.random() * horariosDisponiveis.length);
      const horario = horariosDisponiveis.splice(index, 1)[0];
      selecionados.push(`${horario.dia_semana}_${horario.codigo}`);
    }
    
    return selecionados;
  }

  /**
   * Seleciona o melhor professor baseado em disponibilidade e preferências
   */
  private selectBestProfessor(
    disciplina: DisciplinaInput,
    usedProfessorHorarios: Map<string, Set<string>>
  ): ProfessorInput {
    // Filtrar professores com carga horária disponível
    const professoresDisponiveis = this.professores.filter(prof => {
      const horariosUsados = usedProfessorHorarios.get(prof.id)?.size || 0;
      return horariosUsados < prof.carga_horaria_max;
    });
    
    if (professoresDisponiveis.length === 0) {
      // Se nenhum professor disponível, retornar aleatório
      return this.professores[Math.floor(Math.random() * this.professores.length)];
    }
    
    // Priorizar professores com menos horários já alocados
    professoresDisponiveis.sort((a, b) => {
      const horariosA = usedProfessorHorarios.get(a.id)?.size || 0;
      const horariosB = usedProfessorHorarios.get(b.id)?.size || 0;
      return horariosA - horariosB;
    });
    
    // Retornar um dos 3 melhores (introduz aleatoriedade)
    const topCandidates = professoresDisponiveis.slice(0, Math.min(3, professoresDisponiveis.length));
    return topCandidates[Math.floor(Math.random() * topCandidates.length)];
  }

  /**
   * Seleciona a melhor sala baseada em compatibilidade e disponibilidade
   */
  private selectBestSala(
    disciplina: DisciplinaInput,
    usedSalaHorarios: Map<string, Set<string>>
  ): SalaInput {
    // Filtrar salas compatíveis
    const salasCompativeis = this.salas.filter(sala => 
      sala.capacidade >= this.turma.num_alunos &&
      (disciplina.tipoSala === 'Lab' ? sala.computadores > 0 : true)
    );
    
    if (salasCompativeis.length === 0) {
      // Se nenhuma sala compatível, retornar qualquer uma
      return this.salas[Math.floor(Math.random() * this.salas.length)];
    }
    
    // Priorizar salas com menos conflitos e capacidade adequada
    salasCompativeis.sort((a, b) => {
      const horariosA = usedSalaHorarios.get(a.id)?.size || 0;
      const horariosB = usedSalaHorarios.get(b.id)?.size || 0;
      
      // Primeiro critério: menos horários ocupados
      if (horariosA !== horariosB) {
        return horariosA - horariosB;
      }
      
      // Segundo critério: capacidade mais próxima do necessário
      const excessoA = a.capacidade - this.turma.num_alunos;
      const excessoB = b.capacidade - this.turma.num_alunos;
      return excessoA - excessoB;
    });
    
    // Retornar uma das 2 melhores salas
    const topCandidates = salasCompativeis.slice(0, Math.min(2, salasCompativeis.length));
    return topCandidates[Math.floor(Math.random() * topCandidates.length)];
  }

  /**
   * Seleciona horários otimizados baseados no turno da turma e evita sábados
   */
  private selectOptimalHorarios(
    quantidade: number,
    professorHorariosUsados: Set<string>,
    salaHorariosUsados: Set<string>
  ): string[] {
    // Filtrar horários disponíveis (sem conflitos)
    const horariosDisponiveis = this.horarios.filter(horario => {
      const horarioKey = `${horario.dia_semana}_${horario.codigo}`;
      return !professorHorariosUsados.has(horarioKey) && 
             !salaHorariosUsados.has(horarioKey);
    });
    
    // Aplicar preferências baseadas no turno da turma
    const horariosPreferidos = this.filterByTurnoPreference(horariosDisponiveis);
    const horariosSemSabado = horariosPreferidos.filter(h => h.dia_semana !== 'SABADO');
    
    // Priorizar horários sem sábado
    const horariosParaUsar = horariosSemSabado.length >= quantidade ? 
                            horariosSemSabado : horariosPreferidos;
    
    const selecionados: string[] = [];
    const horariosRestantes = [...horariosParaUsar];
    
    // Selecionar horários priorizando sequência no mesmo dia
    for (let i = 0; i < quantidade && horariosRestantes.length > 0; i++) {
      let horarioEscolhido;
      
      if (selecionados.length > 0) {
        // Tentar encontrar horário sequencial no mesmo dia
        const ultimoHorario = selecionados[selecionados.length - 1];
        const [ultimoDia, ultimoCodigo] = ultimoHorario.split('_');
        
        horarioEscolhido = this.findSequentialHorario(horariosRestantes, ultimoDia, ultimoCodigo);
      }
      
      if (!horarioEscolhido) {
        // Se não encontrou sequencial, escolher aleatório
        const index = Math.floor(Math.random() * horariosRestantes.length);
        horarioEscolhido = horariosRestantes[index];
      }
      
      const horarioKey = `${horarioEscolhido.dia_semana}_${horarioEscolhido.codigo}`;
      selecionados.push(horarioKey);
      
      // Remover horário selecionado da lista
      const indexToRemove = horariosRestantes.findIndex(h => 
        h.dia_semana === horarioEscolhido.dia_semana && h.codigo === horarioEscolhido.codigo
      );
      if (indexToRemove !== -1) {
        horariosRestantes.splice(indexToRemove, 1);
      }
    }
    
    return selecionados;
  }

  /**
   * Filtra horários baseado na preferência do turno da turma
   */
  private filterByTurnoPreference(horarios: HorarioInput[]): HorarioInput[] {
    const turnoPreferido = this.turma.turno.toUpperCase();
    
    // Mapear turnos para códigos de horário
    const codigosPorTurno = {
      'MATUTINO': ['M1', 'M2', 'M3', 'M4', 'M5', 'M6'],
      'VESPERTINO': ['T1', 'T2', 'T3', 'T4', 'T5', 'T6'],
      'NOTURNO': ['N1', 'N2', 'N3', 'N4']
    };
    
    const codigosPreferidos = codigosPorTurno[turnoPreferido as keyof typeof codigosPorTurno] || [];
    
    // Primeiro, tentar horários do turno preferido
    const horariosPreferidos = horarios.filter(h => 
      codigosPreferidos.includes(h.codigo)
    );
    
    if (horariosPreferidos.length > 0) {
      return horariosPreferidos;
    }
    
    // Se não há horários do turno preferido, usar horários próximos
    if (turnoPreferido === 'MATUTINO') {
      // Para matutino, preferir tarde próxima (T1, T2)
      const horariosProximos = horarios.filter(h => ['T1', 'T2'].includes(h.codigo));
      if (horariosProximos.length > 0) return horariosProximos;
    } else if (turnoPreferido === 'VESPERTINO') {
      // Para vespertino, preferir manhã tardia (M5, M6) ou noite inicial (N1)
      const horariosProximos = horarios.filter(h => ['M5', 'M6', 'N1'].includes(h.codigo));
      if (horariosProximos.length > 0) return horariosProximos;
    }
    
    // Se nada funcionar, retornar todos os horários
    return horarios;
  }

  /**
   * Encontra horário sequencial no mesmo dia
   */
  private findSequentialHorario(
    horarios: HorarioInput[],
    dia: string,
    ultimoCodigo: string
  ): HorarioInput | null {
    // Mapear códigos para números sequenciais
    const sequenciaMap: { [key: string]: number } = {
      'M1': 1, 'M2': 2, 'M3': 3, 'M4': 4, 'M5': 5, 'M6': 6,
      'T1': 1, 'T2': 2, 'T3': 3, 'T4': 4, 'T5': 5, 'T6': 6,
      'N1': 1, 'N2': 2, 'N3': 3, 'N4': 4
    };
    
    const numeroMap: { [key: number]: { [key: string]: string } } = {
      1: { 'M': 'M2', 'T': 'T2', 'N': 'N2' },
      2: { 'M': 'M3', 'T': 'T3', 'N': 'N3' },
      3: { 'M': 'M4', 'T': 'T4', 'N': 'N4' },
      4: { 'M': 'M5', 'T': 'T5' },
      5: { 'M': 'M6', 'T': 'T6' }
    };
    
    const numeroAtual = sequenciaMap[ultimoCodigo];
    const turno = ultimoCodigo.charAt(0);
    
    if (numeroAtual && numeroMap[numeroAtual] && numeroMap[numeroAtual][turno]) {
      const proximoCodigo = numeroMap[numeroAtual][turno];
      
      return horarios.find(h => 
        h.dia_semana === dia && h.codigo === proximoCodigo
      ) || null;
    }
    
    return null;
  }

  private evaluatePopulation(): void {
    for (const cromossomo of this.population) {
      cromossomo.fitness = this.calculateFitness(cromossomo);
    }
  }

  private calculateFitness(cromossomo: Cromossomo): number {
    // Importar ConstraintManager
    const { constraintManager } = require('./constraints');
    
    let totalFitness = 0;
    const context = {
      professores: this.professores,
      salas: this.salas,
      horarios: this.horarios,
      disciplinas: this.turma.disciplinas,
      turma: this.turma,
      allGenes: cromossomo.genes
    };
    
    // Avaliar cada gene individualmente
    for (const gene of cromossomo.genes) {
      let geneFitness = 100; // Score base por gene
      
      // Aplicar penalidades por violações de restrições hard
      const hardPenalty = constraintManager.getHardConstraintPenalty(gene, context);
      geneFitness -= hardPenalty;
      
      // Aplicar bonificações por restrições soft
      const softScore = constraintManager.calculateSoftScore(gene, context);
      geneFitness += softScore;
      
      totalFitness += Math.max(0, geneFitness);
    }
    
    // Bonificações globais do cromossomo
    totalFitness += this.calculateGlobalBonuses(cromossomo);
    
    return Math.max(0, totalFitness);
  }
  
  /**
   * Calcula bonificações globais que se aplicam ao cromossomo inteiro
   */
  private calculateGlobalBonuses(cromossomo: Cromossomo): number {
    let bonus = 0;
    
    // Bonificar ausência de conflitos globais
    const conflicts = this.checkConflicts(cromossomo);
    if (conflicts.professorConflicts === 0) bonus += 50;
    if (conflicts.salaConflicts === 0) bonus += 50;
    
    // Bonificar distribuição equilibrada de disciplinas
    bonus += this.calculateDistributionBonus(cromossomo);
    
    // Bonificar preferência por evitar sábados
    bonus += this.calculateSaturdayAvoidanceBonus(cromossomo);
    
    // Bonificar alinhamento com turno da turma
    bonus += this.calculateTurnoAlignmentBonus(cromossomo);
    
    return bonus;
  }
  
  /**
   * Bonifica distribuição equilibrada de aulas ao longo da semana
   */
  private calculateDistributionBonus(cromossomo: Cromossomo): number {
    const diasUsados = new Set<string>();
    
    for (const gene of cromossomo.genes) {
      for (const horario of gene.horarios) {
        const dia = horario.split('_')[0];
        diasUsados.add(dia);
      }
    }
    
    // Bonificar uso de mais dias (melhor distribuição)
    return diasUsados.size * 10;
  }
  
  /**
   * Bonifica evitar aulas aos sábados
   */
  private calculateSaturdayAvoidanceBonus(cromossomo: Cromossomo): number {
    let saturdayClasses = 0;
    
    for (const gene of cromossomo.genes) {
      for (const horario of gene.horarios) {
        const dia = horario.split('_')[0];
        if (dia === 'SABADO') {
          saturdayClasses++;
        }
      }
    }
    
    // Penalizar aulas aos sábados
    return -saturdayClasses * 30;
  }
  
  /**
   * Bonifica alinhamento com o turno preferido da turma
   */
  private calculateTurnoAlignmentBonus(cromossomo: Cromossomo): number {
    const turnoPreferido = this.turma.turno.toUpperCase();
    let alignedClasses = 0;
    let totalClasses = 0;
    
    const codigosPorTurno = {
      'MATUTINO': ['M1', 'M2', 'M3', 'M4', 'M5', 'M6'],
      'VESPERTINO': ['T1', 'T2', 'T3', 'T4', 'T5', 'T6'],
      'NOTURNO': ['N1', 'N2', 'N3', 'N4']
    };
    
    const codigosPreferidos = codigosPorTurno[turnoPreferido as keyof typeof codigosPorTurno] || [];
    
    for (const gene of cromossomo.genes) {
      for (const horario of gene.horarios) {
        const codigo = horario.split('_')[1];
        totalClasses++;
        
        if (codigosPreferidos.includes(codigo)) {
          alignedClasses++;
        }
      }
    }
    
    // Bonificar proporção de aulas no turno preferido
    const alignmentRatio = totalClasses > 0 ? alignedClasses / totalClasses : 0;
    return alignmentRatio * 100;
  }

  private checkConflicts(cromossomo: Cromossomo): { professorConflicts: number; salaConflicts: number } {
    const professorHorarios = new Map<string, Set<string>>();
    const salaHorarios = new Map<string, Set<string>>();
    let professorConflicts = 0;
    let salaConflicts = 0;
    
    for (const gene of cromossomo.genes) {
      // Verificar conflitos de professor
      if (!professorHorarios.has(gene.professorId)) {
        professorHorarios.set(gene.professorId, new Set());
      }
      const profHorarios = professorHorarios.get(gene.professorId)!;
      
      for (const horario of gene.horarios) {
        if (profHorarios.has(horario)) {
          professorConflicts++;
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
          salaConflicts++;
        }
        salaHors.add(horario);
      }
    }
    
    return { professorConflicts, salaConflicts };
  }

  private checkCapacityViolations(cromossomo: Cromossomo): number {
    let violations = 0;
    
    for (const gene of cromossomo.genes) {
      const sala = this.salas.find(s => s.id === gene.salaId);
      if (sala && sala.capacidade < this.turma.num_alunos) {
        violations++;
      }
    }
    
    return violations;
  }

  private checkDistribution(cromossomo: Cromossomo): number {
    const diasUtilizados = new Set<string>();
    
    for (const gene of cromossomo.genes) {
      for (const horario of gene.horarios) {
        const dia = horario.split('_')[0];
        diasUtilizados.add(dia);
      }
    }
    
    return diasUtilizados.size; // Mais dias = melhor distribuição
  }

  private checkPreferences(cromossomo: Cromossomo): number {
    let score = 0;
    
    for (const gene of cromossomo.genes) {
      const professor = this.professores.find(p => p.id === gene.professorId);
      if (professor?.preferencias) {
        for (const horario of gene.horarios) {
          if (professor.preferencias.includes(horario)) {
            score++;
          }
        }
      }
    }
    
    return score;
  }

  private evolveGeneration(): void {
    const newPopulation: Cromossomo[] = [];
    
    // Elitismo - manter os melhores
    const eliteCount = Math.floor(this.params.populationSize * this.params.elitismRate);
    const sortedPopulation = [...this.population].sort((a, b) => b.fitness - a.fitness);
    newPopulation.push(...sortedPopulation.slice(0, eliteCount));
    
    // Gerar resto da população através de crossover e mutação adaptivos
    while (newPopulation.length < this.params.populationSize) {
      const parent1 = this.selectParent();
      const parent2 = this.selectParent();
      
      let offspring = this.adaptiveCrossover(parent1, parent2);
      offspring = this.adaptiveMutate(offspring);
      
      newPopulation.push(offspring);
    }
    
    this.population = newPopulation;
  }

  private selectParent(): Cromossomo {
    // Seleção por torneio
    const tournamentSize = 3;
    let best = this.population[Math.floor(Math.random() * this.population.length)];
    
    for (let i = 1; i < tournamentSize; i++) {
      const candidate = this.population[Math.floor(Math.random() * this.population.length)];
      if (candidate.fitness > best.fitness) {
        best = candidate;
      }
    }
    
    return best;
  }

  private crossover(parent1: Cromossomo, parent2: Cromossomo): Cromossomo {
    if (Math.random() > this.params.crossoverRate) {
      return { ...parent1, fitness: 0 };
    }
    
    const genes: Gene[] = [];
    const crossoverPoint = Math.floor(Math.random() * parent1.genes.length);
    
    for (let i = 0; i < parent1.genes.length; i++) {
      if (i < crossoverPoint) {
        genes.push({ ...parent1.genes[i] });
      } else {
        genes.push({ ...parent2.genes[i] });
      }
    }
    
    return { genes, fitness: 0 };
  }

  private mutate(cromossomo: Cromossomo): Cromossomo {
    const mutatedGenes = cromossomo.genes.map(gene => {
      if (Math.random() < this.params.mutationRate) {
        // Mutar professor
        if (Math.random() < 0.33) {
          const newProfessor = this.professores[Math.floor(Math.random() * this.professores.length)];
          return { ...gene, professorId: newProfessor.id };
        }
        // Mutar sala
        else if (Math.random() < 0.66) {
          const disciplina = this.turma.disciplinas.find(d => d.id === gene.disciplinaId)!;
          const salasCompativeis = this.salas.filter(sala => 
            sala.capacidade >= this.turma.num_alunos &&
            (disciplina.tipoSala === 'Lab' ? sala.computadores > 0 : true)
          );
          if (salasCompativeis.length > 0) {
            const newSala = salasCompativeis[Math.floor(Math.random() * salasCompativeis.length)];
            return { ...gene, salaId: newSala.id };
          }
        }
        // Mutar horários
        else {
          const newHorarios = this.selectRandomHorarios(gene.horarios.length);
          return { ...gene, horarios: newHorarios };
        }
      }
      return gene;
    });
    
    return { genes: mutatedGenes, fitness: 0 };
  }

  private getBestChromosome(): Cromossomo {
    return this.population.reduce((best, current) => 
      current.fitness > best.fitness ? current : best
    );
  }
  
  /**
   * Adapta as taxas de crossover e mutação baseado na performance
   */
  private adaptOperatorRates(currentBestFitness: number): void {
    // Verificar se houve melhoria
    const improvement = currentBestFitness - this.lastBestFitness;
    
    if (improvement <= 0) {
      this.stagnationCount++;
    } else {
      this.stagnationCount = 0;
    }
    
    // Calcular taxas de sucesso dos operadores
    const crossoverSuccessRate = this.operatorMetrics.crossover.attempts > 0 
      ? this.operatorMetrics.crossover.successes / this.operatorMetrics.crossover.attempts 
      : 0.5;
    
    const mutationSuccessRate = this.operatorMetrics.mutation.attempts > 0 
      ? this.operatorMetrics.mutation.successes / this.operatorMetrics.mutation.attempts 
      : 0.5;
    
    // Ajustar taxas baseado na performance e estagnação
    if (this.stagnationCount > 5) {
      // Aumentar exploração quando estagnado
      this.adaptiveMutationRate = Math.min(0.3, this.adaptiveMutationRate * 1.2);
      this.adaptiveCrossoverRate = Math.max(0.3, this.adaptiveCrossoverRate * 0.9);
    } else {
      // Ajustar baseado nas taxas de sucesso
      if (crossoverSuccessRate > 0.6) {
        this.adaptiveCrossoverRate = Math.min(0.9, this.adaptiveCrossoverRate * 1.1);
      } else if (crossoverSuccessRate < 0.3) {
        this.adaptiveCrossoverRate = Math.max(0.3, this.adaptiveCrossoverRate * 0.9);
      }
      
      if (mutationSuccessRate > 0.6) {
        this.adaptiveMutationRate = Math.min(0.3, this.adaptiveMutationRate * 1.1);
      } else if (mutationSuccessRate < 0.3) {
        this.adaptiveMutationRate = Math.max(0.05, this.adaptiveMutationRate * 0.9);
      }
    }
    
    // Reset das métricas
    this.operatorMetrics.crossover = { successes: 0, attempts: 0 };
    this.operatorMetrics.mutation = { successes: 0, attempts: 0 };
  }
  
  /**
   * Crossover adaptativo que monitora performance
   */
  private adaptiveCrossover(parent1: Cromossomo, parent2: Cromossomo): Cromossomo {
    this.operatorMetrics.crossover.attempts++;
    
    if (Math.random() > this.adaptiveCrossoverRate) {
      return { ...parent1, fitness: 0 };
    }
    
    const genes: Gene[] = [];
    const crossoverPoint = Math.floor(Math.random() * parent1.genes.length);
    
    for (let i = 0; i < parent1.genes.length; i++) {
      if (i < crossoverPoint) {
        genes.push({ ...parent1.genes[i] });
      } else {
        genes.push({ ...parent2.genes[i] });
      }
    }
    
    const offspring = { genes, fitness: 0 };
    
    // Avaliar se o crossover foi bem-sucedido (será verificado após avaliação)
    // Por simplicidade, consideramos sucesso se o offspring não é idêntico aos pais
    const isDifferentFromParents = !this.areChromosomesEqual(offspring, parent1) && 
                                   !this.areChromosomesEqual(offspring, parent2);
    
    if (isDifferentFromParents) {
      this.operatorMetrics.crossover.successes++;
    }
    
    return offspring;
  }
  
  /**
   * Mutação adaptativa que monitora performance
   */
  private adaptiveMutate(cromossomo: Cromossomo): Cromossomo {
    this.operatorMetrics.mutation.attempts++;
    
    const originalGenes = cromossomo.genes.map(g => ({ ...g }));
    let mutationOccurred = false;
    
    const mutatedGenes = cromossomo.genes.map(gene => {
      if (Math.random() < this.adaptiveMutationRate) {
        mutationOccurred = true;
        
        // Mutar professor
        if (Math.random() < 0.33) {
          const newProfessor = this.professores[Math.floor(Math.random() * this.professores.length)];
          return { ...gene, professorId: newProfessor.id };
        }
        // Mutar sala
        else if (Math.random() < 0.66) {
          const disciplina = this.turma.disciplinas.find(d => d.id === gene.disciplinaId)!;
          const salasCompativeis = this.salas.filter(sala => 
            sala.capacidade >= this.turma.num_alunos &&
            (disciplina.tipoSala === 'Lab' ? sala.computadores > 0 : true)
          );
          if (salasCompativeis.length > 0) {
            const newSala = salasCompativeis[Math.floor(Math.random() * salasCompativeis.length)];
            return { ...gene, salaId: newSala.id };
          }
        }
        // Mutar horários
        else {
          const newHorarios = this.selectRandomHorarios(gene.horarios.length);
          return { ...gene, horarios: newHorarios };
        }
      }
      return gene;
    });
    
    if (mutationOccurred) {
      this.operatorMetrics.mutation.successes++;
    }
    
    return { genes: mutatedGenes, fitness: 0 };
  }
  
  /**
   * Verifica se dois cromossomos são iguais
   */
  private areChromosomesEqual(chromo1: Cromossomo, chromo2: Cromossomo): boolean {
    if (chromo1.genes.length !== chromo2.genes.length) return false;
    
    for (let i = 0; i < chromo1.genes.length; i++) {
      const gene1 = chromo1.genes[i];
      const gene2 = chromo2.genes[i];
      
      if (gene1.disciplinaId !== gene2.disciplinaId ||
          gene1.professorId !== gene2.professorId ||
          gene1.salaId !== gene2.salaId ||
          gene1.horarios.length !== gene2.horarios.length ||
          !gene1.horarios.every((h, idx) => h === gene2.horarios[idx])) {
        return false;
      }
    }
    
    return true;
   }
   
   /**
    * Operador de reparo que corrige violações básicas em cromossomos
    */
   private repairChromosome(cromossomo: Cromossomo): Cromossomo {
     const repairedGenes = cromossomo.genes.map(gene => {
       let repairedGene = { ...gene };
       
       // Reparar conflitos de horário do professor
       repairedGene = this.repairProfessorConflicts(repairedGene, cromossomo.genes);
       
       // Reparar conflitos de sala
       repairedGene = this.repairRoomConflicts(repairedGene, cromossomo.genes);
       
       // Reparar violações de capacidade
       repairedGene = this.repairCapacityViolations(repairedGene);
       
       return repairedGene;
     });
     
     return { genes: repairedGenes, fitness: 0 };
   }
   
   /**
    * Repara conflitos de horário do professor
    */
   private repairProfessorConflicts(gene: Gene, allGenes: Gene[]): Gene {
     const conflictingGenes = allGenes.filter(g => 
       g !== gene && 
       g.professorId === gene.professorId &&
       g.horarios.some(h => gene.horarios.includes(h))
     );
     
     if (conflictingGenes.length === 0) return gene;
     
     // Encontrar horários alternativos para este gene
     const usedHorarios = new Set<string>();
     allGenes.forEach(g => {
       if (g !== gene && g.professorId === gene.professorId) {
         g.horarios.forEach(h => usedHorarios.add(h));
       }
     });
     
     const availableHorarios = this.horarios
       .map(h => `${h.dia_semana}_${h.codigo}`)
       .filter(h => !usedHorarios.has(h));
     
     if (availableHorarios.length >= gene.horarios.length) {
       const newHorarios = this.selectOptimalHorarios(
         gene.horarios.length,
         usedHorarios,
         new Set()
       );
       
       if (newHorarios.length === gene.horarios.length) {
         return { ...gene, horarios: newHorarios };
       }
     }
     
     return gene;
   }
   
   /**
    * Repara conflitos de sala
    */
   private repairRoomConflicts(gene: Gene, allGenes: Gene[]): Gene {
     const conflictingGenes = allGenes.filter(g => 
       g !== gene && 
       g.salaId === gene.salaId &&
       g.horarios.some(h => gene.horarios.includes(h))
     );
     
     if (conflictingGenes.length === 0) return gene;
     
     // Encontrar sala alternativa
     const disciplina = this.turma.disciplinas.find(d => d.id === gene.disciplinaId)!;
     const salasCompativeis = this.salas.filter(sala => 
       sala.id !== gene.salaId &&
       sala.capacidade >= this.turma.numAlunos &&
       (disciplina.tipoSala === 'Lab' ? sala.computadores > 0 : true)
     );
     
     // Verificar se alguma sala compatível está disponível nos horários necessários
     for (const sala of salasCompativeis) {
       const salaConflicts = allGenes.filter(g => 
         g.salaId === sala.id &&
         g.horarios.some(h => gene.horarios.includes(h))
       );
       
       if (salaConflicts.length === 0) {
         return { ...gene, salaId: sala.id };
       }
     }
     
     return gene;
   }
   
   /**
    * Repara violações de capacidade de sala
    */
   private repairCapacityViolations(gene: Gene): Gene {
     const sala = this.salas.find(s => s.id === gene.salaId);
     if (!sala || sala.capacidade >= this.turma.num_alunos) {
       return gene;
     }
     
     // Encontrar sala com capacidade adequada
     const disciplina = this.turma.disciplinas.find(d => d.id === gene.disciplinaId)!;
     const salasAdequadas = this.salas.filter(s => 
       s.capacidade >= this.turma.num_alunos &&
       (disciplina.tipoSala === 'Lab' ? s.computadores > 0 : true)
     );
     
     if (salasAdequadas.length > 0) {
       // Escolher a sala com menor capacidade que ainda atende aos requisitos
       const melhorSala = salasAdequadas.reduce((best, current) => 
         current.capacidade < best.capacidade ? current : best
       );
       
       return { ...gene, salaId: melhorSala.id };
     }
     
     return gene;
   }
}