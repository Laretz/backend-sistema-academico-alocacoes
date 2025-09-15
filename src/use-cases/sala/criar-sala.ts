import { SalasRepository } from "../../repositories/salas-repository";

interface CriarSalaUseCaseRequest {
    nome: string;
    predio: string;
    capacidade: number;
    tipo: string;
    computadores?: number;
}

export class CriarSalaUseCase {
    constructor(private salasRepository: SalasRepository) {}

    async execute({ nome, predio, capacidade, tipo, computadores }: CriarSalaUseCaseRequest) {
        const sala = await this.salasRepository.create({
            nome,
            predio,
            capacidade,
            tipo,
            computadores,
        });

        return { sala };
    }
}