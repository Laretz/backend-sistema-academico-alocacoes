import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function migrarSchema() {
  try {
    console.log("🚀 Iniciando migração do schema melhorado...");

    // Verificar se as tabelas existem
    console.log("🔍 Verificando tabelas existentes...");
    try {
      await prisma.predio.findMany({ take: 1 });
      console.log("✅ Tabela Predio existe");
    } catch (error) {
      console.log("❌ Tabela Predio não existe:", error.message);
      return;
    }

    try {
      await prisma.curso.findMany({ take: 1 });
      console.log("✅ Tabela Curso existe");
    } catch (error) {
      console.log("❌ Tabela Curso não existe:", error.message);
      return;
    }

    // 1. Criar prédios
    console.log("📍 Criando prédios...");
    const predios = await Promise.all([
      prisma.predio.upsert({
        where: { codigo: "BLOCO-A" },
        update: {},
        create: {
          codigo: "BLOCO-A",
          nome: "Bloco A - Administrativo",
          descricao: "Bloco principal com salas administrativas e de aula",
        },
      }),
      prisma.predio.upsert({
        where: { codigo: "BLOCO-B" },
        update: {},
        create: {
          codigo: "BLOCO-B",
          nome: "Bloco B - Laboratórios",
          descricao: "Bloco com laboratórios de informática e ciências",
        },
      }),
      prisma.predio.upsert({
        where: { codigo: "BLOCO-C" },
        update: {},
        create: {
          codigo: "BLOCO-C",
          nome: "Bloco C - Auditórios",
          descricao: "Bloco com auditórios e salas de conferência",
        },
      }),
    ]);
    console.log(`✅ ${predios.length} prédios criados/atualizados`);

    // 2. Criar cursos
    console.log("🎓 Criando cursos...");
    const cursos = await Promise.all([
      prisma.curso.upsert({
        where: { codigo: "ADS" },
        update: {},
        create: {
          codigo: "ADS",
          nome: "Análise e Desenvolvimento de Sistemas",
          turno: "NOTURNO",
          duracao_semestres: 5,
          ativo: true,
        },
      }),
      prisma.curso.upsert({
        where: { codigo: "ENG-COMP" },
        update: {},
        create: {
          codigo: "ENG-COMP",
          nome: "Engenharia da Computação",
          turno: "INTEGRAL",
          duracao_semestres: 10,
          ativo: true,
        },
      }),
      prisma.curso.upsert({
        where: { codigo: "ADM" },
        update: {},
        create: {
          codigo: "ADM",
          nome: "Administração",
          turno: "MATUTINO",
          duracao_semestres: 8,
          ativo: true,
        },
      }),
    ]);
    console.log(`✅ ${cursos.length} cursos criados/atualizados`);

    // 3. Atualizar salas existentes com prédio
    console.log("🏢 Atualizando salas com prédios...");
    const salasExistentes = await prisma.sala.findMany();

    for (const sala of salasExistentes) {
      let predioId: string;

      // Determinar prédio baseado no número da sala
      const numeroSala = parseInt(sala.numero);
      if (numeroSala >= 100 && numeroSala < 200) {
        predioId = predios[0].id; // BLOCO-A
      } else if (numeroSala >= 200 && numeroSala < 300) {
        predioId = predios[1].id; // BLOCO-B
      } else {
        predioId = predios[2].id; // BLOCO-C
      }

      await prisma.sala.update({
        where: { id: sala.id },
        data: { predioId },
      });
    }
    console.log(`✅ ${salasExistentes.length} salas atualizadas com prédios`);

    // 4. Criar disciplinas de exemplo para cada curso
    console.log("📚 Criando disciplinas de exemplo...");
    const disciplinasExemplo = [
      {
        nome: "Programação I",
        carga_horaria_total: 80,
        codigo: "PROG1",
        id_curso: cursos[0].id, // ADS
        semestre: 1,
      },
      {
        nome: "Banco de Dados",
        carga_horaria_total: 60,
        codigo: "BD1",
        id_curso: cursos[0].id, // ADS
        semestre: 3,
      },
      {
        nome: "Cálculo I",
        carga_horaria_total: 80,
        codigo: "CALC1",
        id_curso: cursos[1].id, // ENG-COMP
        semestre: 1,
      },
      {
        nome: "Administração Geral",
        carga_horaria_total: 60,
        codigo: "ADM1",
        id_curso: cursos[2].id, // ADM
        semestre: 1,
      },
    ];

    // Verificar se já existem disciplinas
    const disciplinasCount = await prisma.disciplina.count();
    if (disciplinasCount === 0) {
      for (const disc of disciplinasExemplo) {
        await prisma.disciplina.create({
          data: disc,
        });
      }
      console.log(
        `✅ ${disciplinasExemplo.length} disciplinas de exemplo criadas`
      );
    } else {
      console.log(`ℹ️ Já existem ${disciplinasCount} disciplinas no banco`);
    }

    // 5. Criar turmas de exemplo para cada curso
    console.log("👥 Criando turmas de exemplo...");
    const turmasExemplo = [
      {
        nome: "ADS-1A",
        num_alunos: 30,
        periodo: 1,
        turno: "NOTURNO",
        id_curso: cursos[0].id, // ADS
        semestre: 1,
      },
      {
        nome: "ENG-1A",
        num_alunos: 25,
        periodo: 1,
        turno: "INTEGRAL",
        id_curso: cursos[1].id, // ENG-COMP
        semestre: 1,
      },
      {
        nome: "ADM-1A",
        num_alunos: 35,
        periodo: 1,
        turno: "MATUTINO",
        id_curso: cursos[2].id, // ADM
        semestre: 1,
      },
    ];

    // Verificar se já existem turmas
    const turmasCount = await prisma.turma.count();
    if (turmasCount === 0) {
      for (const turma of turmasExemplo) {
        await prisma.turma.create({
          data: turma,
        });
      }
      console.log(`✅ ${turmasExemplo.length} turmas de exemplo criadas`);
    } else {
      console.log(`ℹ️ Já existem ${turmasCount} turmas no banco`);
    }

    console.log("🎉 Migração do schema concluída com sucesso!");
  } catch (error) {
    console.error("❌ Erro durante a migração:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

migrarSchema().catch((error) => {
  console.error("💥 Falha na migração:", error);
  process.exit(1);
});
