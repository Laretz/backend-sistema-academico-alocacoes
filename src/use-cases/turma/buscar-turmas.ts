import { TurmasRepository } from "../../repositories/turmas-repository";

interface BuscarTurmasUseCaseRequest {
    page: number;
}

export class BuscarTurmasUseCase {
    constructor(private turmasRepository: TurmasRepository) {}

    async execute({ page }: BuscarTurmasUseCaseRequest) {
        const turmas = await this.turmasRepository.findMany(page);

        return { turmas };
    }
}