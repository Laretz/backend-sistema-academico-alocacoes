import { Prisma, Horario } from "@prisma/client";
import { HorariosRepository } from "../horarios-repository";
import { randomUUID } from "node:crypto";

export class InMemoryHorariosRepository implements HorariosRepository {
  public items: Horario[] = [];

  async create(data: Prisma.HorarioCreateInput): Promise<Horario> {
    const horario: Horario = {
      id: randomUUID(),
      codigo: data.codigo,
      dia_semana: data.dia_semana,
      horario_inicio: new Date(data.horario_inicio as Date),
      horario_fim: new Date(data.horario_fim as Date),
    };

    this.items.push(horario);
    return horario;
  }

  async findById(id: string): Promise<Horario | null> {
    const horario = this.items.find((h) => h.id === id);
    return horario ?? null;
  }

  async findByDiaEHorario(
    dia_semana: string,
    horario_inicio: Date,
    horario_fim: Date
  ): Promise<Horario | null> {
    const inicioTime = new Date(horario_inicio).getTime();
    const fimTime = new Date(horario_fim).getTime();
    const horario = this.items.find(
      (h) =>
        h.dia_semana === dia_semana &&
        new Date(h.horario_inicio).getTime() === inicioTime &&
        new Date(h.horario_fim).getTime() === fimTime
    );
    return horario ?? null;
  }

  async findMany(page?: number): Promise<Horario[]> {
    // Ordem dos dias (SEGUNDA -> SABADO)
    const ordemDias: Record<string, number> = {
      SEGUNDA: 1,
      TERCA: 2,
      QUARTA: 3,
      QUINTA: 4,
      SEXTA: 5,
      SABADO: 6,
    };

    const getOrdemCodigo = (codigo: string) => {
      const periodo = codigo.charAt(0); // M, T, N
      const numero = parseInt(codigo.charAt(1)) || 0; // 1, 2, 3...
      const ordemPeriodo: Record<string, number> = { M: 0, T: 1, N: 2 };
      return (ordemPeriodo[periodo] ?? 0) * 10 + numero;
    };

    const sorted = [...this.items].sort((a, b) => {
      const diaA = ordemDias[a.dia_semana] ?? 7;
      const diaB = ordemDias[b.dia_semana] ?? 7;

      if (diaA !== diaB) return diaA - diaB;

      return getOrdemCodigo(a.codigo) - getOrdemCodigo(b.codigo);
    });

    if (!page || page <= 1) return sorted;

    const startIndex = (page - 1) * 20;
    const endIndex = startIndex + 20;
    return sorted.slice(startIndex, endIndex);
  }

  async update(id: string, data: Prisma.HorarioUpdateInput): Promise<Horario> {
    const idx = this.items.findIndex((h) => h.id === id);
    if (idx === -1) {
      throw new Error("Horario not found");
    }

    const current = this.items[idx];
    if (!current) {
      throw new Error("Horario not found");
    }
    const updated: Horario = {
      ...current,
      codigo: (data.codigo as string) ?? current.codigo,
      dia_semana: (data.dia_semana as string) ?? current.dia_semana,
      horario_inicio:
        (data.horario_inicio as Date) ?? new Date(current.horario_inicio),
      horario_fim: (data.horario_fim as Date) ?? new Date(current.horario_fim),
    };

    this.items[idx] = updated;
    return updated;
  }

  async delete(id: string): Promise<void> {
    const idx = this.items.findIndex((h) => h.id === id);
    if (idx === -1) {
      throw new Error("Horario not found");
    }
    this.items.splice(idx, 1);
  }
}
