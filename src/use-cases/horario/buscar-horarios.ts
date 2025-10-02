import { HorariosRepository } from "../../repositories/horarios-repository";

export class BuscarHorariosUseCase {
    constructor(private horariosRepository: HorariosRepository) {}

    async execute() {
        const horarios = await this.horariosRepository.findMany();

        if (!horarios) {
            return { horarios: [] };
        }

        return { horarios };
    }
}