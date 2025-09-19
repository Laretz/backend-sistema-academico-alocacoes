import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function criarDisciplinasSolicitadas() {
  console.log("🎓 Criando disciplinas solicitadas...");

  try {
    // Disciplinas para criar
    const disciplinas = [
      {
        codigo: "TAD0103",
        nome: "Banco de dados",
        carga_horaria: 60,
        total_aulas: Math.ceil((60 * 60) / 50), // Calculando total de aulas (60h * 60min / 50min por aula)
        tipo_de_sala: "Sala" as const,
        semestre: 2,
        id_curso: "d8ed9a8a-eca4-43be-aa58-eb7254c1bd30",
        periodo_letivo: "2024.2",
        obrigatoria: true,
        carga_horaria_atual: 0,
        aulas_ministradas: 0,
        data_inicio: null,
        data_fim_prevista: null,
        data_fim_real: null,
        horario_consolidado: null,
      },
      {
        codigo: "TAD0009",
        nome: "Programação Orientada a Objetos",
        carga_horaria: 60,
        total_aulas: Math.ceil((60 * 60) / 50),
        tipo_de_sala: "Sala" as const,
        semestre: 2,
        id_curso: "d8ed9a8a-eca4-43be-aa58-eb7254c1bd30",
        periodo_letivo: "2024.2",
        obrigatoria: true,
        carga_horaria_atual: 0,
        aulas_ministradas: 0,
        data_inicio: null,
        data_fim_prevista: null,
        data_fim_real: null,
        horario_consolidado: null,
      },
      {
        codigo: "TAD0111",
        nome: "Programação Visual e Autoria Web",
        carga_horaria: 60,
        total_aulas: Math.ceil((60 * 60) / 50),
        tipo_de_sala: "Sala" as const,
        semestre: 2,
        id_curso: "d8ed9a8a-eca4-43be-aa58-eb7254c1bd30",
        periodo_letivo: "2024.2",
        obrigatoria: true,
        carga_horaria_atual: 0,
        aulas_ministradas: 0,
        data_inicio: null,
        data_fim_prevista: null,
        data_fim_real: null,
        horario_consolidado: null,
      },
      {
        codigo: "TAD0012",
        nome: "Processo de Desenvolvimento de Software",
        carga_horaria: 45,
        total_aulas: Math.ceil((45 * 60) / 50),
        tipo_de_sala: "Sala" as const,
        semestre: 2,
        id_curso: "d8ed9a8a-eca4-43be-aa58-eb7254c1bd30",
        periodo_letivo: "2024.2",
        obrigatoria: true,
        carga_horaria_atual: 0,
        aulas_ministradas: 0,
        data_inicio: null,
        data_fim_prevista: null,
        data_fim_real: null,
        horario_consolidado: null,
      },
      {
        codigo: "TAD0013",
        nome: "Matemática Aplicada II",
        carga_horaria: 60,
        total_aulas: Math.ceil((60 * 60) / 50),
        tipo_de_sala: "Sala" as const,
        semestre: 2,
        id_curso: "d8ed9a8a-eca4-43be-aa58-eb7254c1bd30",
        periodo_letivo: "2024.2",
        obrigatoria: true,
        carga_horaria_atual: 0,
        aulas_ministradas: 0,
        data_inicio: null,
        data_fim_prevista: null,
        data_fim_real: null,
        horario_consolidado: null,
      },
      {
        codigo: "TAD0114",
        nome: "Redes de Computadores",
        carga_horaria: 60,
        total_aulas: Math.ceil((60 * 60) / 50),
        tipo_de_sala: "Sala" as const,
        semestre: 2,
        id_curso: "d8ed9a8a-eca4-43be-aa58-eb7254c1bd30",
        periodo_letivo: "2024.2",
        obrigatoria: true,
        carga_horaria_atual: 0,
        aulas_ministradas: 0,
        data_inicio: null,
        data_fim_prevista: null,
        data_fim_real: null,
        horario_consolidado: null,
      },
      {
        codigo: "TAD0016",
        nome: "Vertentes Produtivas nas Ciências Agrárias",
        carga_horaria: 45,
        total_aulas: Math.ceil((45 * 60) / 50),
        tipo_de_sala: "Sala" as const,
        semestre: 2,
        id_curso: "d8ed9a8a-eca4-43be-aa58-eb7254c1bd30",
        periodo_letivo: "2024.2",
        obrigatoria: true,
        carga_horaria_atual: 0,
        aulas_ministradas: 0,
        data_inicio: null,
        data_fim_prevista: null,
        data_fim_real: null,
        horario_consolidado: null,
      },
    ];

    console.log("\n📚 Criando disciplinas...");

    // Criar cada disciplina
    const disciplinasCriadas = [];
    const erros = [];

    for (const disciplina of disciplinas) {
      try {
        // Verificar se a disciplina já existe
        const disciplinaExistente = await prisma.disciplina.findFirst({
          where: {
            codigo: disciplina.codigo,
            id_curso: disciplina.id_curso,
          },
        });

        if (disciplinaExistente) {
          console.log(
            `ℹ️ Disciplina '${disciplina.nome}' (${disciplina.codigo}) já existe`
          );
          continue;
        }

        const novaDisciplina = await prisma.disciplina.create({
          data: disciplina,
        });

        disciplinasCriadas.push(novaDisciplina);
        console.log(
          `✅ Disciplina criada: ${novaDisciplina.nome} (${novaDisciplina.codigo}) - ${novaDisciplina.carga_horaria}h`
        );
      } catch (error) {
        console.error(
          `❌ Erro ao criar disciplina '${disciplina.nome}':`,
          error
        );
        erros.push({ disciplina: disciplina.nome, error });
      }
    }

    console.log(`\n🎉 Processo concluído!`);
    console.log(`📊 Disciplinas criadas: ${disciplinasCriadas.length}`);
    console.log(`❌ Erros: ${erros.length}`);

    if (disciplinasCriadas.length > 0) {
      console.log("\n📚 Disciplinas criadas com sucesso:");
      disciplinasCriadas.forEach((d) => {
        console.log(
          `- ${d.nome} (${d.codigo}) - ${d.semestre}º semestre - ${d.carga_horaria}h - ${d.total_aulas} aulas`
        );
      });
    }

    if (erros.length > 0) {
      console.log("\n❌ Erros encontrados:");
      erros.forEach(({ disciplina, error }) => {
        console.log(`- ${disciplina}: ${error}`);
      });
    }
  } catch (error) {
    console.error("❌ Erro geral:", error);
  } finally {
    await prisma.$disconnect();
  }
}

criarDisciplinasSolicitadas().catch((error) => {
  console.error("💥 Falha na criação das disciplinas:", error);
  process.exit(1);
});
