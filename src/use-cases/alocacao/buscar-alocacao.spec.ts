import { expect, describe, it, beforeEach } from "vitest";
import { BuscarAlocacaoUseCase } from "./buscar-alocacao";
import { InMemoryAlocacoesRepository } from "../../repositories/in-memory/in-memory-alocacoes-repository";
import { RecursoNaoEncontradoError } from "../errors/recurso-nao-encontrado";

let alocacoesRepository: InMemoryAlocacoesRepository;
let sut: BuscarAlocacaoUseCase;

describe('Buscar Alocação Use Case', () => {
    beforeEach(() => {
        alocacoesRepository = new InMemoryAlocacoesRepository();
        sut = new BuscarAlocacaoUseCase(alocacoesRepository);
    });

    it('deve ser possível buscar uma alocação pelo id', async () => {
        const alocacaoCriada = await alocacoesRepository.createWithCustomData({
            id: 'alocacao-1',
            id_user: 'user-1',
            id_disciplina: 'disciplina-1',
            id_turma: 'turma-1',
            id_sala: 'sala-1',
            id_horario: 'horario-1',
        });

        const { alocacao } = await sut.execute({
            id: alocacaoCriada.id,
        });

        expect(alocacao.id).toEqual(alocacaoCriada.id);
        expect(alocacao.id_user).toEqual('user-1');
        expect(alocacao.id_disciplina).toEqual('disciplina-1');
        expect(alocacao.id_turma).toEqual('turma-1');
        expect(alocacao.id_sala).toEqual('sala-1');
        expect(alocacao.id_horario).toEqual('horario-1');
    });

    it('não deve ser possível buscar alocação com id inexistente', async () => {
        await expect(() =>
            sut.execute({
                id: 'id-inexistente',
            })
        ).rejects.toBeInstanceOf(RecursoNaoEncontradoError);
    });
});