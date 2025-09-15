import { CursosRepository } from "../../repositories/cursos-repository";

interface BuscarCursosUseCaseRequest {
  page: number;
}

export class BuscarCursosUseCase {
  constructor(private cursosRepository: CursosRepository) {}

  async execute({ page }: BuscarCursosUseCaseRequest) {
    const cursos = await this.cursosRepository.findMany(page);

    return { cursos };
  }
}