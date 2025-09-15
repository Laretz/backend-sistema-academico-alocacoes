import { CursosRepository } from "../../repositories/cursos-repository";
import { RecursoNaoEncontradoError } from "../errors/recurso-nao-encontrado";

interface AtualizarCursoUseCaseRequest {
    id: string;
    nome?: string;
    turno?: 'MATUTINO' | 'VESPERTINO' | 'NOTURNO' | 'INTEGRAL';
    descricao?: string;
}

export class AtualizarCursoUseCase {
    constructor(private cursosRepository: CursosRepository) {}

    async execute({ id, nome, turno, descricao }: AtualizarCursoUseCaseRequest) {
        const cursoExiste = await this.cursosRepository.findById(id);

        if (!cursoExiste) {
            throw new RecursoNaoEncontradoError();
        }

        const curso = await this.cursosRepository.update(id, {
            nome,
            turno,
            descricao,
        });

        return { curso };
    }
}