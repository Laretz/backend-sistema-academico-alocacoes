import { Prisma, Turma } from "@prisma/client";
import { TurmasRepository } from "../turmas-repository";

export class InMemoryTurmasRepository implements TurmasRepository {
  private turmas: Turma[] = [];

  async create(data: Prisma.TurmaCreateInput): Promise<Turma> {
    const turma: Turma = {
      id: `turma-${this.turmas.length + 1}`,
      nome: data.nome,
      num_alunos: data.num_alunos || 30,
      periodo: data.periodo || 1,
      turno: data.turno || 'MATUTINO',
      id_curso: typeof data.curso === 'object' && 'connect' in data.curso && data.curso.connect?.id ? data.curso.connect.id : 'curso-default',
      semestre: data.semestre || 1,
      ativa: data.ativa !== undefined ? data.ativa : true,
    };

    this.turmas.push(turma);

    return turma;
  }

  async findById(id: string): Promise<Turma | null> {
    const turma = this.turmas.find((t) => t.id === id);
    return turma ?? null;
  }

  async findByNome(nome: string): Promise<Turma | null> {
    const turma = this.turmas.find((t) => t.nome === nome);
    return turma ?? null;
  }

  async findMany(page: number): Promise<Turma[]> {
    const startIndex = (page - 1) * 20;
    const endIndex = startIndex + 20;
    return this.turmas.slice(startIndex, endIndex);
  }

  async update(id: string, data: Prisma.TurmaUpdateInput): Promise<Turma> {
    const turmaIndex = this.turmas.findIndex((t) => t.id === id);
    
    if (turmaIndex === -1) {
      throw new Error('Turma não encontrada');
    }

    const turmaAtual = this.turmas[turmaIndex];
    if (!turmaAtual) {
      throw new Error('Turma não encontrada');
    }
    
    const turmaAtualizada: Turma = {
      ...turmaAtual,
      nome: (data.nome as string) ?? turmaAtual.nome,
      num_alunos: (data.num_alunos as number) ?? turmaAtual.num_alunos,
      periodo: (data.periodo as number) ?? turmaAtual.periodo,
      turno: (data.turno as string) ?? turmaAtual.turno,
      id_curso: typeof data.curso === 'object' && 'connect' in data.curso && data.curso.connect?.id ? data.curso.connect.id : turmaAtual.id_curso,
      semestre: (data.semestre as number) ?? turmaAtual.semestre,
      ativa: data.ativa !== undefined ? (data.ativa as boolean) : turmaAtual.ativa,
    };

    this.turmas[turmaIndex] = turmaAtualizada;

    return turmaAtualizada;
  }

  async delete(id: string): Promise<void> {
    const turmaIndex = this.turmas.findIndex((t) => t.id === id);
    
    if (turmaIndex === -1) {
      throw new Error('Turma não encontrada');
    }

    this.turmas.splice(turmaIndex, 1);
  }
}