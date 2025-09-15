import { Prisma, Disciplina, TipoDeSala } from "@prisma/client";
import { DisciplinasRepository } from "../disciplinas-repository";

export class InMemoryDisciplinasRepository implements DisciplinasRepository {
  private disciplinas: Disciplina[] = [];

  async create(data: Prisma.DisciplinaCreateInput): Promise<Disciplina> {
    const disciplina: Disciplina = {
      id: `disciplina-${this.disciplinas.length + 1}`,
      nome: data.nome,
      carga_horaria: (data.carga_horaria as number) || 60,
      carga_horaria_atual: data.carga_horaria_atual || 0,
      total_aulas: data.total_aulas || 72,
      aulas_ministradas: data.aulas_ministradas || 0,
      tipo_de_sala: (data.tipo_de_sala as TipoDeSala) || 'Sala',
      data_inicio: data.data_inicio ? new Date(data.data_inicio as string) : null,
      data_fim_prevista: data.data_fim_prevista ? new Date(data.data_fim_prevista as string) : null,
      data_fim_real: data.data_fim_real ? new Date(data.data_fim_real as string) : null,
      periodo_letivo: data.periodo_letivo || null,
      horario_consolidado: data.horario_consolidado || null,
      codigo: data.codigo || null,
      id_curso: typeof data.curso === 'object' && 'connect' in data.curso ? data.curso.connect!.id : '',
      semestre: data.semestre || 1,
      obrigatoria: data.obrigatoria !== undefined ? data.obrigatoria : true,
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
      carga_horaria: data.carga_horaria as number ?? disciplina.carga_horaria,
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