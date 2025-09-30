import { TurmasRepository } from "../../repositories/turmas-repository";

interface CriarTurmaUseCaseRequest {
  nome: string;
  num_alunos: number;
  periodo: number;
  turno: string;
  id_curso: string;
  semestre?: number;
  ativa?: boolean;
}

export class CriarTurmaUseCase {
  constructor(private turmasRepository: TurmasRepository) {}

  async execute({
    nome,
    num_alunos,
    periodo,
    turno,
    id_curso,
    semestre,
    ativa,
  }: CriarTurmaUseCaseRequest) {
    // Aplicar valores padrão (regras de negócio)
    const semestreDefault = semestre ?? 1;
    const ativaDefault = ativa ?? true;

    const turma = await this.turmasRepository.create({
      nome,
      num_alunos,
      periodo,
      turno,
      semestre: semestreDefault,
      ativa: ativaDefault,
      curso: {
        connect: {
          id: id_curso,
        },
      },
    });

    return { turma };
  }
}
