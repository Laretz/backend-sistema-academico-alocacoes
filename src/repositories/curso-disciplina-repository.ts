export interface CursoDisciplina {
  id: string;
  id_curso: string;
  id_disciplina: string;
}

export interface CursoDisciplinaRepository {
  findById(id: string): Promise<CursoDisciplina | null>;
  findFirstByCursoAndDisciplina(id_curso: string, id_disciplina: string): Promise<CursoDisciplina | null>;
  create(data: { id_curso: string; id_disciplina: string }): Promise<CursoDisciplina>;
}