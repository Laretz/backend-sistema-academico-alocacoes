import { Prisma, Disciplina } from "@prisma/client";
import { DisciplinasRepository } from "../disciplinas-repository";

export class InMemoryDisciplinasRepository implements DisciplinasRepository {
  private disciplinas: Disciplina[] = [];

  async create(data: Prisma.DisciplinaCreateInput): Promise<Disciplina> {
    const disciplina: Disciplina = {
      id: `disciplina-${this.disciplinas.length + 1}`,
      nome: data.nome,
      cargaHorariaTotal: data.cargaHorariaTotal,
    };

    this.disciplinas.push(disciplina);

    return disciplina;
  }

  async findById(id: string): Promise<Disciplina | null> {
    const disciplina = this.disciplinas.find((d) => d.id === id);
    return disciplina ?? null;
  }

  async findByNome(nome: string): Promise<Disciplina | null> {
    const disciplina = this.disciplinas.find((d) => d.nome === nome);
    return disciplina ?? null;
  }

  async findMany(page: number): Promise<Disciplina[]> {
    const itemsPerPage = 20;
    const startIndex = (page - 1) * itemsPerPage;
    return this.disciplinas.slice(startIndex, startIndex + itemsPerPage);
  }

  async update(id: string, data: Prisma.DisciplinaUpdateInput): Promise<Disciplina> {
    const disciplinaIndex = this.disciplinas.findIndex((d) => d.id === id);
    
    if (disciplinaIndex === -1) {
      throw new Error('Disciplina não encontrada');
    }

    const disciplina = this.disciplinas[disciplinaIndex];
    
    this.disciplinas[disciplinaIndex] = {
      ...disciplina,
      nome: data.nome as string ?? disciplina.nome,
      cargaHorariaTotal: data.cargaHorariaTotal as number ?? disciplina.cargaHorariaTotal,
    };

    return this.disciplinas[disciplinaIndex];
  }

  async delete(id: string): Promise<void> {
    const disciplinaIndex = this.disciplinas.findIndex((d) => d.id === id);
    
    if (disciplinaIndex === -1) {
      throw new Error('Disciplina não encontrada');
    }

    this.disciplinas.splice(disciplinaIndex, 1);
  }
}