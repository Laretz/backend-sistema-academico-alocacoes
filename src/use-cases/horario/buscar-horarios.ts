import { HorariosRepository } from "../../repositories/horarios-repository";

interface BuscarHorariosUseCaseRequest {
    page: number;
}

export class BuscarHorariosUseCase {
    constructor(private horariosRepository: HorariosRepository) {}

    async execute({ page }: BuscarHorariosUseCaseRequest) {
        const horarios = await this.horariosRepository.findMany(page);

        return { horarios };
    }
}