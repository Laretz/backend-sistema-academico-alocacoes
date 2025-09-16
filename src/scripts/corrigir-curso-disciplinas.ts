import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function corrigirCursoDisciplinas() {
  console.log('🔧 Corrigindo associação das disciplinas ao curso correto...');

  try {
    // ID do curso correto da turma TADS 2025
    const cursoCorretoId = 'cf5d2a9e-dd54-4d88-88db-a336ba423d4a';
    
    // IDs das disciplinas que precisam ser corrigidas
    const disciplinasIds = [
      '9a055911-d846-4708-b653-1ce6da6ea186', // Algoritmos e Estruturas de Dados
      'ef5e2b7e-5cd6-4eb4-b362-77b623db46fb', // Banco de Dados
      'f392d1a3-253a-4d9c-8107-95513a6f5b57', // Programação Orientada a Objetos
      '891f0540-4071-480f-9e8e-245cbf54c1e2', // Cálculo I
      '2ef2a86c-4124-4116-b0b4-dd84c23ee98c', // Física I
      'fc079a60-b0d5-4133-a913-083f75f7a174', // Engenharia de Software
      'e1d25cb4-79d3-4e7c-aa80-393825c27b5e', // Redes de Computadores
      '2cff7064-23a6-41f6-8d1c-9feab4b27ad4'  // Inteligência Artificial
    ];

    console.log(`📝 Atualizando ${disciplinasIds.length} disciplinas...`);

    // Atualizar o id_curso de todas as disciplinas
    const resultado = await prisma.disciplina.updateMany({
      where: {
        id: {
          in: disciplinasIds
        }
      },
      data: {
        id_curso: cursoCorretoId
      }
    });

    console.log(`✅ ${resultado.count} disciplinas atualizadas com sucesso!`);

    // Verificar se a correção funcionou
    console.log('\n🔍 Verificando disciplinas após correção...');
    const disciplinasCorrigidas = await prisma.disciplina.findMany({
      where: {
        id_curso: cursoCorretoId
      },
      include: {
        curso: true
      }
    });

    console.log(`📊 Total de disciplinas no curso correto: ${disciplinasCorrigidas.length}`);
    disciplinasCorrigidas.forEach(d => {
      console.log(`- ${d.nome} (${d.codigo}) - Curso: ${d.curso?.nome}`);
    });

  } catch (error) {
    console.error('❌ Erro:', error);
  } finally {
    await prisma.$disconnect();
  }
}

corrigirCursoDisciplinas()
  .catch((error) => {
    console.error('❌ Erro fatal:', error);
    process.exit(1);
  });