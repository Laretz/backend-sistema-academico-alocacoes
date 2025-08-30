import { DisciplinasRepository } from "../../repositories/disciplinas-repository";
import { RecursoNaoEncontradoError } from "../errors/recurso-nao-encontrado";

interface AtualizarDisciplinaUseCaseRequest {
  id: string;
  nome?: string | undefined;
  cargaHorariaTotal?: number | undefined;
}

export class AtualizarDisciplinaUseCase {
  constructor(private disciplinasRepository: DisciplinasRepository) {}

  async execute({
    id,
    nome,
    cargaHorariaTotal,
  }: AtualizarDisciplinaUseCaseRequest) {
    const disciplinaExiste = await this.disciplinasRepository.findById(id);

    if (!disciplinaExiste) {
      throw new RecursoNaoEncontradoError();
    }

    // Cria um objeto com apenas os campos que foram fornecidos
    const updateData: any = {};
    if (nome !== undefined) updateData.nome = nome;
    if (cargaHorariaTotal !== undefined) updateData.cargaHorariaTotal = cargaHorariaTotal;
    
    const disciplina = await this.disciplinasRepository.update(id, updateData);

    return { disciplina };
  }
}
