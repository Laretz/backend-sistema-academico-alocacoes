import { expect, describe, it, beforeEach } from "vitest";
import { AtualizarDisciplinaUseCase } from "./atualizar-disciplina";
import { InMemoryDisciplinasRepository } from "../../repositories/in-memory/in-memory-disciplinas-repository";
import { RecursoNaoEncontradoError } from "../errors/recurso-nao-encontrado";

let disciplinasRepository: InMemoryDisciplinasRepository;
let sut: AtualizarDisciplinaUseCase;

describe('Atualizar Disciplina Use Case', () => {
    beforeEach(() => {
        disciplinasRepository = new InMemoryDisciplinasRepository();
        sut = new AtualizarDisciplinaUseCase(disciplinasRepository);
    });

    it('deve ser possível atualizar uma disciplina', async () => {
        const disciplinaCriada = await disciplinasRepository.create({
            nome: 'Matemática',
            cargaHorariaTotal: 80,
        });

        const { disciplina } = await sut.execute({
            id: disciplinaCriada.id,
            nome: 'Matemática Avançada',
            cargaHorariaTotal: 100,
        });

        expect(disciplina.id).toEqual(disciplinaCriada.id);
        expect(disciplina.nome).toEqual('Matemática Avançada');
        expect(disciplina.cargaHorariaTotal).toEqual(100);
    });

    it('deve ser possível atualizar apenas o nome da disciplina', async () => {
        const disciplinaCriada = await disciplinasRepository.create({
            nome: 'Matemática',
            cargaHorariaTotal: 80,
        });

        const { disciplina } = await sut.execute({
            id: disciplinaCriada.id,
            nome: 'Matemática Básica',
        });

        expect(disciplina.nome).toEqual('Matemática Básica');
        expect(disciplina.cargaHorariaTotal).toEqual(80); // Deve manter o valor original
    });

    it('deve ser possível atualizar apenas a carga horária da disciplina', async () => {
        const disciplinaCriada = await disciplinasRepository.create({
            nome: 'Matemática',
            cargaHorariaTotal: 80,
        });

        const { disciplina } = await sut.execute({
            id: disciplinaCriada.id,
            cargaHorariaTotal: 120,
        });

        expect(disciplina.nome).toEqual('Matemática'); // Deve manter o valor original
        expect(disciplina.cargaHorariaTotal).toEqual(120);
    });

    it('não deve ser possível atualizar disciplina com id inexistente', async () => {
        await expect(() =>
            sut.execute({
                id: 'id-inexistente',
                nome: 'Disciplina Teste',
            })
        ).rejects.toBeInstanceOf(RecursoNaoEncontradoError);
    });
});