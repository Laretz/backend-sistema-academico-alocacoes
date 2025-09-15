import { AlocacoesRepository } from "../../repositories/alocacoes-repository";

interface BuscarGradeHorariosSalaUseCaseRequest {
  salaId: string;
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
  turma: {
    id: string;
    nome: string;
    num_alunos: number;
    periodo: number;
    turno: string;
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

interface BuscarGradeHorariosSalaUseCaseResponse {
  salaId: string;
  grade: GradeHorarios;
  resumo: {
    totalAlocacoes: number;
    disciplinasUnicas: number;
    professoresUnicos: number;
    turmasUnicas: number;
  };
}

export class BuscarGradeHorariosSalaUseCase {
  constructor(private alocacoesRepository: AlocacoesRepository) {}

  async execute({
    salaId,
  }: BuscarGradeHorariosSalaUseCaseRequest): Promise<BuscarGradeHorariosSalaUseCaseResponse> {
    // Buscar todas as alocações da sala com relacionamentos
    const alocacoes = await this.alocacoesRepository.findBySalaId(salaId, 1);

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
    alocacoes.forEach((alocacao: any) => {
      const dia_semana = alocacao.horario.dia_semana;
    const codigoHorario = alocacao.horario.codigo;

    grade[dia_semana][codigoHorario] = {
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
        turma: {
          id: alocacao.turma.id,
          nome: alocacao.turma.nome,
          num_alunos: alocacao.turma.num_alunos,
          periodo: alocacao.turma.periodo,
          turno: alocacao.turma.turno,
        },
        horario: {
          id: alocacao.horario.id,
          codigo: alocacao.horario.codigo,
          dia_semana: alocacao.horario.dia_semana,
          horario_inicio: alocacao.horario.horario_inicio,
        horario_fim: alocacao.horario.horario_fim,
        },
      };
    });

    // Calcular resumo
    const disciplinasUnicas = new Set(alocacoes.map((a: any) => a.disciplina.id))
      .size;
    const professoresUnicos = new Set(alocacoes.map((a: any) => a.user.id)).size;
    const turmasUnicas = new Set(alocacoes.map((a: any) => a.turma.id)).size;

    return {
      salaId,
      grade,
      resumo: {
        totalAlocacoes: alocacoes.length,
        disciplinasUnicas,
        professoresUnicos,
        turmasUnicas,
      },
    };
  }
}