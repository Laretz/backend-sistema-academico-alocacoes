import { PrismaClient } from '@prisma/client';
import { AllocationService } from '../algorithms/allocation/allocation-service';

const prisma = new PrismaClient();

async function runGeneticAllocation() {
  try {
    console.log('🧬 Iniciando alocação genética de horários...');

    // Buscar todas as turmas disponíveis
    const turmas = await prisma.turma.findMany({
      include: {
        curso: true
      }
    });

    if (turmas.length === 0) {
      console.log('❌ Nenhuma turma encontrada no banco de dados');
      return;
    }

    console.log(`📚 Encontradas ${turmas.length} turma(s):`);
    turmas.forEach(turma => {
      console.log(`   - ${turma.nome} (${turma.curso.nome})`);
    });

    // Criar instância do serviço de alocação
    const allocationService = new AllocationService();

    // Executar algoritmo genético para cada turma
    for (const turma of turmas) {
      console.log(`\n🎯 Executando alocação para turma: ${turma.nome}`);
      
      const result = await allocationService.execute({
        turmaId: turma.id,
        params: {
          populationSize: 50,
          generations: 100,
          mutationRate: 0.1,
          crossoverRate: 0.8,
          elitismRate: 0.1
        }
      });

      if (result.success) {
        console.log(`✅ Alocação concluída para ${turma.nome}:`);
        console.log(`   - Fitness: ${result.fitness}`);
        console.log(`   - Alocações criadas: ${result.alocacoes?.length || 0}`);
        console.log(`   - Gerações: ${result.geracoes}`);
        console.log(`   - Tempo de execução: ${result.tempoExecucao}ms`);
      } else {
        console.log(`❌ Erro na alocação para ${turma.nome}: ${result.error}`);
      }
    }

    console.log('\n🎉 Processo de alocação genética concluído!');
    
    // Mostrar estatísticas finais
    const totalAlocacoes = await prisma.alocacao.count();
    console.log(`📊 Total de alocações no banco: ${totalAlocacoes}`);
    
  } catch (error) {
    console.error('❌ Erro durante a alocação genética:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Executar se chamado diretamente
if (require.main === module) {
  runGeneticAllocation();
}

export { runGeneticAllocation };