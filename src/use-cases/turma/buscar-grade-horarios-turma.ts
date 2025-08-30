import { AlocacoesRepository } from "../../repositories/alocacoes-repository";

interface BuscarGradeHorariosTurmaUseCaseRequest {
  turmaId: string;
}

interface AlocacaoInfo {
  id: string;
  disciplina: {
    id: string;
    nome: string;
    cargaHorariaTotal: number;
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
    diaSemana: string;
    horarioInicio: Date;
    horarioFim: Date;
  };
}

interface GradeHorarios {
  [diaSemana: string]: {
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
    const alocacoes = await this.alocacoesRepository.findAllByTurmaId(turmaId);

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
        grade[dia][codigo] = null;
      });
    });

    // Preencher grade com alocações
    alocacoes.forEach((alocacao) => {
      const diaSemana = alocacao.horario.diaSemana;
      const codigoHorario = alocacao.horario.codigo;

      grade[diaSemana][codigoHorario] = {
        id: alocacao.id,
        disciplina: {
          id: alocacao.disciplina.id,
          nome: alocacao.disciplina.nome,
          cargaHorariaTotal: alocacao.disciplina.cargaHorariaTotal,
        },
        professor: {
          id: alocacao.user.id,
          nome: alocacao.user.nome,
          email: alocacao.user.email,
        },
        sala: {
          id: alocacao.sala.id,
          nome: alocacao.sala.nome,
          predio: alocacao.sala.predio,
          capacidade: alocacao.sala.capacidade,
        },
        horario: {
          id: alocacao.horario.id,
          codigo: alocacao.horario.codigo,
          diaSemana: alocacao.horario.diaSemana,
          horarioInicio: alocacao.horario.horarioInicio,
          horarioFim: alocacao.horario.horarioFim,
        },
      };
    });

    // Calcular resumo
    const disciplinasUnicas = new Set(alocacoes.map((a) => a.disciplina.id))
      .size;
    const professoresUnicos = new Set(alocacoes.map((a) => a.user.id)).size;

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
