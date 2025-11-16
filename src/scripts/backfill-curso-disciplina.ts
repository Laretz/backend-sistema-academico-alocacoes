import { prisma } from "@/lib/prisma";

async function main() {
  const disciplinas = await prisma.disciplina.findMany({
    select: { id: true, id_curso: true },
  });

  let created = 0;
  for (const d of disciplinas) {
    if (!d.id_curso) continue;
    try {
      await prisma.cursoDisciplina.create({
        data: {
          id_curso: d.id_curso,
          id_disciplina: d.id,
        },
      });
      created++;
    } catch (e: any) {
      // Ignorar duplicidades (unicidade por id_curso + id_disciplina)
      if (e.code !== "P2002") {
        console.error("Erro ao criar vínculo CursoDisciplina:", e);
        throw e;
      }
    }
  }

  console.log(`Backfill concluído. Vínculos criados: ${created}. Total disciplinas: ${disciplinas.length}`);
}

main()
  .catch((err) => {
    console.error("Falha no backfill CursoDisciplina:", err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });