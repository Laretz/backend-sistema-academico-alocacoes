import { CursosRepository } from "../../repositories/cursos-repository";

interface CriarCursoUseCaseRequest {
    codigo: string;
    nome: string;
    turno: 'MATUTINO' | 'VESPERTINO' | 'NOTURNO' | 'INTEGRAL';
    duracao_semestres: number;
}

export class CriarCursoUseCase {
    constructor(private cursosRepository: CursosRepository) {}

    async execute({ codigo, nome, turno, duracao_semestres }: CriarCursoUseCaseRequest) {
        const curso = await this.cursosRepository.create({
            codigo,
            nome,
            turno,
            duracao_semestres,
        });

        return { curso };
    }
}