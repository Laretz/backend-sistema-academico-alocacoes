import { TurmasRepository } from "../../repositories/turmas-repository";
import { RecursoNaoEncontradoError } from "../errors/recurso-nao-encontrado";

interface AtualizarTurmaUseCaseRequest {
  id: string;
  nome: string | undefined;
  num_alunos: number | undefined;
  periodo: number | undefined;
  turno: string | undefined;
}

export class AtualizarTurmaUseCase {
  constructor(private turmasRepository: TurmasRepository) {}

  async execute({
    id,
    nome,
    num_alunos,
    periodo,
    turno,
  }: AtualizarTurmaUseCaseRequest) {
    const turmaExiste = await this.turmasRepository.findById(id);

    if (!turmaExiste) {
      throw new RecursoNaoEncontradoError();
    }

    // Cria um objeto com apenas os campos que foram fornecidos
    const updateData: Partial<{
      nome: string;
      num_alunos: number;
      periodo: number;
      turno: string;
    }> = {};
    if (nome !== undefined) updateData.nome = nome;
    if (num_alunos !== undefined) updateData.num_alunos = num_alunos;
    if (periodo !== undefined) updateData.periodo = periodo;
    if (turno !== undefined) updateData.turno = turno;

    const turma = await this.turmasRepository.update(id, updateData);

    return { turma };
  }
}
