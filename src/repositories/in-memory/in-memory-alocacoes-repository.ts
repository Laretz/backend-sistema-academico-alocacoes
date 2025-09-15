import { Prisma, Alocacao } from '@prisma/client';
import { AlocacoesRepository } from '../alocacoes-repository';
import { randomUUID } from 'node:crypto';

import { AlocacaoWithRelations } from '../alocacoes-repository';

export class InMemoryAlocacoesRepository implements AlocacoesRepository {
  public items: AlocacaoWithRelations[] = [];

  async create(data: Prisma.AlocacaoCreateInput): Promise<Alocacao> {
    const alocacao: AlocacaoWithRelations = {
      id: randomUUID(),
      id_user: typeof data.user === 'object' && 'connect' in data.user && data.user.connect?.id ? data.user.connect.id : randomUUID(),
      id_disciplina: typeof data.disciplina === 'object' && 'connect' in data.disciplina && data.disciplina.connect?.id ? data.disciplina.connect.id : randomUUID(),
      id_turma: typeof data.turma === 'object' && 'connect' in data.turma && data.turma.connect?.id ? data.turma.connect.id : randomUUID(),
      id_sala: typeof data.sala === 'object' && 'connect' in data.sala && data.sala.connect?.id ? data.sala.connect.id : randomUUID(),
      id_horario: typeof data.horario === 'object' && 'connect' in data.horario && data.horario.connect?.id ? data.horario.connect.id : randomUUID(),
      is_modulo_principal: true,
      created_at: new Date(),
      // Dados mockados para as relações - em um teste real, você forneceria estes dados
      user: {
        id: typeof data.user === 'object' && 'connect' in data.user && data.user.connect?.id ? data.user.connect.id : randomUUID(),
        nome: 'Professor Teste',
        email: 'professor@teste.com',
        especializacao: 'Especialização Teste',
      },
      disciplina: {
        id: typeof data.disciplina === 'object' && 'connect' in data.disciplina && data.disciplina.connect?.id ? data.disciplina.connect.id : randomUUID(),
        nome: 'Disciplina Teste',
        codigo: 'DISC001',
        carga_horaria: 60,
        cargaHorariaTotal: 60,
      },
      turma: {
        id: typeof data.turma === 'object' && 'connect' in data.turma && data.turma.connect?.id ? data.turma.connect.id : randomUUID(),
        nome: 'Turma Teste',
        num_alunos: 30,
        periodo: 1,
        turno: 'MATUTINO',
      },
      sala: {
        id: typeof data.sala === 'object' && 'connect' in data.sala && data.sala.connect?.id ? data.sala.connect.id : randomUUID(),
        nome: 'Sala Teste',
        numero: '101',
        capacidade: 40,
        tipo: 'AULA',
        computadores: 0,
        predioId: randomUUID(),
        ativa: true,
        predio: {
          id: randomUUID(),
          nome: 'Prédio A',
        },
      },
      horario: {
        id: typeof data.horario === 'object' && 'connect' in data.horario && data.horario.connect?.id ? data.horario.connect.id : randomUUID(),
        codigo: 'M1',
        dia_semana: 'SEGUNDA',
        horario_inicio: new Date('2024-01-01T08:00:00'),
        horario_fim: new Date('2024-01-01T09:00:00'),
      },
    };

    this.items.push(alocacao);
    return alocacao;
  }

  async findById(id: string): Promise<AlocacaoWithRelations | null> {
    const alocacao = this.items.find((item) => item.id === id);
    return alocacao || null;
  }

  async findByUserIdAndHorarioId(id_user: string, id_horario: string): Promise<Alocacao | null> {
    const alocacao = this.items.find(
      (item) => item.id_user === id_user && item.id_horario === id_horario
    );
    return alocacao || null;
  }

  async findBySalaIdAndHorarioId(id_sala: string, id_horario: string): Promise<Alocacao | null> {
    const alocacao = this.items.find(
      (item) => item.id_sala === id_sala && item.id_horario === id_horario
    );
    return alocacao || null;
  }

  async findByTurmaIdAndHorarioId(id_turma: string, id_horario: string): Promise<Alocacao | null> {
    const alocacao = this.items.find(
      (item) => item.id_turma === id_turma && item.id_horario === id_horario
    );
    return alocacao || null;
  }

  async findMany(page: number): Promise<AlocacaoWithRelations[]> {
    const startIndex = (page - 1) * 20;
    const endIndex = startIndex + 20;
    return this.items.slice(startIndex, endIndex);
  }

  async findByUserId(id_user: string, page: number): Promise<AlocacaoWithRelations[]> {
    const userAlocacoes = this.items.filter((item) => item.id_user === id_user);
    const startIndex = (page - 1) * 20;
    const endIndex = startIndex + 20;
    return userAlocacoes.slice(startIndex, endIndex);
  }

  async findByTurmaId(id_turma: string, page: number): Promise<AlocacaoWithRelations[]> {
    const turmaAlocacoes = this.items.filter((item) => item.id_turma === id_turma);
    const startIndex = (page - 1) * 20;
    const endIndex = startIndex + 20;
    return turmaAlocacoes.slice(startIndex, endIndex);
  }

  async findAllByTurmaId(id_turma: string): Promise<AlocacaoWithRelations[]> {
    return this.items.filter((item) => item.id_turma === id_turma);
  }

  async findBySalaId(id_sala: string, page: number): Promise<AlocacaoWithRelations[]> {
    const salaAlocacoes = this.items.filter((item) => item.id_sala === id_sala);
    const startIndex = (page - 1) * 20;
    const endIndex = startIndex + 20;
    return salaAlocacoes.slice(startIndex, endIndex);
  }

  async update(id: string, data: Prisma.AlocacaoUpdateInput): Promise<AlocacaoWithRelations> {
    const alocacaoIndex = this.items.findIndex((item) => item.id === id);
    
    if (alocacaoIndex === -1) {
      throw new Error('Alocação não encontrada');
    }

    const alocacao = this.items[alocacaoIndex];
    if (!alocacao) {
      throw new Error('Alocação não encontrada');
    }
    
    // Atualizar campos básicos
    if (data.user && typeof data.user === 'object' && 'connect' in data.user && data.user.connect?.id) {
      alocacao.id_user = data.user.connect.id;
    }
    if (data.disciplina && typeof data.disciplina === 'object' && 'connect' in data.disciplina && data.disciplina.connect?.id) {
      alocacao.id_disciplina = data.disciplina.connect.id;
    }
    if (data.turma && typeof data.turma === 'object' && 'connect' in data.turma && data.turma.connect?.id) {
      alocacao.id_turma = data.turma.connect.id;
    }
    if (data.sala && typeof data.sala === 'object' && 'connect' in data.sala && data.sala.connect?.id) {
      alocacao.id_sala = data.sala.connect.id;
    }
    if (data.horario && typeof data.horario === 'object' && 'connect' in data.horario && data.horario.connect?.id) {
      alocacao.id_horario = data.horario.connect.id;
    }

    this.items[alocacaoIndex] = alocacao;
    return alocacao;
  }

  async delete(id: string): Promise<void> {
    const alocacaoIndex = this.items.findIndex((item) => item.id === id);
    
    if (alocacaoIndex === -1) {
      throw new Error('Alocação não encontrada');
    }

    this.items.splice(alocacaoIndex, 1);
  }

  // Método auxiliar para criar alocações com dados customizados para testes
  async createWithCustomData(alocacaoData: Partial<AlocacaoWithRelations>): Promise<AlocacaoWithRelations> {
    const alocacao: AlocacaoWithRelations = {
      id: alocacaoData.id || randomUUID(),
      id_user: alocacaoData.id_user || randomUUID(),
      id_disciplina: alocacaoData.id_disciplina || randomUUID(),
      id_turma: alocacaoData.id_turma || randomUUID(),
      id_sala: alocacaoData.id_sala || randomUUID(),
      id_horario: alocacaoData.id_horario || randomUUID(),
      is_modulo_principal: alocacaoData.is_modulo_principal !== undefined ? alocacaoData.is_modulo_principal : true,
      created_at: alocacaoData.created_at || new Date(),
      user: alocacaoData.user || {
        id: alocacaoData.id_user || randomUUID(),
        nome: 'Professor Teste',
        email: 'professor@teste.com',
        especializacao: 'Especialização Teste',
      },
      disciplina: alocacaoData.disciplina || {
        id: alocacaoData.id_disciplina || randomUUID(),
        nome: 'Disciplina Teste',
        codigo: 'DISC001',
        carga_horaria: 60,
        cargaHorariaTotal: 60,
      },
      turma: alocacaoData.turma || {
        id: alocacaoData.id_turma || randomUUID(),
        nome: 'Turma Teste',
        num_alunos: 30,
        periodo: 1,
        turno: 'MATUTINO',
      },
      sala: alocacaoData.sala || {
        id: alocacaoData.id_sala || randomUUID(),
        nome: 'Sala Teste',
        numero: '101',
        capacidade: 40,
        tipo: 'AULA',
        computadores: 0,
        predioId: randomUUID(),
        ativa: true,
        predio: {
          id: randomUUID(),
          nome: 'Prédio A',
        },
      },
      horario: alocacaoData.horario || {
        id: alocacaoData.id_horario || randomUUID(),
        codigo: 'M1',
        dia_semana: 'SEGUNDA',
        horario_inicio: new Date('2024-01-01T08:00:00'),
        horario_fim: new Date('2024-01-01T09:00:00'),
      },
    };

    this.items.push(alocacao);
    return alocacao;
  }
}