import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function criarCursoTADS() {
  try {
    // Verificar se o curso TADS já existe
    const cursoExistente = await prisma.curso.findFirst({
      where: { codigo: "TADS" },
    });

    if (cursoExistente) {
      console.log("Curso TADS já existe:", cursoExistente.nome);
      return cursoExistente;
    }

    // Criar o curso TADS
    const cursoTADS = await prisma.curso.create({
      data: {
        codigo: "TADS",
        nome: "Tecnologia em Análise e Desenvolvimento de Sistemas",
        turno: "MATUTINO",
        duracao_semestres: 8,
      },
    });

    console.log("Curso TADS criado com sucesso:", cursoTADS.nome);
    return cursoTADS;
  } catch (error) {
    console.error("Erro ao criar curso TADS:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

criarCursoTADS();
