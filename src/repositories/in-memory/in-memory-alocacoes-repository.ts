import { Prisma, Alocacao } from '@prisma/client';
import { AlocacoesRepository } from '../alocacoes-repository';
import { randomUUID } from 'node:crypto';

import { AlocacaoWithRelations } from '../alocacoes-repository';

export class InMemoryAlocacoesRepository implements AlocacoesRepository {
  public items: AlocacaoWithRelations[] = [];

  async create(data: Prisma.AlocacaoCreateInput): Promise<Alocacao> {
    const idUser = (typeof data.user === 'object' && 'connect' in data.user && data.user.connect?.id) ? data.user.connect.id : randomUUID();
    const idDisciplina = (typeof data.disciplina === 'object' && 'connect' in data.disciplina && data.disciplina.connect?.id) ? data.disciplina.connect.id : randomUUID();
    const idCursoDisciplina = (typeof data.cursoDisciplina === 'object' && 'connect' in data.cursoDisciplina && data.cursoDisciplina.connect?.id) ? data.cursoDisciplina.connect.id : randomUUID();
    const idTurma = (typeof data.turma === 'object' && 'connect' in data.turma && data.turma.connect?.id) ? data.turma.connect.id : randomUUID();
    const idSala = (typeof data.sala === 'object' && 'connect' in data.sala && data.sala.connect?.id) ? data.sala.connect.id : randomUUID();
    const idHorario = (typeof data.horario === 'object' && 'connect' in data.horario && data.horario.connect?.id) ? data.horario.connect.id : randomUUID();

    const alocacao: AlocacaoWithRelations = {
      id: randomUUID(),
      id_user: idUser,
      id_disciplina: idDisciplina,
      id_curso_disciplina: idCursoDisciplina,
      id_turma: idTurma,
      id_sala: idSala,
      id_horario: idHorario,
      is_modulo_principal: true,
      created_at: new Date(),
      // Dados mockados para as relações - em um teste real, você forneceria estes dados
      user: {
        id: idUser,
        nome: 'Professor Teste',
        email: 'professor@teste.com',
        senha: 'senha123',
        role: 'PROFESSOR',
        especializacao: 'Especialização Teste',
        carga_horaria_max: 40,
        preferencia: null,
      },
      disciplina: {
        id: idDisciplina,
        nome: 'Disciplina Teste',
        codigo: 'DISC001',
        carga_horaria: 60,
        carga_horaria_atual: 0,
        total_aulas: 30,
        aulas_ministradas: 0,
        tipo_de_sala: 'AULA',
        data_inicio: null,
        data_fim_prevista: null,
        data_fim_real: null,
        periodo_letivo: '2024.1',
        horario_consolidado: null,
        id_curso: randomUUID(),
        semestre: 1,
        obrigatoria: true,
      },
      cursoDisciplina: {
        id: idCursoDisciplina,
        id_curso: randomUUID(),
        id_disciplina: idDisciplina,
      },
      turma: {
        id: idTurma,
        nome: 'Turma Teste',
        num_alunos: 30,
        periodo: 1,
        turno: 'MATUTINO',
        id_curso: randomUUID(),
        ativa: true,
      },
      sala: {
        id: idSala,
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
          codigo: 'PRED001',
          created_at: new Date(),
          updated_at: new Date(),
          descricao: null,
        },
      },
      horario: {
        id: idHorario,
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

  async findByTurma(turmaId: string): Promise<AlocacaoWithRelations[]> {
    return this.items.filter((item) => item.id_turma === turmaId);
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
    if (data.cursoDisciplina && typeof data.cursoDisciplina === 'object' && 'connect' in data.cursoDisciplina && data.cursoDisciplina.connect?.id) {
      alocacao.id_curso_disciplina = data.cursoDisciplina.connect.id;
      alocacao.cursoDisciplina = {
        id: data.cursoDisciplina.connect.id,
        id_curso: alocacao.turma.id_curso,
        id_disciplina: alocacao.id_disciplina,
      };
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
      id_curso_disciplina: alocacaoData.id_curso_disciplina || randomUUID(),
      id_turma: alocacaoData.id_turma || randomUUID(),
      id_sala: alocacaoData.id_sala || randomUUID(),
      id_horario: alocacaoData.id_horario || randomUUID(),
      is_modulo_principal: alocacaoData.is_modulo_principal !== undefined ? alocacaoData.is_modulo_principal : true,
      created_at: alocacaoData.created_at || new Date(),
      user: alocacaoData.user || {
        id: alocacaoData.id_user || randomUUID(),
        nome: 'Professor Teste',
        email: 'professor@teste.com',
        senha: 'senha123',
        role: 'PROFESSOR',
        especializacao: 'Especialização Teste',
        carga_horaria_max: 40,
        preferencia: null,
      },
      disciplina: alocacaoData.disciplina || {
        id: alocacaoData.id_disciplina || randomUUID(),
        nome: 'Disciplina Teste',
        codigo: 'DISC001',
        carga_horaria: 60,
        carga_horaria_atual: 0,
        total_aulas: 30,
        aulas_ministradas: 0,
        tipo_de_sala: 'AULA',
        data_inicio: null,
        data_fim_prevista: null,
        data_fim_real: null,
        periodo_letivo: '2024.1',
        horario_consolidado: null,
        id_curso: randomUUID(),
        semestre: 1,
        obrigatoria: true,
      },
      cursoDisciplina: alocacaoData.cursoDisciplina || {
        id: alocacaoData.id_curso_disciplina || randomUUID(),
        id_curso: randomUUID(),
        id_disciplina: alocacaoData.id_disciplina || randomUUID(),
      },
      turma: alocacaoData.turma || {
        id: alocacaoData.id_turma || randomUUID(),
        nome: 'Turma Teste',
        num_alunos: 30,
        periodo: 1,
        turno: 'MATUTINO',
        id_curso: randomUUID(),
        ativa: true,
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
          codigo: 'PRED001',
          created_at: new Date(),
          updated_at: new Date(),
          descricao: null,
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

  async findByDisciplinaId(id_disciplina: string): Promise<AlocacaoWithRelations[]> {
    return this.items.filter(item => item.id_disciplina === id_disciplina);
  }

  async findByPeriodoManha(page: number): Promise<AlocacaoWithRelations[]> {
    // Filtra alocações do período da manhã (horários que começam antes das 12:00)
    const alocacoesManha = this.items.filter(item => {
      const horarioInicio = new Date(item.horario.horario_inicio);
      return horarioInicio.getHours() < 12;
    });
    
    const startIndex = (page - 1) * 20;
    const endIndex = startIndex + 20;
    return alocacoesManha.slice(startIndex, endIndex);
  }

  async findByTurmaIdWithPeriodo(id_turma: string, periodo: string, page: number): Promise<AlocacaoWithRelations[]> {
    // Filtra alocações por turma e período
    const alocacoesFiltradas = this.items.filter(item => {
      if (item.id_turma !== id_turma) return false;
      
      const horarioInicio = new Date(item.horario.horario_inicio);
      const hora = horarioInicio.getHours();
      
      switch (periodo.toLowerCase()) {
        case 'manha':
        case 'matutino':
          return hora < 12;
        case 'tarde':
        case 'vespertino':
          return hora >= 12 && hora < 18;
        case 'noite':
        case 'noturno':
          return hora >= 18;
        default:
          return true;
      }
    });
    
    const startIndex = (page - 1) * 20;
    const endIndex = startIndex + 20;
    return alocacoesFiltradas.slice(startIndex, endIndex);
  }

  async deleteAllByTurmaId(id_turma: string): Promise<void> {
    // Remove todas as alocações da turma especificada
    this.items = this.items.filter(item => item.id_turma !== id_turma);
  }
}