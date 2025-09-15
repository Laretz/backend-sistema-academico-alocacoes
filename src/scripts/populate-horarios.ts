import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface HorarioData {
  dia_semana: string;
  horario_inicio: string;
  horario_fim: string;
}

const DIAS_SEMANA = [
  'SEGUNDA',
  'TERCA',
  'QUARTA',
  'QUINTA',
  'SEXTA',
  'SABADO'
];

function gerarHorarios(): HorarioData[] {
  const horarios: HorarioData[] = [];
  
  // Gerar horários de 7h às 22h (último horário inicia às 21h e termina às 22h)
  for (let hora = 7; hora < 22; hora++) {
    const horarioInicio = `${hora.toString().padStart(2, '0')}:00`;
    const horarioFim = `${(hora + 1).toString().padStart(2, '0')}:00`;
    
    // Para cada dia da semana
    for (const dia of DIAS_SEMANA) {
      horarios.push({
        dia_semana: dia,
        horario_inicio: horarioInicio,
        horario_fim: horarioFim
      });
    }
  }
  
  return horarios;
}

async function popularHorarios() {
  try {
    console.log('🕐 Iniciando população de horários...');
    
    // Limpar horários existentes
    await prisma.horario.deleteMany({});
    console.log('🗑️  Horários existentes removidos');
    
    // Gerar todos os horários
    const horarios = gerarHorarios();
    console.log(`📅 Gerando ${horarios.length} horários...`);
    
    // Inserir horários em lotes para melhor performance
    const batchSize = 50;
    for (let i = 0; i < horarios.length; i += batchSize) {
      const batch = horarios.slice(i, i + batchSize);
      await prisma.horario.createMany({
        data: batch
      });
      console.log(`✅ Inseridos ${Math.min(i + batchSize, horarios.length)}/${horarios.length} horários`);
    }
    
    console.log('🎉 Todos os horários foram criados com sucesso!');
    
    // Mostrar resumo
    const total = await prisma.horario.count();
    console.log(`📊 Total de horários no banco: ${total}`);
    
    // Mostrar alguns exemplos
    const exemplos = await prisma.horario.findMany({
      take: 5,
      orderBy: [
        { dia_semana: 'asc' },
        { horario_inicio: 'asc' }
      ]
    });
    
    console.log('\n📋 Exemplos de horários criados:');
    exemplos.forEach(horario => {
      console.log(`   ${horario.dia_semana}: ${horario.horario_inicio} - ${horario.horario_fim}`);
    });
    
  } catch (error) {
    console.error('❌ Erro ao popular horários:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Executar se chamado diretamente
if (require.main === module) {
  popularHorarios();
}

export { popularHorarios };