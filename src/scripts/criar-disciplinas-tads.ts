import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function criarCursoEDisciplinasTADS() {
  console.log('🎓 Criando curso e disciplinas do TADS...');

  try {
    // Primeiro, criar ou buscar o curso TADS
    let cursoTADS = await prisma.curso.findUnique({
      where: { codigo: 'TADS' }
    });

    if (!cursoTADS) {
      // Tentar buscar por ADS
      cursoTADS = await prisma.curso.findUnique({
        where: { codigo: 'ADS' }
      });
    }

    if (!cursoTADS) {
      console.log('📝 Criando curso TADS...');
      cursoTADS = await prisma.curso.create({
        data: {
          codigo: 'TADS',
          nome: 'Tecnologia em Análise e Desenvolvimento de Sistemas',
          turno: 'NOTURNO',
          duracao_semestres: 5,
          ativo: true
        }
      });
      console.log(`✅ Curso criado: ${cursoTADS.nome}`);
    } else {
      console.log(`✅ Curso encontrado: ${cursoTADS.nome}`);
    }

    // Disciplinas do TADS para criar
    const disciplinas = [
      {
        nome: 'Algoritmos e Programação',
        carga_horaria_total: 80,
        codigo: 'TAD001',
        id_curso: cursoTADS.id,
        semestre: 1,
        tipo_de_sala: 'Lab' as const,
        obrigatoria: true
      },
      {
        nome: 'Banco de Dados',
        carga_horaria_total: 60,
        codigo: 'TAD002',
        id_curso: cursoTADS.id,
        semestre: 2,
        tipo_de_sala: 'Lab' as const,
        obrigatoria: true
      },
      {
        nome: 'Interação Humano-Computador',
        carga_horaria_total: 45,
        codigo: 'TAD003',
        id_curso: cursoTADS.id,
        semestre: 3,
        tipo_de_sala: 'Sala' as const,
        obrigatoria: true
      },
      {
        nome: 'Processo de Desenvolvimento de Software',
        carga_horaria_total: 60,
        codigo: 'TAD004',
        id_curso: cursoTADS.id,
        semestre: 3,
        tipo_de_sala: 'Sala' as const,
        obrigatoria: true
      },
      {
        nome: 'Programação Visual e Autoria Web',
        carga_horaria_total: 80,
        codigo: 'TAD005',
        id_curso: cursoTADS.id,
        semestre: 4,
        tipo_de_sala: 'Lab' as const,
        obrigatoria: true
      },
      {
        nome: 'Redes de Computadores',
        carga_horaria_total: 60,
        codigo: 'TAD006',
        id_curso: cursoTADS.id,
        semestre: 4,
        tipo_de_sala: 'Lab' as const,
        obrigatoria: true
      },
      {
        nome: 'Sistemas Digitais',
        carga_horaria_total: 60,
        codigo: 'TAD007',
        id_curso: cursoTADS.id,
        semestre: 2,
        tipo_de_sala: 'Lab' as const,
        obrigatoria: true
      }
    ];

    console.log('\n📚 Criando disciplinas...');
    
    // Criar cada disciplina
    const disciplinasCriadas = [];
    for (const disciplina of disciplinas) {
      try {
        // Verificar se a disciplina já existe
        const disciplinaExistente = await prisma.disciplina.findFirst({
          where: {
            nome: disciplina.nome,
            id_curso: cursoTADS.id
          }
        });

        if (disciplinaExistente) {
          console.log(`ℹ️ Disciplina '${disciplina.nome}' já existe`);
          continue;
        }

        const novaDisciplina = await prisma.disciplina.create({
          data: disciplina
        });

        disciplinasCriadas.push(novaDisciplina);
        console.log(`✅ Disciplina criada: ${novaDisciplina.nome}`);
      } catch (error) {
        console.error(`❌ Erro ao criar disciplina '${disciplina.nome}':`, error);
      }
    }

    console.log(`\n🎉 Processo concluído!`);
    console.log(`📊 Disciplinas criadas: ${disciplinasCriadas.length}`);
    
    if (disciplinasCriadas.length > 0) {
      console.log('\n📚 Disciplinas criadas:');
      disciplinasCriadas.forEach(d => {
        console.log(`- ${d.nome} (${d.codigo}) - ${d.semestre}º semestre`);
      });
    }

  } catch (error) {
    console.error('❌ Erro geral:', error);
  } finally {
    await prisma.$disconnect();
  }
}

criarCursoEDisciplinasTADS()
  .catch((error) => {
    console.error('💥 Falha na criação das disciplinas:', error);
    process.exit(1);
  });