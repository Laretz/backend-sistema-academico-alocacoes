import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import {
  createReservaSalaSchema,
  reservaSalaCoreSchema,
} from "@/schemas/reserva-sala";
import { randomUUID } from "crypto";

// Helpers pequenos para reduzir complexidade e padronizar comportamentos
function ensureDateString(input: string | Date | null | undefined): string {
  if (!input) return "";
  if (typeof input === "string") return input; // esperado YYYY-MM-DD
  if (input instanceof Date) return input.toISOString().slice(0, 10);
  return String(input);
}

function parseDateUTC(dateStr: string): Date {
  return new Date(`${dateStr}T00:00:00.000Z`);
}

function getDiaSemanaKeyUTC(date: Date): string {
  const map: Record<number, string> = {
    0: "DOMINGO",
    1: "SEGUNDA",
    2: "TERCA",
    3: "QUARTA",
    4: "QUINTA",
    5: "SEXTA",
    6: "SABADO",
  };
  const dia = map[date.getUTCDay()];
  return dia || "";
}

function buildWeeklyDatesUTC(start: Date, end: Date): Date[] {
  const result: Date[] = [];
  const cursor = new Date(start);
  while (cursor <= end) {
    result.push(new Date(cursor));
    cursor.setUTCDate(cursor.getUTCDate() + 7);
  }
  return result;
}

function respondBadRequest(
  reply: FastifyReply,
  code: string,
  message: string,
  details?: unknown
) {
  return reply.status(400).send({ code, message, details });
}

function respondConflict(
  reply: FastifyReply,
  message: string,
  conflicts: { type: "ALOCACAO" | "RESERVA"; date?: string }[]
) {
  return reply.status(409).send({ message, conflicts });
}

type StatusReserva = "ATIVA" | "CANCELADA";

function serializeReserva(reserva: any) {
  const status: StatusReserva =
    reserva.status === "CANCELADA" ? "CANCELADA" : "ATIVA";
  return {
    id: String(reserva.id),
    salaId: String(reserva.salaId),
    horarioId: String(reserva.horarioId),
    date:
      reserva.date instanceof Date
        ? reserva.date.toISOString().slice(0, 10)
        : String(reserva.date),
    titulo: String(reserva.titulo),
    descricao: reserva.descricao ?? null,
    criado_por: String(reserva.criado_por),
    status,
    recurrenceRule: reserva.recurrenceRule ?? null,
    recurrenceEnd: reserva.recurrenceEnd
      ? reserva.recurrenceEnd instanceof Date
        ? reserva.recurrenceEnd.toISOString().slice(0, 10)
        : String(reserva.recurrenceEnd)
      : null,
    seriesId: reserva.seriesId ?? null,
    created_at:
      reserva.created_at instanceof Date
        ? reserva.created_at.toISOString()
        : String(reserva.created_at),
    updated_at:
      reserva.updated_at instanceof Date
        ? reserva.updated_at.toISOString()
        : String(reserva.updated_at),
    criadorNome: reserva.criadoPor?.nome,
  };
}

export async function criarReservaSala(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const body = createReservaSalaSchema.parse(request.body);
  console.log("[POST /reservas-sala] body:", body);

  const userId = request.user?.sub;
  console.log("[POST /reservas-sala] userId:", userId);
  if (!userId) {
    return reply.status(401).send({ message: "Usuário não autenticado" });
  }
  const creatorId: string = userId;

  // Garantir tipo string ao parse
  const startDateStr = ensureDateString(body.date);
  const startDate = parseDateUTC(startDateStr);
  if (!startDateStr || Number.isNaN(startDate.getTime())) {
    return respondBadRequest(
      reply,
      "DATA_INVALIDA",
      "A data informada é inválida."
    );
  }

  const horario = await prisma.horario.findUnique({
    where: { id: body.horarioId },
  });
  if (!horario) {
    return respondBadRequest(
      reply,
      "HORARIO_INEXISTENTE",
      "O horário informado não existe."
    );
  }

  const diaDate = getDiaSemanaKeyUTC(startDate);
  console.log(
    "[POST /reservas-sala] dia selecionado:",
    diaDate,
    "| horario.dia_semana:",
    horario.dia_semana
  );
  if (horario.dia_semana && horario.dia_semana !== diaDate) {
    return respondBadRequest(
      reply,
      "DATA_INCOMPATIVEL_DIA_SEMANA",
      "A data informada não condiz com o dia da semana do horário.",
      {
        diaSelecionado: diaDate,
        esperado: horario.dia_semana,
      }
    );
  }

  let dates: Date[] = [startDate];
  let seriesId: string | undefined;

  if (body.recurrenceRule === "WEEKLY") {
    if (!body.recurrenceEnd) {
      return respondBadRequest(
        reply,
        "RECURRENCE_END_OBRIGATORIO",
        "recurrenceEnd é obrigatório para recorrência semanal."
      );
    }
    const endDateStr = ensureDateString(body.recurrenceEnd);
    const endDate = parseDateUTC(endDateStr);
    if (!endDateStr || Number.isNaN(endDate.getTime())) {
      return respondBadRequest(
        reply,
        "RECURRENCE_END_INVALIDO",
        "recurrenceEnd inválido."
      );
    }

    seriesId = randomUUID();
    dates = buildWeeklyDatesUTC(startDate, endDate);
  }

  console.log(
    "[POST /reservas-sala] dates:",
    dates.map((d) => d.toISOString().slice(0, 10))
  );

  const conflicts: { type: "ALOCACAO" | "RESERVA"; date?: string }[] = [];

  // 1) Verificar reservas existentes por dia (prioridade)
  for (const d of dates) {
    const existente = await prisma.reservaSala.findFirst({
      where: {
        salaId: body.salaId,
        horarioId: body.horarioId,
        date: d,
        status: "ATIVA",
      },
    });
    if (existente) {
      conflicts.push({ type: "RESERVA", date: d.toISOString().slice(0, 10) });
    }
  }

  // 2) Validar alocação ativa para a sala/horário
  const alocacao = await prisma.alocacao.findFirst({
    where: {
      id_sala: body.salaId,
      id_horario: body.horarioId,
    },
  });
  if (alocacao) {
    conflicts.push({ type: "ALOCACAO" });
  }

  console.log("[POST /reservas-sala] conflicts:", conflicts);

  if (conflicts.length > 0) {
    const hasReserva = conflicts.some((c) => c.type === "RESERVA");
    const hasAlocacao = conflicts.some((c) => c.type === "ALOCACAO");

    let message = "Conflito de alocação ou reserva.";

    if (hasReserva && !hasAlocacao) {
      message =
        "Já existe uma reserva ativa para esta sala e horário na(s) data(s) selecionada(s).";
    } else if (!hasReserva && hasAlocacao) {
      message =
        "Existe uma alocação ativa para esta sala e horário; não é possível criar reserva.";
    }

    return respondConflict(reply, message, conflicts);
  }

  const created = await prisma.$transaction(async (tx) => {
    const records: any[] = [];
    for (const d of dates) {
      const reserva = await tx.reservaSala.create({
        data: {
          salaId: body.salaId,
          horarioId: body.horarioId,
          date: d,
          titulo: body.titulo,
          descricao: body.descricao ?? null,
          criado_por: creatorId,
          recurrenceRule: body.recurrenceRule ?? null,
          recurrenceEnd: body.recurrenceRule
            ? body.recurrenceEnd
              ? parseDateUTC(ensureDateString(body.recurrenceEnd))
              : null
            : null,
          seriesId: seriesId ?? null,
        },
        include: { criadoPor: { select: { id: true, nome: true } } },
      });
      records.push(reserva);
    }
    return records;
  });

  console.log("[POST /reservas-sala] created count:", created.length);
  if (created.length > 0) {
    const sample = created[0];
    console.log("[POST /reservas-sala] sample created:", {
      id: sample.id,
      titulo: sample.titulo,
      date:
        sample.date instanceof Date
          ? sample.date.toISOString().slice(0, 10)
          : String(sample.date),
      criado_por: sample.criado_por,
      criadorNome: sample.criadoPor?.nome,
    });
  }

  const reservasSerialized = created.map(serializeReserva);

  // Debug: validar primeiro item individualmente com checagem segura
  const first =
    reservasSerialized.length > 0 ? reservasSerialized[0] : undefined;
  if (first) {
    const firstCheck = reservaSalaCoreSchema.safeParse(first);
    if (!firstCheck.success) {
      console.log(
        "[POST /reservas-sala] first item issues:",
        firstCheck.error.issues
      );
      console.log(
        "[POST /reservas-sala] first item payload:",
        JSON.stringify(first, null, 2)
      );
      console.log("[POST /reservas-sala] first item types:", {
        id: typeof first.id,
        salaId: typeof first.salaId,
        horarioId: typeof first.horarioId,
        date: typeof first.date,
        titulo: typeof first.titulo,
        descricao: typeof first.descricao,
        criado_por: typeof first.criado_por,
        status: typeof first.status,
        recurrenceRule: typeof first.recurrenceRule,
        recurrenceEnd: typeof first.recurrenceEnd,
        seriesId: typeof first.seriesId,
        created_at: typeof first.created_at,
        updated_at: typeof first.updated_at,
        criadorNome: typeof (first as any).criadorNome,
      });
    }
  }

  type Response201 = { reservas: z.infer<typeof reservaSalaCoreSchema>[] };
  const payload: Response201 = { reservas: reservasSerialized };

  const Reserva201Schema = z.object({
    reservas: z.array(reservaSalaCoreSchema),
  });

  const parsed = Reserva201Schema.safeParse(payload);
  if (!parsed.success) {
    console.error(
      "[reservas-sala] Resposta 201 inválida:",
      parsed.error.issues
    );
    console.log(
      "[reservas-sala] payload inválido:",
      JSON.stringify(payload, null, 2)
    );
    return reply.status(500).send({
      error: "Erro de Resposta",
      message: "Ocorreu um erro ao formatar a resposta do servidor.",
      issues: parsed.error.issues,
    });
  }

  console.log(
    "[POST /reservas-sala] payload final:",
    JSON.stringify(payload, null, 2)
  );
  return reply.status(201).send(payload);
}
