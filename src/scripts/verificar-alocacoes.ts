import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function verificarAlocacoes() {
  console.log("🔍 Verificando alocações criadas...");

  try {
    // Buscar alocações da turma TADS 2025
    const alocacoes = await prisma.alocacao.findMany({
      where: {
        turma: {
          nome: "TADS 2025",
        },
      },
      include: {
        disciplina: true,
        user: true,
        sala: true,
        horario: true,
        turma: true,
      },
      orderBy: [
        { disciplina: { nome: "asc" } },
        { horario: { dia_semana: "asc" } },
        { horario: { horario_inicio: "asc" } },
      ],
    });

    console.log(`📊 Total de alocações encontradas: ${alocacoes.length}`);

    if (alocacoes.length > 0) {
      console.log("\n📋 Alocações por disciplina:");

      // Agrupar por disciplina
      const alocacoesPorDisciplina = alocacoes.reduce(
        (acc, alocacao) => {
          const disciplinaNome = alocacao.disciplina.nome;
          if (!acc[disciplinaNome]) {
            acc[disciplinaNome] = [];
          }
          acc[disciplinaNome].push(alocacao);
          return acc;
        },
        {} as Record<string, typeof alocacoes>
      );

      Object.entries(alocacoesPorDisciplina).forEach(
        ([disciplina, alocacoesDisciplina]) => {
          console.log(`\n🎓 ${disciplina}:`);
          alocacoesDisciplina.forEach((alocacao) => {
            const dia = [
              "Domingo",
              "Segunda",
              "Terça",
              "Quarta",
              "Quinta",
              "Sexta",
              "Sábado",
            ][alocacao.horario.dia_semana];
            console.log(
              `   - ${alocacao.user.nome} | ${alocacao.sala.nome} | ${dia} ${alocacao.horario.horario_inicio}-${alocacao.horario.horario_fim} (${alocacao.horario.codigo})`
            );
          });
        }
      );

      // Verificar se Carla foi priorizada para Engenharia de Software
      console.log("\n🎯 Verificando priorização da Carla:");
      const alocacoesES = alocacoes.filter(
        (a) => a.disciplina.nome === "Engenharia de Software"
      );
      if (alocacoesES.length > 0) {
        const professorES = alocacoesES[0]!.user.nome;
        if (professorES === "Carla") {
          console.log(
            "✅ Carla foi corretamente alocada para Engenharia de Software"
          );
        } else {
          console.log(
            `❌ Carla NÃO foi alocada para Engenharia de Software. Professor alocado: ${professorES}`
          );
        }
      } else {
        console.log(
          "❌ Nenhuma alocação encontrada para Engenharia de Software"
        );
      }

      // Estatísticas por professor
      console.log("\n👨‍🏫 Estatísticas por professor:");
      const estatisticasProfessores = alocacoes.reduce(
        (acc, alocacao) => {
          const professorNome = alocacao.user.nome;
          if (!acc[professorNome]) {
            acc[professorNome] = {
              total: 0,
              disciplinas: new Set(),
            };
          }
          acc[professorNome].total++;
          acc[professorNome].disciplinas.add(alocacao.disciplina.nome);
          return acc;
        },
        {} as Record<string, { total: number; disciplinas: Set<string> }>
      );

      Object.entries(estatisticasProfessores).forEach(([professor, stats]) => {
        console.log(
          `- ${professor}: ${stats.total} aulas, ${stats.disciplinas.size} disciplinas`
        );
        console.log(
          `  Disciplinas: ${Array.from(stats.disciplinas).join(", ")}`
        );
      });
    }
  } catch (error) {
    console.error("❌ Erro:", error);
  } finally {
    await prisma.$disconnect();
  }
}

verificarAlocacoes().catch((error) => {
  console.error("❌ Erro fatal:", error);
  process.exit(1);
});
