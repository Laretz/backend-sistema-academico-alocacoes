import { expect, describe, it, beforeEach } from "vitest";
import { BuscarDisciplinasUseCase } from "./buscar-disciplinas";
import { InMemoryDisciplinasRepository } from "../../repositories/in-memory/in-memory-disciplinas-repository";

let disciplinasRepository: InMemoryDisciplinasRepository;
let sut: BuscarDisciplinasUseCase;

describe('Buscar Disciplinas Use Case', () => {
    beforeEach(() => {
        disciplinasRepository = new InMemoryDisciplinasRepository();
        sut = new BuscarDisciplinasUseCase(disciplinasRepository);
    });

    it('deve ser possível buscar disciplinas com paginação', async () => {
        // Criar algumas disciplinas para teste
        await disciplinasRepository.create({
            nome: 'Matemática',
            carga_horaria_total: 80,
        });

        await disciplinasRepository.create({
            nome: 'Física',
            carga_horaria_total: 60,
        });

        await disciplinasRepository.create({
            nome: 'Química',
            carga_horaria_total: 40,
        });

        const { disciplinas } = await sut.execute({
            page: 1,
        });

        expect(disciplinas).toHaveLength(3);
        expect(disciplinas[0].nome).toEqual('Matemática');
        expect(disciplinas[1].nome).toEqual('Física');
        expect(disciplinas[2].nome).toEqual('Química');
    });

    it('deve retornar lista vazia quando não há disciplinas', async () => {
        const { disciplinas } = await sut.execute({
            page: 1,
        });

        expect(disciplinas).toHaveLength(0);
    });

    it('deve ser possível buscar disciplinas em páginas diferentes', async () => {
        // Criar disciplinas suficientes para testar paginação
        for (let i = 1; i <= 25; i++) {
            await disciplinasRepository.create({
                nome: `Disciplina ${i}`,
                cargaHorariaTotal: 40,
            });
        }

        const { disciplinas: primeirasPagina } = await sut.execute({
            page: 1,
        });

        const { disciplinas: segundaPagina } = await sut.execute({
            page: 2,
        });

        expect(primeirasPagina).toHaveLength(20); // Assumindo 20 itens por página
        expect(segundaPagina).toHaveLength(5);
    });
});