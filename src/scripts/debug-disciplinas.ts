import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function debugDisciplinas() {
  console.log('🔍 Debug: Verificando todas as disciplinas no banco...');

  try {
    // Buscar todas as disciplinas
    const todasDisciplinas = await prisma.disciplina.findMany({
      include: {
        curso: true
      }
    });

    console.log(`📊 Total de disciplinas no banco: ${todasDisciplinas.length}`);

    if (todasDisciplinas.length > 0) {
      console.log('\n📋 Lista completa de disciplinas:');
      todasDisciplinas.forEach(d => {
        console.log(`- ID: ${d.id}`);
        console.log(`  Nome: "${d.nome}"`);
        console.log(`  Código: ${d.codigo}`);
        console.log(`  Curso: ${d.curso?.nome || 'N/A'} (ID: ${d.id_curso})`);
        console.log(`  Obrigatória: ${d.obrigatoria}`);
        console.log(`  Semestre: ${d.semestre}`);
        console.log('---');
      });
    }

    // Buscar todos os cursos
    console.log('\n🎓 Cursos disponíveis:');
    const cursos = await prisma.curso.findMany();
    cursos.forEach(c => {
      console.log(`- ${c.nome} (${c.codigo}) - ID: ${c.id}`);
    });

    // Buscar turmas
    console.log('\n👥 Turmas disponíveis:');
    const turmas = await prisma.turma.findMany({
      include: {
        curso: true
      }
    });
    turmas.forEach(t => {
      console.log(`- ${t.nome} - Curso: ${t.curso?.nome} (ID curso: ${t.id_curso})`);
    });

  } catch (error) {
    console.error('❌ Erro:', error);
  } finally {
    await prisma.$disconnect();
  }
}

debugDisciplinas()
  .catch((error) => {
    console.error('❌ Erro fatal:', error);
    process.exit(1);
  });