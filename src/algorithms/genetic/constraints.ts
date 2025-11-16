export interface HardConstraint {
  name: string;
  weight: number;
  validate: (gene: any, context: any) => boolean;
}

export interface SoftConstraint {
  name: string;
  weight: number;
  score: (gene: any, context: any) => number;
}

import { env } from '../../env';

export class ConstraintManager {
  private hardConstraints: HardConstraint[];
  private softConstraints: SoftConstraint[];

  constructor() {
    this.hardConstraints = this.initializeHardConstraints();
    this.softConstraints = this.initializeSoftConstraints();
  }

  private initializeHardConstraints(): HardConstraint[] {
    return [
      {
        name: "professor_availability",
        weight: env.GA_WEIGHT_PROFESSOR_AVAILABILITY,
        validate: (gene, context) => {
          // Professor não pode estar em dois lugares ao mesmo tempo
          const { professorId, horarios } = gene;
          const { allGenes } = context;

          for (const otherGene of allGenes) {
            if (otherGene !== gene && otherGene.professorId === professorId) {
              const overlap = horarios.some((h) =>
                otherGene.horarios.includes(h)
              );
              if (overlap) return false;
            }
          }
          return true;
        },
      },
      {
        name: "room_availability",
        weight: env.GA_WEIGHT_ROOM_AVAILABILITY,
        validate: (gene, context) => {
          // Sala não pode ter duas aulas ao mesmo tempo
          const { salaId, horarios } = gene;
          const { allGenes } = context;

          for (const otherGene of allGenes) {
            if (otherGene !== gene && otherGene.salaId === salaId) {
              const overlap = horarios.some((h) =>
                otherGene.horarios.includes(h)
              );
              if (overlap) return false;
            }
          }
          return true;
        },
      },
      {
        name: "room_capacity",
        weight: env.GA_WEIGHT_ROOM_CAPACITY,
        validate: (gene, context) => {
          // Sala deve ter capacidade suficiente
          const { salaId } = gene;
          const { salas, turma } = context;
          const sala = salas.find((s) => s.id === salaId);
          return sala ? sala.capacidade >= turma.num_alunos : false;
        },
      },
      {
        name: "room_type_compatibility",
        weight: env.GA_WEIGHT_ROOM_TYPE_COMPATIBILITY,
        validate: (gene, context) => {
          // Disciplinas de laboratório precisam de salas com computadores
          const { disciplinaId, salaId } = gene;
          const { disciplinas, salas } = context;

          const disciplina = disciplinas.find((d) => d.id === disciplinaId);
          const sala = salas.find((s) => s.id === salaId);

          if (!disciplina || !sala) return false;

          if (disciplina.tipoSala === "Lab") {
            return sala.computadores > 0;
          }

          return true;
        },
      },
      {
        name: "workload_limit",
        weight: env.GA_WEIGHT_WORKLOAD_LIMIT,
        validate: (gene, context) => {
          // Professor não pode exceder carga horária máxima
          const { professorId, horarios } = gene;
          const { allGenes, professores } = context;

          const professor = professores.find((p) => p.id === professorId);
          if (!professor) return false;

          const totalHoras = allGenes
            .filter((g) => g.professorId === professorId)
            .reduce((total, g) => total + g.horarios.length, 0);

          return totalHoras * 15 <= professor.carga_horaria_max * 60; // 15min por slot
        },
      },
      {
        name: "turma_availability",
        weight: env.GA_WEIGHT_TURMA_AVAILABILITY,
        validate: (gene, context) => {
          // Turma não pode ter duas aulas ao mesmo tempo
          const { horarios } = gene;
          const { allGenes } = context;

          for (const otherGene of allGenes) {
            if (otherGene !== gene) {
              const overlap = horarios.some((h) =>
                otherGene.horarios.includes(h)
              );
              if (overlap) return false;
            }
          }
          return true;
        },
      },
      {
        name: "no_sunday",
        weight: env.GA_WEIGHT_NO_SUNDAY,
        validate: (gene, context) => {
          // Não permitir aulas aos domingos
          const { horarios } = gene;
          return horarios.every((h: string) => h.split("_")[0] !== "DOMINGO");
        },
      },
    ];
  }

  private initializeSoftConstraints(): SoftConstraint[] {
    return [
      {
        name: "avoid_consecutive_days",
        weight: 40, // Peso alto para dar prioridade a essa regra
        score: (gene, context) => {
          const { horarios } = gene;
          if (horarios.length <= 1) return 0; // Regra não se aplica a aulas de 1 dia

          const diasUsados = new Set(horarios.map((h) => h.split("_")[0]));
          const diasOrdenados = Array.from(diasUsados) as string[]; // Correção de tipagem aqui

          // A sua constante `ordem` já está declarada, então você pode usá-la.
          const ordem = [
            "SEGUNDA",
            "TERCA",
            "QUARTA",
            "QUINTA",
            "SEXTA",
            "SABADO",
          ];

          diasOrdenados.sort((a, b) => {
            return ordem.indexOf(a) - ordem.indexOf(b);
          });

          let penalidade = 0;
          let bonus = 0;

          for (let i = 0; i < diasOrdenados.length - 1; i++) {
            const diaAtual = diasOrdenados[i];
            const proximoDia = diasOrdenados[i + 1];

            if (
              typeof diaAtual === "string" &&
              typeof proximoDia === "string"
            ) {
              if (ordem.indexOf(proximoDia) - ordem.indexOf(diaAtual) === 1) {
                penalidade += 50; // Penalidade para dias seguidos
              } else {
                bonus += 20; // Bônus para dias com intervalo
              }
            }
          }

          return bonus - penalidade;
        },
      },
      {
        name: "professor_preferences",
        weight: 50,
        score: (gene, context) => {
          // Bonificar horários preferidos do professor
          const { professorId, horarios } = gene;
          const { professores } = context;

          const professor = professores.find((p) => p.id === professorId);
          if (!professor?.preferencias) return 0;

          return horarios.filter((h) => professor.preferencias.includes(h))
            .length;
        },
      },
      {
        name: "schedule_distribution",
        weight: 50,
        score: (gene, context) => {
          // Aplicar regras específicas de distribuição baseadas na carga horária
          const { horarios, disciplinaId } = gene;
          const { disciplinas } = context;

          const disciplina = disciplinas.find((d) => d.id === disciplinaId);
          if (!disciplina) return 0;

          const cargaHoraria =
            disciplina.cargaHoraria || disciplina.carga_horaria_total;
          const dias = new Set(horarios.map((h) => h.split("_")[0]));
          const diasArray = Array.from(dias);

          // Regras específicas por carga horária
          if (cargaHoraria === 30) {
            // 30h: deve ter 2 aulas no mesmo dia
            if (diasArray.length === 1 && horarios.length === 2) {
              return 100; // Bonificação alta para distribuição correta
            } else if (diasArray.length > 1) {
              return -50; // Penalidade por distribuir em dias diferentes
            }
          } else if (cargaHoraria === 45) {
            // 45h: deve ter 3 aulas no mesmo dia
            if (diasArray.length === 1 && horarios.length === 3) {
              return 100; // Bonificação alta para distribuição correta
            } else if (diasArray.length > 1) {
              return -50; // Penalidade por distribuir em dias diferentes
            }
          } else if (cargaHoraria === 60) {
            // 60h: deve ter 4 aulas em 2 dias diferentes (2+2)
            if (diasArray.length === 2 && horarios.length === 4) {
              return 100; // Bonificação alta para distribuição correta
            } else if (diasArray.length === 1) {
              return -75; // Penalidade severa por colocar tudo no mesmo dia
            } else if (diasArray.length > 2) {
              return -25; // Penalidade por distribuir em muitos dias
            }
          } else if (cargaHoraria === 90) {
            // 90h: deve ter 6 aulas em 2 dias diferentes (3+3)
            if (diasArray.length === 2 && horarios.length === 6) {
              return 100; // Bonificação alta para distribuição correta
            } else if (diasArray.length === 1) {
              return -100; // Penalidade muito severa por colocar tudo no mesmo dia
            } else if (diasArray.length > 2) {
              return -25; // Penalidade por distribuir em muitos dias
            }
          }

          // Fallback: bonificar distribuição equilibrada
          return diasArray.length * 10;
        },
      },
      {
        name: "consecutive_classes",
        weight: env.GA_WEIGHT_CONSECUTIVE_CLASSES,
        score: (gene, context) => {
          // Aplicar regras de consecutividade baseadas na carga horária
          const { horarios, disciplinaId } = gene;
          const { disciplinas } = context;

          const disciplina = disciplinas.find((d) => d.id === disciplinaId);
          if (!disciplina) return 0;

          const cargaHoraria =
            disciplina.cargaHoraria || disciplina.carga_horaria_total;
          let consecutiveScore = 0;

          // Agrupar por dia
          const horariosPorDia = new Map<string, string[]>();
          for (const horario of horarios) {
            const [dia, slot] = horario.split("_");
            if (!horariosPorDia.has(dia)) {
              horariosPorDia.set(dia, []);
            }
            horariosPorDia.get(dia)!.push(slot);
          }

          // Verificar consecutividade em cada dia
          for (const [dia, slots] of horariosPorDia) {
            const sortedSlots = slots.sort();
            const aulasPorDia = slots.length;

            // Contar aulas consecutivas
            let consecutivas = 0;
            for (let i = 1; i < sortedSlots.length; i++) {
              if (this.areConsecutive(sortedSlots[i - 1], sortedSlots[i])) {
                consecutivas++;
              }
            }

            // Aplicar regras específicas por carga horária
            if (cargaHoraria === 30) {
              // 30h: deve ter 2 aulas consecutivas no mesmo dia
              if (aulasPorDia === 2 && consecutivas === 1) {
                consecutiveScore += 50; // Bonificação alta
              } else if (aulasPorDia === 2 && consecutivas === 0) {
                consecutiveScore -= 40; // Penalidade mais forte por não serem consecutivas
              }
            } else if (cargaHoraria === 45) {
              // 45h: deve ter 3 aulas consecutivas no mesmo dia
              if (aulasPorDia === 3 && consecutivas === 2) {
                consecutiveScore += 60; // Bonificação alta
              } else if (aulasPorDia === 3 && consecutivas < 2) {
                consecutiveScore -= 60; // Penalidade forte por não serem todas consecutivas
              }
            } else if (cargaHoraria === 60) {
              // 60h: deve ter 2 aulas consecutivas em cada dia (2+2)
              if (aulasPorDia === 2 && consecutivas === 1) {
                consecutiveScore += 35; // Bonificação por par consecutivo
              } else if (aulasPorDia === 2 && consecutivas === 0) {
                consecutiveScore -= 40; // Penalidade por não serem consecutivas
              } else if (aulasPorDia > 2) {
                consecutiveScore -= 40; // Penalidade por mais de 2 aulas no mesmo dia
              }
            } else if (cargaHoraria === 90) {
              // 90h: deve ter 3 aulas consecutivas em cada dia (3+3)
              if (aulasPorDia === 3 && consecutivas === 2) {
                consecutiveScore += 40; // Bonificação por trio consecutivo
              } else if (aulasPorDia === 3 && consecutivas < 2) {
                consecutiveScore -= 60; // Penalidade forte por não serem todas consecutivas
              } else if (aulasPorDia > 3) {
                consecutiveScore -= 60; // Penalidade severa por mais de 3 aulas no mesmo dia
              }
            } else {
              // Para outras cargas horárias, bonificar consecutividade moderadamente
              consecutiveScore += consecutivas * 5;
            }
          }

          return consecutiveScore;
        },
      },
      // Penalizar brechas intra-dia (ex.: T1, T2, T4)
      {
        name: "avoid_intra_day_gaps",
        weight: env.GA_WEIGHT_AVOID_INTRA_DAY_GAPS,
        score: (gene, context) => {
          const { horarios } = gene;
          if (horarios.length <= 1) return 0;

          // Mapear slots por dia
          const porDia = new Map<string, number[]>();
          const ordemSlots = ["M1","M2","M3","M4","M5","M6","T1","T2","T3","T4","T5","T6","N1","N2","N3","N4"];
          const toNum = (s: string) => ordemSlots.indexOf(s);

          for (const h of horarios) {
            const [dia, slot] = h.split("_");
            if (!porDia.has(dia)) porDia.set(dia, []);
            porDia.get(dia)!.push(toNum(slot));
          }

          let penalty = 0;
          // Para cada dia, penalizar lacunas entre slots presentes
          for (const [dia, nums] of porDia) {
            nums.sort((a,b)=>a-b);
            for (let i=1;i<nums.length;i++) {
              const diff = nums[i]-nums[i-1];
              if (diff > 1) {
                // há brecha (ex.: 1,2,4 => diff=2 na transição 2->4)
                penalty -= 30; // penalidade base por brecha
                // penalizar brechas maiores um pouco mais
                if (diff >= 2) penalty -= 10;
              }
            }
          }

          return penalty;
        }
      },
      // NOVAS REGRAS: evitar T6, priorizar horários iniciais e evitar começar no slot 2
      {
        name: "avoid_T6",
        weight: env.GA_WEIGHT_AVOID_T6 ?? 80,
        score: (gene, context) => {
          // Penalizar fortemente aulas no T6
          const { horarios } = gene;
          let score = 0;
          for (const h of horarios) {
            const slot = h.split("_")[1];
            if (slot === "T6") {
              score -= 100; // penalidade alta por T6
            }
          }
          return score;
        }
      },
      {
        name: "prioritize_early_slots",
        weight: env.GA_WEIGHT_PRIORITIZE_EARLY_SLOTS ?? 40,
        score: (gene, context) => {
          // Bonificar M1/M2/T1/T2/N1/N2 e desincentivar slots tardios
          const early = new Set(["M1","M2","T1","T2","N1","N2"]);
          const late = new Set(["M5","M6","T5","T6","N4"]);
          let score = 0;
          for (const h of gene.horarios) {
            const slot = h.split("_")[1];
            if (early.has(slot)) score += 10;
            if (late.has(slot)) score -= 5;
          }
          return score;
        }
      },
      {
        name: "avoid_start_at_2",
        weight: env.GA_WEIGHT_AVOID_START_AT_2 ?? 50,
        score: (gene, context) => {
          // Penalizar começar em 2 quando 1 está livre no mesmo dia (evita dia quebrado)
          const porDia = new Map<string, Set<string>>();
          for (const h of gene.horarios) {
            const [dia, slot] = h.split("_");
            if (!porDia.has(dia)) porDia.set(dia, new Set());
            porDia.get(dia)!.add(slot);
          }
          let penalty = 0;
          for (const [dia, slots] of porDia) {
            // se existe "M2" sem "M1" ou "T2" sem "T1" ou "N2" sem "N1"
            const hasM2 = slots.has("M2"), hasM1 = slots.has("M1");
            const hasT2 = slots.has("T2"), hasT1 = slots.has("T1");
            const hasN2 = slots.has("N2"), hasN1 = slots.has("N1");
            if ((hasM2 && !hasM1) || (hasT2 && !hasT1) || (hasN2 && !hasN1)) {
              penalty -= 20; // penalidade por começar no 2 sem 1
            }
          }
          return penalty;
        }
      },
      {
        name: "avoid_lunch_break",
        weight: 15,
        score: (gene, context) => {
          // Penalizar aulas no horário de almoço
          const { horarios } = gene;
          const lunchSlots = ["M5", "M6", "T1", "T2"];
          const lunchClasses = horarios.filter((h) => {
            const slot = h.split("_")[1];
            return lunchSlots.includes(slot);
          }).length;

          return -lunchClasses * 10; // Penalidade
        },
      },
      {
        name: "room_utilization",
        weight: 10,
        score: (gene, context) => {
          // Bonificar uso eficiente de salas especializadas
          const { disciplinaId, salaId } = gene;
          const { disciplinas, salas } = context;

          const disciplina = disciplinas.find((d) => d.id === disciplinaId);
          const sala = salas.find((s) => s.id === salaId);

          if (!disciplina || !sala) return 0;

          // Bonificar uso de lab para disciplinas de lab
          if (disciplina.tipoSala === "Lab" && sala.computadores > 0) {
            return 20;
          }

          // Penalizar uso de lab para disciplinas normais
          if (disciplina.tipoSala === "Sala" && sala.computadores > 0) {
            return -10;
          }

          return 0;
        },
      },
      {
        name: "avoid_saturday",
        weight: env.GA_WEIGHT_AVOID_SATURDAY,
        score: (gene, context) => {
          // Penalizar fortemente aulas aos sábados
          const { horarios } = gene;
          let saturdayPenalty = 0;

          for (const horario of horarios) {
            const dia = horario.split("_")[0];
            if (dia === "SABADO") {
              saturdayPenalty -= 50; // Penalidade alta por aula no sábado
            }
          }

          return saturdayPenalty;
        },
      },
      {
        name: "turno_preference",
        weight: 25,
        score: (gene, context) => {
          // Bonificar aulas no turno preferido da turma
          const { horarios } = gene;
          const { turma } = context;
          const turnoPreferido = turma?.turno?.toUpperCase();
          if (!turnoPreferido) return 0;

          const codigosPorTurno = {
            MATUTINO: ["M1", "M2", "M3", "M4", "M5", "M6"],
            VESPERTINO: ["T1", "T2", "T3", "T4", "T5", "T6"],
            NOTURNO: ["N1", "N2", "N3", "N4"],
          };

          const codigosPreferidos = codigosPorTurno[turnoPreferido] || [];
          let alignmentScore = 0;

          for (const horario of horarios) {
            const codigo = horario.split("_")[1];

            if (codigosPreferidos.includes(codigo)) {
              alignmentScore += 15; // Bonificação por horário no turno preferido
            } else {
              // Penalização menor por horário fora do turno preferido
              alignmentScore -= 5;
            }
          }

          return alignmentScore;
        },
      },
      // NOVA REGRA: Qualidade do intervalo entre dias para cargas de 4 e 6 aulas semanais
      {
        name: "day_interval_quality",
        weight: env.GA_WEIGHT_DAY_INTERVAL_QUALITY ?? 50,
        score: (gene, context) => {
          const { horarios, disciplinaId } = gene;
          const { disciplinas } = context;
          const disciplina = disciplinas.find((d) => d.id === disciplinaId);
          if (!disciplina) return 0;

          const cargaHoraria = disciplina.cargaHoraria || disciplina.carga_horaria_total;
          const dias = Array.from(new Set(horarios.map((h) => h.split("_")[0])));

          // Só avalia quando há exatamente 2 dias (casos 4 aulas = 2+2 e 6 aulas = 3+3)
          if (dias.length !== 2) return 0;

          const ordem = [
            "SEGUNDA",
            "TERCA",
            "QUARTA",
            "QUINTA",
            "SEXTA",
            "SABADO",
          ];

          const idx1 = ordem.indexOf(dias[0]);
          const idx2 = ordem.indexOf(dias[1]);
          if (idx1 === -1 || idx2 === -1) return 0;

          const diff = Math.abs(idx2 - idx1);
          let score = 0;

          // Preferência: intervalo de 1 dia é o melhor cenário; >1 dia também bom; dias seguidos é ok mas inferior
          if (diff === 2) {
            // Ex.: SEGUNDA-QUARTA, TERCA-QUINTA, QUARTA-SEXTA
            score = 100;
          } else if (diff > 2) {
            // Ex.: SEGUNDA-QUINTA (diff=3), SEGUNDA-SEXTA (diff=4)
            score = 75;
          } else if (diff === 1) {
            // Ex.: SEGUNDA-TERCA ou QUARTA-QUINTA
            score = 40;
          } else {
            score = 0;
          }

          // Aplicar somente para cargas de 4 e 6 aulas semanais
          if (cargaHoraria === 60 || cargaHoraria === 90) {
            return score;
          }
          return 0;
        },
      },
    ];
  }

  private areConsecutive(slot1: string, slot2: string): boolean {
    const slotOrder = [
      "M1",
      "M2",
      "M3",
      "M4",
      "M5",
      "M6",
      "T1",
      "T2",
      "T3",
      "T4",
      "T5",
      "T6",
      "N1",
      "N2",
      "N3",
      "N4",
    ];
    const index1 = slotOrder.indexOf(slot1);
    const index2 = slotOrder.indexOf(slot2);

    return Math.abs(index1 - index2) === 1;
  }

  public validateHardConstraints(
    gene: any,
    context: any
  ): { isValid: boolean; violations: string[] } {
    const violations: string[] = [];

    for (const constraint of this.hardConstraints) {
      if (!constraint.validate(gene, context)) {
        violations.push(constraint.name);
      }
    }

    return {
      isValid: violations.length === 0,
      violations,
    };
  }

  public calculateSoftScore(gene: any, context: any): number {
    let totalScore = 0;

    for (const constraint of this.softConstraints) {
      const score = constraint.score(gene, context);
      totalScore += score * constraint.weight;
    }

    return totalScore;
  }

  public getHardConstraintPenalty(gene: any, context: any): number {
    let penalty = 0;

    for (const constraint of this.hardConstraints) {
      if (!constraint.validate(gene, context)) {
        penalty += constraint.weight;
      }
    }

    // Multiplicador de penalidade via .env para tornar hard constraints mais rígidas
    return penalty * env.GA_HARD_PENALTY_MULTIPLIER;
  }

  public getConstraintReport(
    gene: any,
    context: any
  ): {
    hardViolations: string[];
    softScores: { [key: string]: number };
    totalPenalty: number;
    totalBonus: number;
  } {
    const hardValidation = this.validateHardConstraints(gene, context);
    const softScores: { [key: string]: number } = {};
    let totalBonus = 0;

    for (const constraint of this.softConstraints) {
      const score = constraint.score(gene, context) * constraint.weight;
      softScores[constraint.name] = score;
      totalBonus += Math.max(0, score);
    }

    return {
      hardViolations: hardValidation.violations,
      softScores,
      totalPenalty: this.getHardConstraintPenalty(gene, context),
      totalBonus,
    };
  }
}

export const constraintManager = new ConstraintManager();
