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
  minGenerations: number;
  generations: number;
  patience: number;
  fitnessTarget: number;
  mutationRate: number;
  crossoverRate: number;
  elitismRate: number;
}

export interface DisciplinaInput {
  id: string;
  nome: string;
  cargaHoraria: number;
  tipoSala: "Lab" | "Sala";
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
    crossover: { successes: number; attempts: number };
    mutation: { successes: number; attempts: number };
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
      mutation: { successes: 0, attempts: 0 },
    };
    this.adaptiveCrossoverRate = params.crossoverRate;
    this.adaptiveMutationRate = params.mutationRate;
    this.lastBestFitness = 0;
    this.stagnationCount = 0;
  }

  public async execute(): Promise<Cromossomo> {
    this.initializePopulation();

    const maxGenerations = this.params.generations;
    const minGenerations = this.params.minGenerations ?? 60;
    const patience = this.params.patience ?? 50;
    const fitnessTarget = this.params.fitnessTarget ?? 1300;

    let best = null as unknown as Cromossomo;
    let lastBestFitness = -Infinity;
    let stagnationCount = 0;

    for (let gen = 0; gen < maxGenerations; gen++) {
      this.evaluatePopulation();
      const currentBest = this.getBestChromosome();

      // Atualiza best global
      if (!best || currentBest.fitness > best.fitness) {
        best = currentBest;
      }

      // Estagnação
      if (currentBest.fitness <= lastBestFitness) {
        stagnationCount++;
      } else {
        stagnationCount = 0;
      }

      lastBestFitness = currentBest.fitness;

      // ----- CRITÉRIO DE PARADA INTELIGENTE -----
      const reachedTarget = best.fitness >= fitnessTarget;
      const passedMinimum = gen >= minGenerations;
      const stagnated = stagnationCount >= patience;

      if (reachedTarget && passedMinimum && stagnated) {
        console.log(`Pare por critério inteligente na geração ${gen}`);
        break;
      }

      // Log a cada 50 gerações
      if (gen % 50 === 0) {
        console.log(`Geração ${gen}: Best Fitness = ${best.fitness}`);
      }

      // Evolução da população
      if (gen < maxGenerations - 1) {
        this.adaptOperatorRates(currentBest.fitness);
        this.evolveGeneration();
      }
    }

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
      const professor = this.selectBestProfessor(
        disciplina,
        usedProfessorHorarios
      );

      // Selecionar sala compatível com prioridade para capacidade adequada
      const sala = this.selectBestSala(disciplina, usedSalaHorarios);

      // Calcular distribuição de aulas baseada na carga horária
      const distribuicaoAulas = this.calculateClassDistribution(
        disciplina.cargaHoraria
      );
      const horariosEscolhidos = this.selectOptimalHorariosWithDistribution(
        distribuicaoAulas,
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

      horariosEscolhidos.forEach((horario) => {
        usedProfessorHorarios.get(professor.id)!.add(horario);
        usedSalaHorarios.get(sala.id)!.add(horario);
      });

      genes.push({
        disciplinaId: disciplina.id,
        professorId: professor.id,
        salaId: sala.id,
        horarios: horariosEscolhidos,
      });
    }

    return {
      genes,
      fitness: 0,
    };
  }

  /**
   * Calcula a distribuição ideal de aulas baseada na carga horária
   */
  private calculateClassDistribution(cargaHoraria: number): {
    aulasSemanais: number;
    preferirConsecutivas: boolean;
    totalAulas: number;
    distribuicaoTipo:
      | "2-mesmo-dia"
      | "3-mesmo-dia"
      | "4-dois-dias"
      | "6-dois-dias"
      | "padrao";
  } {
    // Converter carga horária para total de aulas (assumindo 50min por aula)
    const totalAulas = Math.ceil(cargaHoraria * 1.2);

    if (cargaHoraria === 90) {
      // 90h: 6 aulas por semana, 3 em um dia + 3 em outro dia
      return {
        aulasSemanais: 6,
        preferirConsecutivas: true,
        totalAulas,
        distribuicaoTipo: "6-dois-dias",
      };
    } else if (cargaHoraria === 60) {
      // 60h: 4 aulas por semana em dois dias diferentes, 2+2
      return {
        aulasSemanais: 4,
        preferirConsecutivas: false,
        totalAulas,
        distribuicaoTipo: "4-dois-dias",
      };
    } else if (cargaHoraria === 45) {
      // 45h: 3 aulas por semana no mesmo dia
      return {
        aulasSemanais: 3,
        preferirConsecutivas: true,
        totalAulas,
        distribuicaoTipo: "3-mesmo-dia",
      };
    } else if (cargaHoraria === 30) {
      // 30h: 2 aulas por semana no mesmo dia
      return {
        aulasSemanais: 2,
        preferirConsecutivas: true,
        totalAulas,
        distribuicaoTipo: "2-mesmo-dia",
      };
    } else {
      // Outras cargas horárias: usar distribuição padrão
      return {
        aulasSemanais: Math.min(4, Math.ceil(cargaHoraria / 15)),
        preferirConsecutivas: false,
        totalAulas,
        distribuicaoTipo: "padrao",
      };
    }
  }

  /**
   * Seleciona horários otimizados baseados na distribuição de aulas
   */
  private selectOptimalHorariosWithDistribution(
    distribuicao: {
      aulasSemanais: number;
      preferirConsecutivas: boolean;
      totalAulas: number;
      distribuicaoTipo: string;
    },
    professorHorariosUsados: Set<string>,
    salaHorariosUsados: Set<string>
  ): string[] {
    const horariosDisponiveis = this.filterByTurnoPreference(
      this.horarios
    ).filter(
      (h) =>
        !professorHorariosUsados.has(`${h.dia_semana}_${h.codigo}`) &&
        !salaHorariosUsados.has(`${h.dia_semana}_${h.codigo}`)
    );

    if (horariosDisponiveis.length === 0) {
      return this.selectRandomHorarios(distribuicao.aulasSemanais);
    }

    // Implementar regras específicas baseadas no tipo de distribuição
    switch (distribuicao.distribuicaoTipo) {
      case "2-mesmo-dia": {
        // 30h: 2 aulas consecutivas no mesmo dia
        const horarios2Consecutivos = this.findConsecutiveHorarios(
          horariosDisponiveis,
          2
        );
        if (horarios2Consecutivos.length === 2) {
          return horarios2Consecutivos;
        }
        // Fallback: tentar qualquer 2 horários no mesmo dia
        const sameDayHorarios = this.findSameDayHorarios(
          horariosDisponiveis,
          2
        );
        if (sameDayHorarios.length === 2) {
          return sameDayHorarios;
        }
        break;
      }

      case "3-mesmo-dia": {
        // 45h: 3 aulas consecutivas no mesmo dia
        const horarios3Consecutivos = this.findConsecutiveHorarios(
          horariosDisponiveis,
          3
        );
        if (horarios3Consecutivos.length === 3) {
          return horarios3Consecutivos;
        }
        // Fallback: tentar qualquer 3 horários no mesmo dia
        const sameDayHorarios = this.findSameDayHorarios(
          horariosDisponiveis,
          3
        );
        if (sameDayHorarios.length === 3) {
          return sameDayHorarios;
        }
        break;
      }

      case "4-dois-dias": {
        // 60h: 4 aulas em dois dias diferentes (2+2)
        const distribuicao2x2 =
          this.findTwoByTwoDistribution(horariosDisponiveis);
        if (distribuicao2x2.length === 4) {
          return distribuicao2x2;
        }
        // Fallback: distribuir em dias diferentes
        const distributedHorarios = this.findDistributedHorarios(
          horariosDisponiveis,
          4,
          2
        );
        if (distributedHorarios.length === 4) {
          return distributedHorarios;
        }
        break;
      }

      case "6-dois-dias": {
        // 90h: 6 aulas em dois dias diferentes (3+3)
        const distribuicao3x3 =
          this.findThreeByThreeDistribution(horariosDisponiveis);
        if (distribuicao3x3.length === 6) {
          return distribuicao3x3;
        }
        // Fallback: distribuir em dias diferentes
        const distributedHorarios = this.findDistributedHorarios(
          horariosDisponiveis,
          6,
          2
        );
        if (distributedHorarios.length === 6) {
          return distributedHorarios;
        }
        break;
      }
    }

    // Fallback: usar distribuição equilibrada para evitar concentração nos primeiros horários
    const horariosDistribuidos = this.selectDistributedHorarios(
      horariosDisponiveis,
      distribuicao.aulasSemanais
    );
    if (horariosDistribuidos.length === distribuicao.aulasSemanais) {
      return horariosDistribuidos;
    }

    // Último fallback: seleção aleatória respeitando a quantidade de aulas semanais
    return this.selectRandomHorarios(distribuicao.aulasSemanais);
  }

  /**
   * Encontra horários consecutivos no mesmo dia
   */
  private findConsecutiveHorarios(
    horarios: HorarioInput[],
    quantidade: number
  ): string[] {
    const diasDisponiveis = [...new Set(horarios.map((h) => h.dia_semana))];

    for (const dia of diasDisponiveis) {
      const horariosDoDia = horarios
        .filter((h) => h.dia_semana === dia)
        .sort((a, b) => a.codigo.localeCompare(b.codigo));

      if (horariosDoDia.length >= quantidade) {
        // Verificar se existem horários consecutivos
        for (let i = 0; i <= horariosDoDia.length - quantidade; i++) {
          const consecutivos = horariosDoDia.slice(i, i + quantidade);
          const saoConsecutivos = this.areHorariosConsecutive(consecutivos);

          if (saoConsecutivos) {
            return consecutivos.map((h) => `${h.dia_semana}_${h.codigo}`);
          }
        }
      }
    }

    return [];
  }

  /**
   * Encontra horários no mesmo dia (não necessariamente consecutivos)
   */
  private findSameDayHorarios(
    horarios: HorarioInput[],
    quantidade: number
  ): string[] {
    const diasDisponiveis = [...new Set(horarios.map((h) => h.dia_semana))];

    for (const dia of diasDisponiveis) {
      const horariosDoDia = horarios.filter((h) => h.dia_semana === dia);

      if (horariosDoDia.length >= quantidade) {
        // Ordenar horários por código
        const horariosOrdenados = horariosDoDia.sort((a, b) =>
          a.codigo.localeCompare(b.codigo)
        );

        // Tentar encontrar horários consecutivos primeiro
        for (let i = 0; i <= horariosOrdenados.length - quantidade; i++) {
          const consecutivos = horariosOrdenados.slice(i, i + quantidade);
          if (this.areHorariosConsecutive(consecutivos)) {
            return consecutivos.map((h) => `${h.dia_semana}_${h.codigo}`);
          }
        }

        // Se não encontrou consecutivos, distribuir melhor os horários
        // Evitar sempre pegar os primeiros horários (M1, M2, M3...)
        const totalHorarios = horariosOrdenados.length;
        const intervalo = Math.max(1, Math.floor(totalHorarios / quantidade));
        const selecionados: HorarioInput[] = [];

        for (let i = 0; i < quantidade && i * intervalo < totalHorarios; i++) {
          const index = Math.min(i * intervalo, totalHorarios - 1);
          const selecionado = horariosOrdenados[index];
          if (selecionado) {
            selecionados.push(selecionado);
          }
        }

        // Se não conseguiu selecionar todos com intervalo, completar com os restantes
        while (
          selecionados.length < quantidade &&
          selecionados.length < totalHorarios
        ) {
          for (const horario of horariosOrdenados) {
            if (!selecionados.includes(horario)) {
              selecionados.push(horario);
              if (selecionados.length >= quantidade) break;
            }
          }
        }

        return selecionados.map((h) => `${h.dia_semana}_${h.codigo}`);
      }
    }

    return [];
  }

  /**
   * Distribui horários em dias diferentes
   */
  private findDistributedHorarios(
    horarios: HorarioInput[],
    totalAulas: number,
    diasDesejados: number
  ): string[] {
    const diasDisponiveis = [...new Set(horarios.map((h) => h.dia_semana))];

    if (diasDisponiveis.length < diasDesejados) {
      return [];
    }

    const aulasPorDia = Math.ceil(totalAulas / diasDesejados);
    const resultado: string[] = [];

    for (let i = 0; i < diasDesejados && resultado.length < totalAulas; i++) {
      const dia = diasDisponiveis[i];
      const horariosDoDia = horarios.filter((h) => h.dia_semana === dia);

      const aulasParaEsseDia = Math.min(
        aulasPorDia,
        totalAulas - resultado.length
      );
      const horariosEscolhidos = horariosDoDia
        .sort((a, b) => a.codigo.localeCompare(b.codigo))
        .slice(0, aulasParaEsseDia);

      resultado.push(
        ...horariosEscolhidos.map((h) => `${h.dia_semana}_${h.codigo}`)
      );
    }

    return resultado;
  }

  /**
   * Encontra distribuição 2+2 (2 aulas em um dia + 2 em outro)
   */
  private findTwoByTwoDistribution(horarios: HorarioInput[]): string[] {
    const diasDisponiveis = [...new Set(horarios.map((h) => h.dia_semana))];

    for (let i = 0; i < diasDisponiveis.length; i++) {
      for (let j = i + 1; j < diasDisponiveis.length; j++) {
        const dia1 = diasDisponiveis[i];
        const dia2 = diasDisponiveis[j];

        const horariosDia1 = horarios.filter((h) => h.dia_semana === dia1);
        const horariosDia2 = horarios.filter((h) => h.dia_semana === dia2);

        if (horariosDia1.length >= 2 && horariosDia2.length >= 2) {
          // Tentar encontrar 2 horários consecutivos em cada dia
          const consecutivosDia1 = this.findConsecutiveHorarios(
            horariosDia1,
            2
          );
          const consecutivosDia2 = this.findConsecutiveHorarios(
            horariosDia2,
            2
          );

          if (consecutivosDia1.length === 2 && consecutivosDia2.length === 2) {
            return [...consecutivosDia1, ...consecutivosDia2];
          }
        }
      }
    }

    return [];
  }

  /**
   * Encontra distribuição 3+3 (3 aulas em um dia + 3 em outro) para disciplinas de 90h
   */
  private findThreeByThreeDistribution(horarios: HorarioInput[]): string[] {
    const diasDisponiveis = [...new Set(horarios.map((h) => h.dia_semana))];

    for (let i = 0; i < diasDisponiveis.length; i++) {
      for (let j = i + 1; j < diasDisponiveis.length; j++) {
        const dia1 = diasDisponiveis[i];
        const dia2 = diasDisponiveis[j];

        const horariosDia1 = horarios.filter((h) => h.dia_semana === dia1);
        const horariosDia2 = horarios.filter((h) => h.dia_semana === dia2);

        if (horariosDia1.length >= 3 && horariosDia2.length >= 3) {
          // Tentar encontrar 3 horários consecutivos em cada dia
          const consecutivosDia1 = this.findConsecutiveHorarios(
            horariosDia1,
            3
          );
          const consecutivosDia2 = this.findConsecutiveHorarios(
            horariosDia2,
            3
          );

          if (consecutivosDia1.length === 3 && consecutivosDia2.length === 3) {
            return [...consecutivosDia1, ...consecutivosDia2];
          }
        }
      }
    }

    return [];
  }

  /**
   * Verifica se os horários são consecutivos
   */
  private areHorariosConsecutive(horarios: HorarioInput[]): boolean {
    if (horarios.length < 2) return true;

    const codigos = horarios.map((h) => h.codigo).sort();

    for (let i = 1; i < codigos.length; i++) {
      const atual = this.getHorarioNumber(codigos[i]);
      const anterior = this.getHorarioNumber(codigos[i - 1]);

      if (atual !== anterior + 1) {
        return false;
      }
    }

    return true;
  }

  /**
   * Extrai o número do código do horário (M1 -> 1, T2 -> 2, etc.)
   */
  private getHorarioNumber(codigo: string): number {
    const match = codigo.match(/\d+/);
    return match ? parseInt(match[0]) : 0;
  }

  private selectRandomHorarios(quantidade: number): string[] {
    const horariosDisponiveis = [...this.horarios];
    const selecionados: string[] = [];

    // Aplicar filtro de turno para evitar horários inadequados
    const horariosFiltrados = this.filterByTurnoPreference(horariosDisponiveis);
    const horariosParaUsar =
      horariosFiltrados.length >= quantidade
        ? horariosFiltrados
        : horariosDisponiveis;

    for (let i = 0; i < quantidade && horariosParaUsar.length > 0; i++) {
      const index = Math.floor(Math.random() * horariosParaUsar.length);
      const horario = horariosParaUsar.splice(index, 1)[0];
      selecionados.push(`${horario.dia_semana}_${horario.codigo}`);
    }

    return selecionados;
  }

  /**
   * Seleciona horários com distribuição equilibrada para evitar concentração nos primeiros horários
   */
  private selectDistributedHorarios(
    horariosDisponiveis: HorarioInput[],
    quantidade: number
  ): string[] {
    if (horariosDisponiveis.length === 0 || quantidade === 0) {
      return [];
    }

    // Agrupar horários por dia
    const horariosPorDia = new Map<string, HorarioInput[]>();
    for (const horario of horariosDisponiveis) {
      if (!horariosPorDia.has(horario.dia_semana)) {
        horariosPorDia.set(horario.dia_semana, []);
      }
      horariosPorDia.get(horario.dia_semana)!.push(horario);
    }

    const selecionados: string[] = [];
    const dias = Array.from(horariosPorDia.keys());

    // Distribuir horários entre diferentes dias quando possível
    for (let i = 0; i < quantidade && selecionados.length < quantidade; i++) {
      const diaIndex = i % dias.length;
      const dia = dias[diaIndex];
      const horariosNoDia = horariosPorDia.get(dia) || [];

      if (horariosNoDia.length > 0) {
        // Selecionar horário do meio do dia para evitar sempre os primeiros
        const middleIndex = Math.floor(horariosNoDia.length / 2);
        const horarioEscolhido = horariosNoDia[middleIndex];

        const horarioKey = `${horarioEscolhido.dia_semana}_${horarioEscolhido.codigo}`;
        if (!selecionados.includes(horarioKey)) {
          selecionados.push(horarioKey);
          // Remover o horário selecionado para não repetir
          horariosNoDia.splice(middleIndex, 1);
        }
      }
    }

    // Se ainda precisar de mais horários, completar aleatoriamente
    while (selecionados.length < quantidade) {
      const horariosRestantes = horariosDisponiveis.filter((h) => {
        const key = `${h.dia_semana}_${h.codigo}`;
        return !selecionados.includes(key);
      });

      if (horariosRestantes.length === 0) break;

      const index = Math.floor(Math.random() * horariosRestantes.length);
      const horario = horariosRestantes[index];
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
    // Primeiro, filtrar professores que podem lecionar esta disciplina
    // TODO: Implementar busca na tabela ProfessorDisciplina
    // Por enquanto, usar lógica baseada em especialização
    const professoresHabilitados = this.professores.filter((prof) => {
      // Lógica temporária baseada em nomes conhecidos
      if (
        disciplina.nome.toLowerCase().includes("banco") ||
        disciplina.nome.toLowerCase().includes("bd")
      ) {
        return (
          prof.nome.toLowerCase().includes("carla") ||
          prof.nome.toLowerCase().includes("edson")
        );
      }
      if (
        disciplina.nome.toLowerCase().includes("física") ||
        disciplina.nome.toLowerCase().includes("fis")
      ) {
        return prof.nome.toLowerCase().includes("leonardo");
      }
      if (
        disciplina.nome.toLowerCase().includes("web") ||
        disciplina.nome.toLowerCase().includes("mobile")
      ) {
        return prof.nome.toLowerCase().includes("taniro");
      }
      if (
        disciplina.nome.toLowerCase().includes("interação") ||
        disciplina.nome.toLowerCase().includes("ihc")
      ) {
        return prof.nome.toLowerCase().includes("tasia");
      }
      if (disciplina.nome.toLowerCase().includes("redes")) {
        return prof.nome.toLowerCase().includes("antonino");
      }
      // Se não encontrar especialização específica, permitir qualquer professor
      return true;
    });

    // Filtrar professores habilitados com carga horária disponível
    const professoresDisponiveis = professoresHabilitados.filter((prof) => {
      const horariosUsados = usedProfessorHorarios.get(prof.id)?.size || 0;
      return horariosUsados < prof.carga_horaria_max;
    });

    if (professoresDisponiveis.length === 0) {
      // Se nenhum professor habilitado disponível, usar qualquer professor disponível
      const todosDisponiveis = this.professores.filter((prof) => {
        const horariosUsados = usedProfessorHorarios.get(prof.id)?.size || 0;
        return horariosUsados < prof.carga_horaria_max;
      });

      if (todosDisponiveis.length === 0) {
        return this.professores[
          Math.floor(Math.random() * this.professores.length)
        ];
      }

      return todosDisponiveis[
        Math.floor(Math.random() * todosDisponiveis.length)
      ];
    }

    // Priorizar professores com menos horários já alocados
    professoresDisponiveis.sort((a, b) => {
      const horariosA = usedProfessorHorarios.get(a.id)?.size || 0;
      const horariosB = usedProfessorHorarios.get(b.id)?.size || 0;
      return horariosA - horariosB;
    });

    // Retornar um dos 3 melhores (introduz aleatoriedade)
    const topCandidates = professoresDisponiveis.slice(
      0,
      Math.min(3, professoresDisponiveis.length)
    );
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
    const salasCompativeis = this.salas.filter(
      (sala) =>
        sala.capacidade >= this.turma.num_alunos &&
        (disciplina.tipoSala === "Lab" ? sala.computadores > 0 : true)
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
    const topCandidates = salasCompativeis.slice(
      0,
      Math.min(2, salasCompativeis.length)
    );
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
    const horariosDisponiveis = this.horarios.filter((horario) => {
      const horarioKey = `${horario.dia_semana}_${horario.codigo}`;
      return (
        !professorHorariosUsados.has(horarioKey) &&
        !salaHorariosUsados.has(horarioKey)
      );
    });

    // Aplicar preferências baseadas no turno da turma
    const horariosPreferidos =
      this.filterByTurnoPreference(horariosDisponiveis);
    const horariosSemSabado = horariosPreferidos.filter(
      (h) => h.dia_semana !== "SABADO"
    );

    // Priorizar horários sem sábado
    const horariosParaUsar =
      horariosSemSabado.length >= quantidade
        ? horariosSemSabado
        : horariosPreferidos;

    const selecionados: string[] = [];
    const horariosRestantes = [...horariosParaUsar];

    // Implementar estratégia de distribuição mais inteligente
    if (quantidade === 1) {
      // Para uma única aula, selecionar aleatoriamente para evitar concentração
      const index = Math.floor(Math.random() * horariosRestantes.length);
      const horario = horariosRestantes[index];
      return [`${horario.dia_semana}_${horario.codigo}`];
    }

    // Para múltiplas aulas, tentar distribuir melhor
    // Primeiro, tentar encontrar horários consecutivos
    const consecutivos = this.findConsecutiveHorarios(
      horariosParaUsar,
      quantidade
    );
    if (consecutivos.length === quantidade) {
      return consecutivos;
    }

    // Se não encontrou consecutivos, usar distribuição inteligente
    const distribuidos = this.findSameDayHorarios(horariosParaUsar, quantidade);
    if (distribuidos.length === quantidade) {
      return distribuidos;
    }

    // Fallback: selecionar com distribuição equilibrada
    // Selecionar horários priorizando sequência no mesmo dia
    for (let i = 0; i < quantidade && horariosRestantes.length > 0; i++) {
      let horarioEscolhido;

      if (selecionados.length > 0) {
        // Tentar encontrar horário sequencial no mesmo dia
        const ultimoHorario = selecionados[selecionados.length - 1];
        const [ultimoDia, ultimoCodigo] = ultimoHorario.split("_");

        horarioEscolhido = this.findSequentialHorario(
          horariosRestantes,
          ultimoDia,
          ultimoCodigo
        );
      }

      if (!horarioEscolhido) {
        // Se não encontrou sequencial, escolher aleatório
        const index = Math.floor(Math.random() * horariosRestantes.length);
        horarioEscolhido = horariosRestantes[index];
      }

      const horarioKey = `${horarioEscolhido.dia_semana}_${horarioEscolhido.codigo}`;
      selecionados.push(horarioKey);

      // Remover horário selecionado da lista
      const indexToRemove = horariosRestantes.findIndex(
        (h) =>
          h.dia_semana === horarioEscolhido.dia_semana &&
          h.codigo === horarioEscolhido.codigo
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
      MATUTINO: ["M1", "M2", "M3", "M4", "M5", "M6"],
      VESPERTINO: ["T1", "T2", "T3", "T4", "T5", "T6"],
      NOTURNO: ["N1", "N2", "N3", "N4"],
    };

    const codigosPreferidos =
      codigosPorTurno[turnoPreferido as keyof typeof codigosPorTurno] || [];

    // Primeiro, tentar horários do turno preferido
    const horariosPreferidos = horarios.filter((h) =>
      codigosPreferidos.includes(h.codigo)
    );

    if (horariosPreferidos.length > 0) {
      return horariosPreferidos;
    }

    // Se não há horários do turno preferido, usar horários próximos
    if (turnoPreferido === "MATUTINO") {
      // Para matutino, preferir tarde próxima (T1, T2)
      const horariosProximos = horarios.filter((h) =>
        ["T1", "T2"].includes(h.codigo)
      );
      if (horariosProximos.length > 0) return horariosProximos;
    } else if (turnoPreferido === "VESPERTINO") {
      // Para vespertino, preferir manhã tardia (M5, M6) ou noite inicial (N1)
      const horariosProximos = horarios.filter((h) =>
        ["M5", "M6", "N1"].includes(h.codigo)
      );
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
      M1: 1,
      M2: 2,
      M3: 3,
      M4: 4,
      M5: 5,
      M6: 6,
      T1: 1,
      T2: 2,
      T3: 3,
      T4: 4,
      T5: 5,
      T6: 6,
      N1: 1,
      N2: 2,
      N3: 3,
      N4: 4,
    };

    const numeroMap: { [key: number]: { [key: string]: string } } = {
      1: { M: "M2", T: "T2", N: "N2" },
      2: { M: "M3", T: "T3", N: "N3" },
      3: { M: "M4", T: "T4", N: "N4" },
      4: { M: "M5", T: "T5" },
      5: { M: "M6", T: "T6" },
    };

    const numeroAtual = sequenciaMap[ultimoCodigo];
    const turno = ultimoCodigo.charAt(0);

    if (
      numeroAtual &&
      numeroMap[numeroAtual] &&
      numeroMap[numeroAtual][turno]
    ) {
      const proximoCodigo = numeroMap[numeroAtual][turno];

      return (
        horarios.find(
          (h) => h.dia_semana === dia && h.codigo === proximoCodigo
        ) || null
      );
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
    const { constraintManager } = require("./constraints");

    let totalFitness = 0;
    const context = {
      professores: this.professores,
      salas: this.salas,
      horarios: this.horarios,
      disciplinas: this.turma.disciplinas,
      turma: this.turma,
      allGenes: cromossomo.genes,
    };

    let invalidHardCount = 0; // rastrear violações hard no cromossomo
    // Avaliar cada gene individualmente
    for (const gene of cromossomo.genes) {
      // Se violar qualquer hard constraint, o gene não contribui para o fitness
      const hardValidation = constraintManager.validateHardConstraints(
        gene,
        context
      );
      if (!hardValidation.isValid) {
        invalidHardCount++;
        continue;
      }

      let geneFitness = 100; // Score base por gene

      // Penalidades (não devem superar os soft a ponto de tornar inválidos elegíveis)
      const hardPenalty = constraintManager.getHardConstraintPenalty(
        gene,
        context
      );
      geneFitness -= hardPenalty;

      // Bonificações por restrições soft
      const softScore = constraintManager.calculateSoftScore(gene, context);
      geneFitness += softScore;

      totalFitness += Math.max(0, geneFitness);
    }

    // Se houver qualquer violação hard no cromossomo, torná-lo inelegível
    if (invalidHardCount > 0) {
      return 0;
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

    // NOVA: Penalizar dias consecutivos e bonificar dias alternados
    bonus += this.calculateDayDistributionBonus(cromossomo);

    // NOVA: Bonificar aulas sequenciais sem brechas
    bonus += this.calculateSequentialClassBonus(cromossomo);

    // NOVA: Penalizar concentração excessiva nos primeiros horários
    bonus += this.calculateTimeDistributionBonus(cromossomo);

    return bonus;
  }

  /**
   * Calcula bônus para distribuição equilibrada ao longo do dia
   * Penaliza concentração excessiva nos primeiros horários (M1, M2)
   */
  private calculateTimeDistributionBonus(cromossomo: Cromossomo): number {
    let bonus = 0;
    const horariosCount = new Map<string, number>();

    // Contar quantas aulas há em cada horário
    cromossomo.genes.forEach((gene) => {
      gene.horarios.forEach((horario) => {
        const horarioCode = horario.split("_")[1]; // Ex: "M1", "M2", etc.
        horariosCount.set(
          horarioCode,
          (horariosCount.get(horarioCode) || 0) + 1
        );
      });
    });

    // Penalizar concentração excessiva nos primeiros horários
    const primeirosPeriodos = ["M1", "M2", "T1", "T2", "N1", "N2"];
    const ultimosPeriodos = ["M5", "M6", "T5", "T6", "N5", "N6"];

    let aulasPrimeiros = 0;
    let aulasUltimos = 0;
    let totalAulas = 0;

    primeirosPeriodos.forEach((periodo) => {
      const count = horariosCount.get(periodo) || 0;
      aulasPrimeiros += count;
      totalAulas += count;
    });

    ultimosPeriodos.forEach((periodo) => {
      const count = horariosCount.get(periodo) || 0;
      aulasUltimos += count;
      totalAulas += count;
    });

    // Contar aulas nos períodos do meio
    const periodosMeio = ["M3", "M4", "T3", "T4", "N3", "N4"];
    let aulasMeio = 0;
    periodosMeio.forEach((periodo) => {
      const count = horariosCount.get(periodo) || 0;
      aulasMeio += count;
      totalAulas += count;
    });

    if (totalAulas > 0) {
      // Bonificar distribuição equilibrada
      const proporcaoPrimeiros = aulasPrimeiros / totalAulas;
      const proporcaoMeio = aulasMeio / totalAulas;
      const proporcaoUltimos = aulasUltimos / totalAulas;

      // Ideal: mais aulas no meio, menos nos extremos
      if (proporcaoMeio > 0.4) bonus += 30; // Bônus por usar períodos do meio
      if (proporcaoPrimeiros < 0.3) bonus += 20; // Bônus por não concentrar no início
      if (proporcaoUltimos < 0.3) bonus += 10; // Bônus por não concentrar no final

      // Penalizar concentração excessiva nos primeiros horários
      if (proporcaoPrimeiros > 0.5) bonus -= 40;
      if (proporcaoPrimeiros > 0.7) bonus -= 60;
    }

    return bonus;
  }

  /**
   * Bonifica distribuição equilibrada de aulas ao longo da semana
   */
  private calculateDistributionBonus(cromossomo: Cromossomo): number {
    const diasUsados = new Set<string>();

    for (const gene of cromossomo.genes) {
      for (const horario of gene.horarios) {
        const dia = horario.split("_")[0];
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
        const dia = horario.split("_")[0];
        if (dia === "SABADO") {
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
      MATUTINO: ["M1", "M2", "M3", "M4", "M5", "M6"],
      VESPERTINO: ["T1", "T2", "T3", "T4", "T5", "T6"],
      NOTURNO: ["N1", "N2", "N3", "N4"],
    };

    const codigosPreferidos =
      codigosPorTurno[turnoPreferido as keyof typeof codigosPorTurno] || [];

    for (const gene of cromossomo.genes) {
      for (const horario of gene.horarios) {
        const codigo = horario.split("_")[1];
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

  /**
   * Penaliza dias consecutivos e bonifica dias alternados
   */
  private calculateDayDistributionBonus(cromossomo: Cromossomo): number {
    let bonus = 0;

    // Mapear dias da semana para números para facilitar cálculos
    const dayNumbers: { [key: string]: number } = {
      SEGUNDA: 1,
      TERCA: 2,
      QUARTA: 3,
      QUINTA: 4,
      SEXTA: 5,
      SABADO: 6,
    };

    for (const gene of cromossomo.genes) {
      const diasUsados = new Set<number>();

      // Coletar todos os dias usados por esta disciplina
      for (const horario of gene.horarios) {
        const dia = horario.split("_")[0];
        const dayNumber = dayNumbers[dia];
        if (dayNumber) {
          diasUsados.add(dayNumber);
        }
      }

      const diasArray = Array.from(diasUsados).sort();

      // Encontrar a disciplina para verificar carga horária
      const disciplina = this.turma.disciplinas.find(
        (d) => d.id === gene.disciplinaId
      );
      if (!disciplina) continue;

      const cargaHoraria = disciplina.cargaHoraria;

      // Aplicar regras específicas baseadas na carga horária com penalidades mais severas
      if (cargaHoraria === 30) {
        // 30h: deve ter 2 aulas no mesmo dia
        if (diasArray.length === 1) {
          bonus += 100; // Bonificação alta por estar no mesmo dia
        } else {
          bonus -= 200; // Penalidade muito severa por estar em dias diferentes
        }
      } else if (cargaHoraria === 45) {
        // 45h: deve ter 3 aulas no mesmo dia
        if (diasArray.length === 1) {
          bonus += 100; // Bonificação alta por estar no mesmo dia
        } else {
          bonus -= 250; // Penalidade extremamente severa por estar em dias diferentes
        }
      } else if (cargaHoraria === 60) {
        // 60h: deve ter 4 aulas em exatamente 2 dias diferentes (2+2)
        if (diasArray.length === 2) {
          // Verificar se há dias consecutivos (não desejado para 60h)
          const [dia1, dia2] = diasArray;
          if (dia2 - dia1 === 1) {
            bonus -= 100; // Penalidade severa por dias consecutivos
          } else if (dia2 - dia1 === 2) {
            bonus += 80; // Bonificação alta por um dia de intervalo
          } else {
            bonus += 60; // Bonificação moderada por mais intervalo
          }
        } else if (diasArray.length === 1) {
          bonus -= 300; // Penalidade extremamente severa por estar tudo no mesmo dia
        } else {
          bonus -= 150; // Penalidade severa por estar em muitos dias
        }
      } else if (cargaHoraria === 90) {
        // 90h: deve ter 6 aulas em exatamente 2 dias diferentes (3+3)
        if (diasArray.length === 2) {
          // Verificar se há dias consecutivos (não desejado para 90h)
          const [dia1, dia2] = diasArray;
          if (dia2 - dia1 === 1) {
            bonus -= 120; // Penalidade severa por dias consecutivos
          } else if (dia2 - dia1 === 2) {
            bonus += 100; // Bonificação alta por um dia de intervalo
          } else {
            bonus += 80; // Bonificação moderada por mais intervalo
          }
        } else if (diasArray.length === 1) {
          bonus -= 400; // Penalidade extremamente severa por estar tudo no mesmo dia
        } else {
          bonus -= 200; // Penalidade severa por estar em muitos dias
        }
      } else {
        // Para outras cargas horárias, aplicar lógica geral com penalidades aumentadas
        for (let i = 0; i < diasArray.length - 1; i++) {
          const diaAtual = diasArray[i];
          const proximoDia = diasArray[i + 1];

          if (proximoDia - diaAtual === 1) {
            bonus -= 50; // Penalidade aumentada por dias consecutivos
          } else if (proximoDia - diaAtual === 2) {
            bonus += 30; // Bonificação por um dia de intervalo
          } else {
            bonus += 20; // Bonificação por mais intervalo
          }
        }
      }
    }

    return bonus;
  }

  /**
   * Bonifica aulas sequenciais sem brechas no mesmo dia
   */
  private calculateSequentialClassBonus(cromossomo: Cromossomo): number {
    let bonus = 0;

    for (const gene of cromossomo.genes) {
      // Agrupar horários por dia
      const horariosPorDia: { [dia: string]: string[] } = {};

      for (const horario of gene.horarios) {
        const [dia, codigo] = horario.split("_");
        if (!horariosPorDia[dia]) {
          horariosPorDia[dia] = [];
        }
        horariosPorDia[dia].push(codigo);
      }

      // Verificar sequencialidade em cada dia
      for (const dia in horariosPorDia) {
        const codigos = horariosPorDia[dia].sort();

        if (codigos.length >= 2) {
          // Verificar se os horários são consecutivos
          let consecutivos = 0;
          let sequenciaAtual = 1;

          for (let i = 1; i < codigos.length; i++) {
            const numeroAtual = this.getHorarioNumber(codigos[i]);
            const numeroAnterior = this.getHorarioNumber(codigos[i - 1]);

            if (numeroAtual === numeroAnterior + 1) {
              sequenciaAtual++;
            } else {
              // Fim da sequência, aplicar bônus se houver
              if (sequenciaAtual >= 2) {
                consecutivos += sequenciaAtual;
              }
              sequenciaAtual = 1;
            }
          }

          // Verificar a última sequência
          if (sequenciaAtual >= 2) {
            consecutivos += sequenciaAtual;
          }

          // Bonificar aulas consecutivas
          if (consecutivos >= 2) {
            bonus += consecutivos * 15; // 15 pontos por aula consecutiva
          }

          // Penalizar brechas (horários não consecutivos no mesmo dia)
          if (codigos.length >= 2 && consecutivos < codigos.length) {
            const brechas = codigos.length - consecutivos;
            bonus -= brechas * 10; // Penalizar cada brecha
          }
        }
      }
    }

    return bonus;
  }

  /**
   * Extrai o número do horário do código (ex: M1 -> 1, T3 -> 3)
   */

  private checkConflicts(cromossomo: Cromossomo): {
    professorConflicts: number;
    salaConflicts: number;
  } {
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
      const sala = this.salas.find((s) => s.id === gene.salaId);
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
        const dia = horario.split("_")[0];
        diasUtilizados.add(dia);
      }
    }

    return diasUtilizados.size; // Mais dias = melhor distribuição
  }

  private checkPreferences(cromossomo: Cromossomo): number {
    let score = 0;

    for (const gene of cromossomo.genes) {
      const professor = this.professores.find((p) => p.id === gene.professorId);
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
    const eliteCount = Math.floor(
      this.params.populationSize * this.params.elitismRate
    );
    const sortedPopulation = [...this.population].sort(
      (a, b) => b.fitness - a.fitness
    );
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
    let best =
      this.population[Math.floor(Math.random() * this.population.length)];

    for (let i = 1; i < tournamentSize; i++) {
      const candidate =
        this.population[Math.floor(Math.random() * this.population.length)];
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
    const mutatedGenes = cromossomo.genes.map((gene) => {
      if (Math.random() < this.params.mutationRate) {
        // Mutar professor
        if (Math.random() < 0.33) {
          const newProfessor =
            this.professores[
              Math.floor(Math.random() * this.professores.length)
            ];
          return { ...gene, professorId: newProfessor.id };
        }
        // Mutar sala
        else if (Math.random() < 0.66) {
          const disciplina = this.turma.disciplinas.find(
            (d) => d.id === gene.disciplinaId
          )!;
          const salasCompativeis = this.salas.filter(
            (sala) =>
              sala.capacidade >= this.turma.num_alunos &&
              (disciplina.tipoSala === "Lab" ? sala.computadores > 0 : true)
          );
          if (salasCompativeis.length > 0) {
            const newSala =
              salasCompativeis[
                Math.floor(Math.random() * salasCompativeis.length)
              ];
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
    const crossoverSuccessRate =
      this.operatorMetrics.crossover.attempts > 0
        ? this.operatorMetrics.crossover.successes /
          this.operatorMetrics.crossover.attempts
        : 0.5;

    const mutationSuccessRate =
      this.operatorMetrics.mutation.attempts > 0
        ? this.operatorMetrics.mutation.successes /
          this.operatorMetrics.mutation.attempts
        : 0.5;

    // Ajustar taxas baseado na performance e estagnação
    if (this.stagnationCount > 5) {
      // Aumentar exploração quando estagnado
      this.adaptiveMutationRate = Math.min(
        0.3,
        this.adaptiveMutationRate * 1.2
      );
      this.adaptiveCrossoverRate = Math.max(
        0.3,
        this.adaptiveCrossoverRate * 0.9
      );
    } else {
      // Ajustar baseado nas taxas de sucesso
      if (crossoverSuccessRate > 0.6) {
        this.adaptiveCrossoverRate = Math.min(
          0.9,
          this.adaptiveCrossoverRate * 1.1
        );
      } else if (crossoverSuccessRate < 0.3) {
        this.adaptiveCrossoverRate = Math.max(
          0.3,
          this.adaptiveCrossoverRate * 0.9
        );
      }

      if (mutationSuccessRate > 0.6) {
        this.adaptiveMutationRate = Math.min(
          0.3,
          this.adaptiveMutationRate * 1.1
        );
      } else if (mutationSuccessRate < 0.3) {
        this.adaptiveMutationRate = Math.max(
          0.05,
          this.adaptiveMutationRate * 0.9
        );
      }
    }

    // Reset das métricas
    this.operatorMetrics.crossover = { successes: 0, attempts: 0 };
    this.operatorMetrics.mutation = { successes: 0, attempts: 0 };
  }

  /**
   * Crossover adaptativo que monitora performance
   */
  private adaptiveCrossover(
    parent1: Cromossomo,
    parent2: Cromossomo
  ): Cromossomo {
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
    const isDifferentFromParents =
      !this.areChromosomesEqual(offspring, parent1) &&
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

    const originalGenes = cromossomo.genes.map((g) => ({ ...g }));
    let mutationOccurred = false;

    const mutatedGenes = cromossomo.genes.map((gene) => {
      if (Math.random() < this.adaptiveMutationRate) {
        mutationOccurred = true;

        // Mutar professor
        if (Math.random() < 0.33) {
          const newProfessor =
            this.professores[
              Math.floor(Math.random() * this.professores.length)
            ];
          return { ...gene, professorId: newProfessor.id };
        }
        // Mutar sala
        else if (Math.random() < 0.66) {
          const disciplina = this.turma.disciplinas.find(
            (d) => d.id === gene.disciplinaId
          )!;
          const salasCompativeis = this.salas.filter(
            (sala) =>
              sala.capacidade >= this.turma.num_alunos &&
              (disciplina.tipoSala === "Lab" ? sala.computadores > 0 : true)
          );
          if (salasCompativeis.length > 0) {
            const newSala =
              salasCompativeis[
                Math.floor(Math.random() * salasCompativeis.length)
              ];
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
  private areChromosomesEqual(
    chromo1: Cromossomo,
    chromo2: Cromossomo
  ): boolean {
    if (chromo1.genes.length !== chromo2.genes.length) return false;

    for (let i = 0; i < chromo1.genes.length; i++) {
      const gene1 = chromo1.genes[i];
      const gene2 = chromo2.genes[i];

      if (
        gene1.disciplinaId !== gene2.disciplinaId ||
        gene1.professorId !== gene2.professorId ||
        gene1.salaId !== gene2.salaId ||
        gene1.horarios.length !== gene2.horarios.length ||
        !gene1.horarios.every((h, idx) => h === gene2.horarios[idx])
      ) {
        return false;
      }
    }

    return true;
  }

  /**
   * Operador de reparo que corrige violações básicas em cromossomos
   */
  private repairChromosome(cromossomo: Cromossomo): Cromossomo {
    const repairedGenes = cromossomo.genes.map((gene) => {
      let repairedGene = { ...gene };

      // Reparar conflitos de horário do professor
      repairedGene = this.repairProfessorConflicts(
        repairedGene,
        cromossomo.genes
      );

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
    const conflictingGenes = allGenes.filter(
      (g) =>
        g !== gene &&
        g.professorId === gene.professorId &&
        g.horarios.some((h) => gene.horarios.includes(h))
    );

    if (conflictingGenes.length === 0) return gene;

    // Encontrar horários alternativos para este gene
    const usedHorarios = new Set<string>();
    allGenes.forEach((g) => {
      if (g !== gene && g.professorId === gene.professorId) {
        g.horarios.forEach((h) => usedHorarios.add(h));
      }
    });

    const availableHorarios = this.horarios
      .map((h) => `${h.dia_semana}_${h.codigo}`)
      .filter((h) => !usedHorarios.has(h));

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
    const conflictingGenes = allGenes.filter(
      (g) =>
        g !== gene &&
        g.salaId === gene.salaId &&
        g.horarios.some((h) => gene.horarios.includes(h))
    );

    if (conflictingGenes.length === 0) return gene;

    // Encontrar sala alternativa
    const disciplina = this.turma.disciplinas.find(
      (d) => d.id === gene.disciplinaId
    )!;
    const salasCompativeis = this.salas.filter(
      (sala) =>
        sala.id !== gene.salaId &&
        sala.capacidade >= this.turma.num_alunos &&
        (disciplina.tipoSala === "Lab" ? sala.computadores > 0 : true)
    );

    // Verificar se alguma sala compatível está disponível nos horários necessários
    for (const sala of salasCompativeis) {
      const salaConflicts = allGenes.filter(
        (g) =>
          g.salaId === sala.id &&
          g.horarios.some((h) => gene.horarios.includes(h))
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
    const sala = this.salas.find((s) => s.id === gene.salaId);
    if (!sala || sala.capacidade >= this.turma.num_alunos) {
      return gene;
    }

    // Encontrar sala com capacidade adequada
    const disciplina = this.turma.disciplinas.find(
      (d) => d.id === gene.disciplinaId
    )!;
    const salasAdequadas = this.salas.filter(
      (s) =>
        s.capacidade >= this.turma.num_alunos &&
        (disciplina.tipoSala === "Lab" ? s.computadores > 0 : true)
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
