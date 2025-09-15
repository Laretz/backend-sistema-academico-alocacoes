import { DisciplinasRepository } from "../../repositories/disciplinas-repository";
import { RecursoNaoEncontradoError } from "../errors/recurso-nao-encontrado";

interface AtualizarDisciplinaUseCaseRequest {
  id: string;
  nome?: string | undefined;
  carga_horaria?: number | undefined;
  tipo_de_sala?: 'Sala' | 'Lab' | undefined;
  data_inicio?: Date | undefined;
  data_fim_prevista?: Date | undefined;
  data_fim_real?: Date | undefined;
}

export class AtualizarDisciplinaUseCase {
  constructor(private disciplinasRepository: DisciplinasRepository) {}

  async execute({
    id,
    nome,
    carga_horaria,
    tipo_de_sala,
    data_inicio,
    data_fim_prevista,
    data_fim_real,
  }: AtualizarDisciplinaUseCaseRequest) {
    const disciplinaExiste = await this.disciplinasRepository.findById(id);

    if (!disciplinaExiste) {
      throw new RecursoNaoEncontradoError();
    }

    // Cria um objeto com apenas os campos que foram fornecidos
    const updateData: Partial<{
      nome: string;
      carga_horaria: number;
      tipo_de_sala: 'Sala' | 'Lab';
      data_inicio: Date;
      data_fim_prevista: Date;
      data_fim_real: Date;
    }> = {};
    if (nome !== undefined) updateData.nome = nome;
    if (carga_horaria !== undefined) updateData.carga_horaria = carga_horaria;
    if (tipo_de_sala !== undefined) updateData.tipo_de_sala = tipo_de_sala;
    if (data_inicio !== undefined) updateData.data_inicio = data_inicio;
    if (data_fim_prevista !== undefined) updateData.data_fim_prevista = data_fim_prevista;
    if (data_fim_real !== undefined) updateData.data_fim_real = data_fim_real;
    
    const disciplina = await this.disciplinasRepository.update(id, updateData);

    return { disciplina };
  }
}
