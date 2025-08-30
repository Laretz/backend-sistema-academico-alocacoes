import { HorariosRepository } from "../../repositories/horarios-repository";

interface CriarHorarioUseCaseRequest {
    diaSemana: string;
    horarioInicio: Date;
    horarioFim: Date;
}

export class CriarHorarioUseCase {
    constructor(private horariosRepository: HorariosRepository) {}

    async execute({ diaSemana, horarioInicio, horarioFim }: CriarHorarioUseCaseRequest) {
        const horario = await this.horariosRepository.create({
            diaSemana,
            horarioInicio,
            horarioFim,
        });

        return { horario };
    }
}