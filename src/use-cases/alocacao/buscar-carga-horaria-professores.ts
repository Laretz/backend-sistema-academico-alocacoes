import { AlocacoesRepository } from "../../repositories/alocacoes-repository";
import { UsersRepository } from "../../repositories/users-repository";

export class BuscarCargaHorariaProfessoresUseCase {
  constructor(
    private alocacoesRepository: AlocacoesRepository,
    private usersRepository: UsersRepository
  ) {}

  async execute() {
    // Buscar todos os usuários (todas as páginas) e filtrar apenas professores
    let todosUsuarios = [];
    let page = 1;
    let usuariosPagina;

    do {
      usuariosPagina = await this.usersRepository.findMany(page, "");
      todosUsuarios.push(...usuariosPagina);
      page++;
    } while (usuariosPagina.length === 20);

    const professores = todosUsuarios.filter(
      (user) => user.role === "PROFESSOR"
    );

    const cargaHoraria: Record<string, number> = {};

    // Para cada professor, contar suas alocações
    for (const professor of professores) {
      try {
        // Buscar todas as alocações do professor (sem paginação)
        let todasAlocacoes = [];
        let page = 1;
        let alocacoesPagina;

        do {
          alocacoesPagina = await this.alocacoesRepository.findByUserId(
            professor.id,
            page
          );
          todasAlocacoes.push(...alocacoesPagina);
          page++;
        } while (alocacoesPagina.length === 20);

        cargaHoraria[professor.id] = todasAlocacoes.length;
      } catch (error) {
        console.error(
          `Erro ao buscar alocações do professor ${professor.id}:`,
          error
        );
        cargaHoraria[professor.id] = 0;
      }
    }

    return {
      cargaHoraria,
    };
  }
}
