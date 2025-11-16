import { prisma } from "@/lib/prisma";

async function main() {
  const alocacoes = await prisma.alocacao.findMany({
    where: { id_curso_disciplina: null },
    select: {
      id: true,
      id_disciplina: true,
      turma: { select: { id_curso: true } },
    },
  });

  let updated = 0;
  let notFound = 0;

  for (const a of alocacoes) {
    const idCurso = a.turma?.id_curso;
    if (!idCurso) {
      console.warn(`Turma sem curso associado para alocação ${a.id}. Pulando.`);
      notFound++;
      continue;
    }

    const vinculo = await prisma.cursoDisciplina.findUnique({
      where: {
        id_curso_id_disciplina: {
          id_curso: idCurso,
          id_disciplina: a.id_disciplina,
        },
      },
      select: { id: true },
    });

    if (!vinculo) {
      console.warn(
        `Nenhum CursoDisciplina encontrado para curso=${idCurso} e disciplina=${a.id_disciplina} na alocação ${a.id}.`
      );
      notFound++;
      continue;
    }

    await prisma.alocacao.update({
      where: { id: a.id },
      data: { id_curso_disciplina: vinculo.id },
    });
    updated++;
  }

  console.log(
    `Backfill de Alocacao concluído. Atualizadas: ${updated}. Sem vínculo encontrado: ${notFound}. Total pendentes: ${alocacoes.length}`
  );
}

main()
  .catch((err) => {
    console.error("Falha no backfill Alocacao -> CursoDisciplina:", err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });