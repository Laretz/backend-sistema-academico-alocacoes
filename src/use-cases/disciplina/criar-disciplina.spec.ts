import { expect, describe, it, beforeEach } from "vitest";
import { CriarDisciplinaUseCase } from "./criar-disciplina";
import { InMemoryDisciplinasRepository } from "../../repositories/in-memory/in-memory-disciplinas-repository";

let disciplinasRepository: InMemoryDisciplinasRepository;
let sut: CriarDisciplinaUseCase;

describe('Criar Disciplina Use Case', () => {
    beforeEach(() => {
        disciplinasRepository = new InMemoryDisciplinasRepository();
        sut = new CriarDisciplinaUseCase(disciplinasRepository);
    });

    it('deve ser possível criar uma nova disciplina', async () => {
        const { disciplina } = await sut.execute({
            nome: 'Matemática',
            cargaHorariaTotal: 80,
        });

        expect(disciplina.id).toEqual(expect.any(String));
        expect(disciplina.nome).toEqual('Matemática');
        expect(disciplina.cargaHorariaTotal).toEqual(80);
    });

    it('deve ser possível criar disciplinas com nomes diferentes', async () => {
        const { disciplina: disciplina1 } = await sut.execute({
            nome: 'Matemática',
            cargaHorariaTotal: 80,
        });

        const { disciplina: disciplina2 } = await sut.execute({
            nome: 'Física',
            cargaHorariaTotal: 60,
        });

        expect(disciplina1.nome).toEqual('Matemática');
        expect(disciplina2.nome).toEqual('Física');
        expect(disciplina1.id).not.toEqual(disciplina2.id);
    });
});