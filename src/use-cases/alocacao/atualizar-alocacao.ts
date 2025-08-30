import { AlocacoesRepository } from "../../repositories/alocacoes-repository";
import { RecursoNaoEncontradoError } from "../errors/recurso-nao-encontrado";

interface AtualizarAlocacaoUseCaseRequest {
    id: string;
    id_user: string | undefined;
    id_disciplina: string | undefined;
    id_turma: string | undefined;
    id_sala: string | undefined;
    id_horario: string | undefined;
}

export class AtualizarAlocacaoUseCase {
    constructor(private alocacoesRepository: AlocacoesRepository) {}

    async execute({ id, id_user, id_disciplina, id_turma, id_sala, id_horario }: AtualizarAlocacaoUseCaseRequest) {
        const alocacaoExiste = await this.alocacoesRepository.findById(id);

        if (!alocacaoExiste) {
            throw new RecursoNaoEncontradoError();
        }

        // Cria um objeto com apenas os campos que foram fornecidos
        const updateData: any = {};
        
        if (id_user !== undefined) {
            updateData.user = {
                connect: { id: id_user }
            };
        }
        
        if (id_disciplina !== undefined) {
            updateData.disciplina = {
                connect: { id: id_disciplina }
            };
        }
        
        if (id_turma !== undefined) {
            updateData.turma = {
                connect: { id: id_turma }
            };
        }
        
        if (id_sala !== undefined) {
            updateData.sala = {
                connect: { id: id_sala }
            };
        }
        
        if (id_horario !== undefined) {
            updateData.horario = {
                connect: { id: id_horario }
            };
        }
        
        const alocacao = await this.alocacoesRepository.update(id, updateData);

        return { alocacao };
    }
}