import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function verificarDadosTADS() {
  console.log('🔍 Verificando dados do TADS criados...');

  try {
    // Verificar curso TADS (buscar pelo nome da turma)
    const turmaTADS = await prisma.turma.findFirst({
      where: {
        nome: 'TADS 2025'
      },
      include: {
        curso: true
      }
    });

    if (!turmaTADS) {
      console.error('❌ Turma TADS 2025 não encontrada!');
      return;
    }

    const cursoTADS = turmaTADS.curso;

    if (!cursoTADS) {
      console.error('❌ Curso TADS/ADS não encontrado!');
      return;
    }

    console.log(`✅ Curso encontrado: ${cursoTADS.nome} (${cursoTADS.codigo})`);

    // Verificar disciplinas do TADS
    console.log('\n📚 Verificando disciplinas...');
    const disciplinas = await prisma.disciplina.findMany({
      where: {
        id_curso: cursoTADS.id
      },
      orderBy: {
        semestre: 'asc'
      }
    });

    console.log(`📊 Total de disciplinas encontradas: ${disciplinas.length}`);
    
    if (disciplinas.length > 0) {
      console.log('\n📋 Lista de disciplinas:');
      disciplinas.forEach(d => {
        console.log(`- ${d.nome} (${d.codigo}) - ${d.semestre}º semestre - ${d.carga_horaria}h - ${d.tipo_de_sala}`);
      });
    }

    // Verificar professores do TADS
    console.log('\n👨‍🏫 Verificando professores...');
    const professores = await prisma.user.findMany({
      where: {
        id_curso: cursoTADS.id,
        role: 'PROFESSOR'
      },
      orderBy: {
        nome: 'asc'
      }
    });

    console.log(`📊 Total de professores encontrados: ${professores.length}`);
    
    if (professores.length > 0) {
      console.log('\n👥 Lista de professores:');
      professores.forEach(p => {
        console.log(`- ${p.nome} (${p.email}) - ${p.especializacao} - ${p.carga_horaria_max}h`);
      });
    }

    // Mostrar nomes reais das disciplinas encontradas
    if (disciplinas.length > 0) {
      console.log('\n🔍 Nomes reais das disciplinas no banco:');
      disciplinas.forEach(d => {
        console.log(`- "${d.nome}"`);
      });
    }

    // Verificar disciplinas específicas solicitadas
    console.log('\n🎯 Verificando disciplinas específicas solicitadas...');
    const disciplinasEsperadas = [
      'Algoritmos e Estruturas de Dados',
      'Banco de Dados',
      'Programação Orientada a Objetos',
      'Cálculo I',
      'Física I',
      'Engenharia de Software',
      'Redes de Computadores',
      'Inteligência Artificial'
    ];

    const disciplinasEncontradas = [];
    const disciplinasNaoEncontradas = [];

    for (const nomeEsperado of disciplinasEsperadas) {
      const disciplina = disciplinas.find(d => d.nome === nomeEsperado);
      if (disciplina) {
        disciplinasEncontradas.push(nomeEsperado);
        console.log(`✅ ${nomeEsperado}`);
      } else {
        disciplinasNaoEncontradas.push(nomeEsperado);
        console.log(`❌ ${nomeEsperado}`);
      }
    }

    // Verificar professores específicos solicitados
    console.log('\n🎯 Verificando professores específicos solicitados...');
    const professoresEsperados = [
      'Carla',
      'Taniro',
      'Edson',
      'Tasia',
      'Leonardo',
      'Antonino'
    ];

    const professoresEncontrados = [];
    const professoresNaoEncontrados = [];

    for (const nomeEsperado of professoresEsperados) {
      const professor = professores.find(p => p.nome === nomeEsperado);
      if (professor) {
        professoresEncontrados.push(nomeEsperado);
        console.log(`✅ ${nomeEsperado}`);
      } else {
        professoresNaoEncontrados.push(nomeEsperado);
        console.log(`❌ ${nomeEsperado}`);
      }
    }

    // Resumo final
    console.log('\n📋 RESUMO FINAL:');
    console.log(`🎓 Curso: ${cursoTADS.nome}`);
    console.log(`📚 Disciplinas criadas: ${disciplinasEncontradas.length}/${disciplinasEsperadas.length}`);
    console.log(`👨‍🏫 Professores criados: ${professoresEncontrados.length}/${professoresEsperados.length}`);
    
    if (disciplinasNaoEncontradas.length > 0) {
      console.log(`❌ Disciplinas não encontradas: ${disciplinasNaoEncontradas.join(', ')}`);
    }
    
    if (professoresNaoEncontrados.length > 0) {
      console.log(`❌ Professores não encontrados: ${professoresNaoEncontrados.join(', ')}`);
    }

    if (disciplinasEncontradas.length === disciplinasEsperadas.length && 
        professoresEncontrados.length === professoresEsperados.length) {
      console.log('\n🎉 SUCESSO! Todos os dados foram criados corretamente!');
    } else {
      console.log('\n⚠️ ATENÇÃO! Alguns dados não foram encontrados.');
    }

  } catch (error) {
    console.error('❌ Erro durante a verificação:', error);
  } finally {
    await prisma.$disconnect();
  }
}

verificarDadosTADS()
  .catch((error) => {
    console.error('💥 Falha na verificação:', error);
    process.exit(1);
  });