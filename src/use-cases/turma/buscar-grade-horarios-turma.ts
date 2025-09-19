import {
  AlocacoesRepository,
  AlocacaoWithRelations,
} from "../../repositories/alocacoes-repository";

interface BuscarGradeHorariosTurmaUseCaseRequest {
  turmaId: string;
}

interface AlocacaoInfo {
  id: string;
  disciplina: {
    id: string;
    nome: string;
    codigo: string;
    cargaHoraria: number;
  };
  professor: {
    id: string;
    nome: string;
    email: string;
  };
  sala: {
    id: string;
    nome: string;
    predio: string;
    capacidade: number;
  };
  horario: {
    id: string;
    codigo: string;
    dia_semana: string;
    horario_inicio: Date;
    horario_fim: Date;
  };
}

interface GradeHorarios {
  [dia_semana: string]: {
    [codigoHorario: string]: AlocacaoInfo | null;
  };
}

interface BuscarGradeHorariosTurmaUseCaseResponse {
  turmaId: string;
  grade: GradeHorarios;
  resumo: {
    totalAlocacoes: number;
    disciplinasUnicas: number;
    professoresUnicos: number;
  };
}

export class BuscarGradeHorariosTurmaUseCase {
  constructor(private alocacoesRepository: AlocacoesRepository) {}

  async execute({
    turmaId,
  }: BuscarGradeHorariosTurmaUseCaseRequest): Promise<BuscarGradeHorariosTurmaUseCaseResponse> {
    // Buscar todas as alocações da turma com relacionamentos
    const alocacoes: AlocacaoWithRelations[] =
      await this.alocacoesRepository.findAllByTurmaId(turmaId);

    // Inicializar grade vazia
    const diasSemana = [
      "SEGUNDA",
      "TERCA",
      "QUARTA",
      "QUINTA",
      "SEXTA",
      "SABADO",
    ];
    const codigosHorarios = [
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

    const grade: GradeHorarios = {};

    // Inicializar grade com valores null
    diasSemana.forEach((dia) => {
      grade[dia] = {};
      codigosHorarios.forEach((codigo) => {
        grade[dia]![codigo] = null;
      });
    });

    // Preencher grade com alocações
    alocacoes.forEach((alocacao) => {
      // Verificar se os relacionamentos existem
      if (
        !alocacao.horario ||
        !alocacao.disciplina ||
        !alocacao.user ||
        !alocacao.sala
      ) {
        return; // Pular alocação com dados incompletos
      }

      const dia_semana = alocacao.horario?.dia_semana || "";
      const codigoHorario = alocacao.horario?.codigo || "";

      // Verificar se o dia e código do horário existem na grade
      if (
        !grade[dia_semana] ||
        grade[dia_semana][codigoHorario] === undefined
      ) {
        return; // Pular se não existe na grade
      }

      grade[dia_semana]![codigoHorario] = {
        id: alocacao.id,
        disciplina: {
          id: alocacao.disciplina?.id || "",
          nome: alocacao.disciplina?.nome || "",
          codigo: alocacao.disciplina?.codigo || "",
          cargaHoraria: alocacao.disciplina?.carga_horaria || 0,
          horario_consolidado: alocacao.disciplina?.horario_consolidado || "",
        },
        professor: {
          id: alocacao.user?.id || "",
          nome: alocacao.user?.nome || "",
          email: alocacao.user?.email || "",
        },
        sala: {
          id: alocacao.sala?.id || "",
          nome: alocacao.sala?.nome || "",
          predio: alocacao.sala?.predio?.nome || "",
          capacidade: alocacao.sala?.capacidade || 0,
        },
        horario: {
          id: alocacao.horario?.id || "",
          codigo: alocacao.horario?.codigo || "",
          dia_semana: alocacao.horario?.dia_semana || "",
          horario_inicio: alocacao.horario?.horario_inicio || new Date(),
          horario_fim: alocacao.horario?.horario_fim || new Date(),
        },
      };
    });

    // Calcular resumo
    const disciplinasUnicas = new Set(
      alocacoes.filter((a) => a.disciplina?.id).map((a) => a.disciplina!.id)
    ).size;
    const professoresUnicos = new Set(
      alocacoes.filter((a) => a.user?.id).map((a) => a.user!.id)
    ).size;

    return {
      turmaId,
      grade,
      resumo: {
        totalAlocacoes: alocacoes.length,
        disciplinasUnicas,
        professoresUnicos,
      },
    };
  }
}
