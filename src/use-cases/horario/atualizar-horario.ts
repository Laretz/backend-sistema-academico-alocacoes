import { HorariosRepository } from "../../repositories/horarios-repository";
import { RecursoNaoEncontradoError } from "../errors/recurso-nao-encontrado";

interface AtualizarHorarioUseCaseRequest {
    id: string;
    diaSemana: string | undefined;
    horarioInicio: Date | undefined;
    horarioFim: Date | undefined;
}

export class AtualizarHorarioUseCase {
    constructor(private horariosRepository: HorariosRepository) {}

    async execute({ id, diaSemana, horarioInicio, horarioFim }: AtualizarHorarioUseCaseRequest) {
        const horarioExiste = await this.horariosRepository.findById(id);

        if (!horarioExiste) {
            throw new RecursoNaoEncontradoError();
        }

        // Cria um objeto com apenas os campos que foram fornecidos
        const updateData: any = {};
        if (diaSemana !== undefined) updateData.diaSemana = diaSemana;
        if (horarioInicio !== undefined) updateData.horarioInicio = horarioInicio;
        if (horarioFim !== undefined) updateData.horarioFim = horarioFim;
        
        const horario = await this.horariosRepository.update(id, updateData);

        return { horario };
    }
}