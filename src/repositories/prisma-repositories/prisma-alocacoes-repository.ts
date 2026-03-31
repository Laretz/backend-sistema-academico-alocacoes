import { Prisma } from "@prisma/client";
import { prisma } from "../../lib/prisma";
import { AlocacoesRepository } from "../alocacoes-repository";

export class PrismaAlocacoesRepository implements AlocacoesRepository {
  async create(data: Prisma.AlocacaoCreateInput) {
    const alocacao = await prisma.alocacao.create({
      data,
    });
    return alocacao;
  }

  async findById(id: string) {
    const alocacao = await prisma.alocacao.findUnique({
      where: { id },
      include: {
        user: true,
        disciplina: true,
        cursoDisciplina: true,
        turma: true,
        sala: {
          include: {
            predio: true,
          },
        },
        horario: true,
      },
    });

    return alocacao;
  }

  async findByUserIdAndHorarioId(id_user: string, id_horario: string) {
    const alocacao = await prisma.alocacao.findFirst({
      where: {
        id_user,
        id_horario,
      },
    });

    return alocacao;
  }

  async findBySalaIdAndHorarioId(id_sala: string, id_horario: string) {
    const alocacao = await prisma.alocacao.findFirst({
      where: {
        id_sala,
        id_horario,
      },
    });

    return alocacao;
  }

  async findByTurmaIdAndHorarioId(id_turma: string, id_horario: string) {
    const alocacao = await prisma.alocacao.findFirst({
      where: {
        id_turma,
        id_horario,
      },
    });

    return alocacao;
  }

  async findOverlapBySala(
    id_sala: string,
    dia_semana: string,
    inicio: Date,
    fim: Date,
  ) {
    const alocacao = await prisma.alocacao.findFirst({
      where: {
        id_sala,
        horario: {
          dia_semana,
          horario_inicio: { lt: fim },
          horario_fim: { gt: inicio },
        },
      },
      include: { horario: true, sala: true },
    });
    return alocacao || null;
  }

  async findOverlapByUser(
    id_user: string,
    dia_semana: string,
    inicio: Date,
    fim: Date,
  ) {
    const alocacao = await prisma.alocacao.findFirst({
      where: {
        id_user,
        horario: {
          dia_semana,
          horario_inicio: { lt: fim },
          horario_fim: { gt: inicio },
        },
      },
      include: { horario: true, user: true },
    });
    return alocacao || null;
  }

  async findOverlapByTurma(
    id_turma: string,
    dia_semana: string,
    inicio: Date,
    fim: Date,
  ) {
    const alocacao = await prisma.alocacao.findFirst({
      where: {
        id_turma,
        horario: {
          dia_semana,
          horario_inicio: { lt: fim },
          horario_fim: { gt: inicio },
        },
      },
      include: { horario: true, turma: true },
    });
    return alocacao || null;
  }

  async findMany(page: number) {
    const ordemDias = {
      SEGUNDA: 1,
      TERCA: 2,
      QUARTA: 3,
      QUINTA: 4,
      SEXTA: 5,
      SABADO: 6,
    };

    const alocacoes = await prisma.alocacao.findMany({
      take: 20,
      skip: (page - 1) * 20,
      include: {
        user: true,
        disciplina: true,
        cursoDisciplina: true,
        turma: true,
        sala: {
          include: {
            predio: true,
          },
        },
        horario: true,
      },
      orderBy: [
        {
          created_at: "desc",
        },
      ],
    });

    return alocacoes.sort((a, b) => {
      const diaA =
        ordemDias[a.horario?.dia_semana as keyof typeof ordemDias] || 7;
      const diaB =
        ordemDias[b.horario?.dia_semana as keyof typeof ordemDias] || 7;

      if (diaA !== diaB) {
        return diaA - diaB;
      }

      // Depois ordenar por código do horário (M1, M2, T1, T2, N1, N2)
      const getOrdemCodigo = (codigo: string) => {
        if (!codigo) return 999;
        const periodo = codigo.charAt(0);
        const numero = parseInt(codigo.charAt(1)) || 0;
        const ordemPeriodo = { M: 0, T: 1, N: 2 };
        return (
          (ordemPeriodo[periodo as keyof typeof ordemPeriodo] || 3) * 10 +
          numero
        );
      };

      const codigoA = getOrdemCodigo(a.horario?.codigo || "");
      const codigoB = getOrdemCodigo(b.horario?.codigo || "");

      if (codigoA !== codigoB) {
        return codigoA - codigoB;
      }

      return (
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
    });
  }

  async findByUserId(id_user: string, page: number) {
    const alocacoes = await prisma.alocacao.findMany({
      where: {
        id_user,
      },
      take: 20,
      skip: (page - 1) * 20,
      include: {
        user: true,
        disciplina: true,
        cursoDisciplina: true,
        turma: true,
        sala: {
          include: {
            predio: true,
          },
        },
        horario: true,
      },
    });

    return alocacoes;
  }

  async findByTurmaId(id_turma: string, page: number) {
    const alocacoes = await prisma.alocacao.findMany({
      where: {
        id_turma,
        turma: { curso: { isDeleted: null } },
      },
      take: 20,
      skip: (page - 1) * 20,
      include: {
        user: true,
        disciplina: true,
        cursoDisciplina: true,
        turma: true,
        sala: {
          include: {
            predio: true,
          },
        },
        horario: true,
      },
    });

    return alocacoes;
  }

  async findByTurma(turmaId: string) {
    const alocacoes = await prisma.alocacao.findMany({
      where: {
        id_turma: turmaId,
        turma: { curso: { isDeleted: null } },
      },
      include: {
        user: true,
        disciplina: true,
        cursoDisciplina: true,
        turma: true,
        sala: {
          include: {
            predio: true,
          },
        },
        horario: true,
      },
    });

    return alocacoes;
  }

  async findAllByTurmaId(id_turma: string) {
    const alocacoes = await prisma.alocacao.findMany({
      where: {
        id_turma,
        turma: { curso: { isDeleted: null } },
      },
      include: {
        user: true,
        disciplina: true,
        cursoDisciplina: true,
        turma: true,
        sala: {
          include: {
            predio: true,
          },
        },
        horario: true,
      },
    });

    // Ordenação natural por dia da semana e horário
    const daysMap: Record<string, number> = {
      DOMINGO: 0,
      SEGUNDA: 1,
      "SEGUNDA-FEIRA": 1,
      TERCA: 2,
      TERÇA: 2,
      "TERÇA-FEIRA": 2,
      QUARTA: 3,
      "QUARTA-FEIRA": 3,
      QUINTA: 4,
      "QUINTA-FEIRA": 4,
      SEXTA: 5,
      "SEXTA-FEIRA": 5,
      SABADO: 6,
      SÁBADO: 6,
    };

    return alocacoes.sort((a, b) => {
      const diaA = daysMap[a.horario.dia_semana.toUpperCase()] ?? 99;
      const diaB = daysMap[b.horario.dia_semana.toUpperCase()] ?? 99;

      if (diaA !== diaB) return diaA - diaB;

      // Se mesmo dia, ordena por horário
      if (a.horario.horario_inicio < b.horario.horario_inicio) return -1;
      if (a.horario.horario_inicio > b.horario.horario_inicio) return 1;
      return 0;
    });
  }

  async findBySalaId(id_sala: string, page: number) {
    const alocacoes = await prisma.alocacao.findMany({
      where: {
        id_sala,
      },
      take: 20,
      skip: (page - 1) * 20,
      include: {
        user: true,
        disciplina: true,
        cursoDisciplina: true,
        turma: true,
        sala: {
          include: {
            predio: true,
          },
        },
        horario: true,
      },
    });

    return alocacoes;
  }

  async update(id: string, data: Prisma.AlocacaoUpdateInput) {
    const alocacao = await prisma.alocacao.update({
      where: { id },
      data,
      include: {
        user: true,
        disciplina: true,
        cursoDisciplina: true,
        turma: true,
        sala: true,
        horario: true,
      },
    });

    return alocacao;
  }

  async findByDisciplinaId(id_disciplina: string) {
    const alocacoes = await prisma.alocacao.findMany({
      where: { id_disciplina },
      include: {
        user: true,
        disciplina: true,
        cursoDisciplina: true,
        turma: true,
        sala: {
          include: {
            predio: true,
          },
        },
        horario: true,
      },
      orderBy: [
        {
          horario: {
            dia_semana: "asc",
          },
        },
        {
          horario: {
            codigo: "asc",
          },
        },
      ],
    });

    return alocacoes;
  }

  async findByTurnoManha(page: number) {
    const alocacoes = await prisma.alocacao.findMany({
      where: {
        horario: {
          codigo: {
            startsWith: "M",
          },
        },
      },
      take: 20,
      skip: (page - 1) * 20,
      include: {
        user: true,
        disciplina: true,
        cursoDisciplina: true,
        turma: true,
        sala: {
          include: {
            predio: true,
          },
        },
        horario: true,
      },
      orderBy: [
        {
          horario: {
            dia_semana: "asc",
          },
        },
        {
          horario: {
            codigo: "asc",
          },
        },
      ],
    });

    return alocacoes;
  }

  async findByTurmaIdWithTurno(id_turma: string, turno: string, page: number) {
    const alocacoes = await prisma.alocacao.findMany({
      where: {
        id_turma,
        turma: { curso: { isDeleted: null } },
        horario: {
          codigo: {
            startsWith: turno.toUpperCase(),
          },
        },
      },
      take: 100, // AUMENTADO DE 20 PARA 100 PARA EVITAR PAGINAÇÃO NA GRADE
      skip: (page - 1) * 100,
      include: {
        user: true,
        disciplina: true,
        cursoDisciplina: true,
        turma: true,
        sala: {
          include: {
            predio: true,
          },
        },
        horario: true,
      },
      orderBy: [
        {
          horario: {
            dia_semana: "asc",
          },
        },
        {
          horario: {
            codigo: "asc",
          },
        },
      ],
    });

    return alocacoes;
  }

  async deleteAllByTurmaId(id_turma: string) {
    // Usando deleteMany direto, que é eficiente e deve funcionar se não houver constraints restritivas
    await prisma.alocacao.deleteMany({
      where: { id_turma },
    });
  }

  async deleteAllByTurmaAndDisciplina(id_turma: string, id_disciplina: string) {
    await prisma.alocacao.deleteMany({
      where: {
        id_turma,
        id_disciplina,
      },
    });
  }

  async delete(id: string) {
    await prisma.alocacao.delete({
      where: { id },
    });
  }
}
