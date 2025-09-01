import { expect, describe, it, beforeEach } from "vitest";
import { ExcluirAlocacaoUseCase } from "./excluir-alocacao";
import { InMemoryAlocacoesRepository } from "../../repositories/in-memory/in-memory-alocacoes-repository";
import { RecursoNaoEncontradoError } from "../errors/recurso-nao-encontrado";

let alocacoesRepository: InMemoryAlocacoesRepository;
let sut: ExcluirAlocacaoUseCase;

describe('Excluir Alocação Use Case', () => {
    beforeEach(() => {
        alocacoesRepository = new InMemoryAlocacoesRepository();
        sut = new ExcluirAlocacaoUseCase(alocacoesRepository);
    });

    it('deve ser possível excluir uma alocação', async () => {
        const alocacaoCriada = await alocacoesRepository.createWithCustomData({
            id: 'alocacao-1',
            id_user: 'user-1',
            id_disciplina: 'disciplina-1',
            id_turma: 'turma-1',
            id_sala: 'sala-1',
            id_horario: 'horario-1',
        });

        await sut.execute({
            id: alocacaoCriada.id,
        });

        // Verifica se a alocação foi realmente excluída
        const alocacaoExcluida = await alocacoesRepository.findById(alocacaoCriada.id);
        expect(alocacaoExcluida).toBeNull();
    });

    it('não deve ser possível excluir alocação com id inexistente', async () => {
        await expect(() =>
            sut.execute({
                id: 'id-inexistente',
            })
        ).rejects.toBeInstanceOf(RecursoNaoEncontradoError);
    });

    it('deve ser possível excluir uma alocação e manter outras intactas', async () => {
        const alocacao1 = await alocacoesRepository.createWithCustomData({
            id: 'alocacao-1',
            id_user: 'user-1',
            id_disciplina: 'disciplina-1',
            id_turma: 'turma-1',
            id_sala: 'sala-1',
            id_horario: 'horario-1',
        });

        const alocacao2 = await alocacoesRepository.createWithCustomData({
            id: 'alocacao-2',
            id_user: 'user-2',
            id_disciplina: 'disciplina-2',
            id_turma: 'turma-2',
            id_sala: 'sala-2',
            id_horario: 'horario-2',
        });

        await sut.execute({
            id: alocacao1.id,
        });

        // Verifica se apenas a alocacao1 foi excluída
        const alocacao1Excluida = await alocacoesRepository.findById(alocacao1.id);
        const alocacao2Mantida = await alocacoesRepository.findById(alocacao2.id);

        expect(alocacao1Excluida).toBeNull();
        expect(alocacao2Mantida).not.toBeNull();
        expect(alocacao2Mantida?.id_user).toEqual('user-2');
    });
});