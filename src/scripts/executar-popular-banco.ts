import { PrismaClient } from '@prisma/client';
import { readFileSync } from 'fs';
import { join } from 'path';

const prisma = new PrismaClient();

async function popularBancoAcademico() {
  try {
    console.log('🚀 Iniciando população do banco de dados acadêmico...');
    
    // Ler o arquivo SQL
    const sqlPath = join(__dirname, 'popular-banco-academico.sql');
    console.log(`📁 Lendo arquivo: ${sqlPath}`);
    const sqlContent = readFileSync(sqlPath, 'utf-8');
    console.log(`📄 Arquivo lido com ${sqlContent.length} caracteres`);
    
    // Dividir o SQL em comandos individuais (removendo comentários e linhas vazias)
    const allCommands = sqlContent.split(';').map(cmd => cmd.trim());
    console.log(`🔍 Total de comandos encontrados após split: ${allCommands.length}`);
    
    const sqlCommands = allCommands.filter((cmd, index) => {
        console.log(`🔍 Analisando comando ${index + 1}: "${cmd.substring(0, 50)}..."`);
        
        if (cmd.length === 0) {
          console.log(`❌ Comando ${index + 1}: vazio`);
          return false;
        }
        
        // Verificar se contém INSERT INTO em qualquer lugar do comando
        const cleanCmd = cmd.replace(/\s+/g, ' ').trim();
        const isInsert = cleanCmd.toUpperCase().includes('INSERT INTO');
        
        if (isInsert) {
          // Se contém INSERT, extrair apenas a parte do INSERT
          const insertIndex = cleanCmd.toUpperCase().indexOf('INSERT INTO');
          const insertPart = cleanCmd.substring(insertIndex);
          console.log(`✅ Comando ${index + 1}: É INSERT - "${insertPart.substring(0, 80)}..."`);
          return true;
        } else {
          console.log(`❌ Comando ${index + 1}: NÃO é INSERT`);
          return false;
        }
      });
    
    console.log(`📝 Executando ${sqlCommands.length} comandos SQL...`);
    
    // Executar cada comando SQL
    for (let i = 0; i < sqlCommands.length; i++) {
      let command = sqlCommands[i];
      
      // Extrair apenas a parte do INSERT se houver comentários antes
      const insertIndex = command.toUpperCase().indexOf('INSERT INTO');
      if (insertIndex > 0) {
        command = command.substring(insertIndex);
      }
      
      try {
        await prisma.$executeRawUnsafe(command);
        console.log(`✅ Comando ${i + 1}/${sqlCommands.length} executado com sucesso`);
      } catch (error) {
        console.error(`❌ Erro no comando ${i + 1}:`, error);
        console.error('Comando que falhou:', command.substring(0, 100) + '...');
        // Continuar com os próximos comandos mesmo se um falhar
      }
    }
    
    console.log('\n📊 Verificando dados inseridos...');
    
    // Verificações de contagem
    const predios = await prisma.predio.count();
    const salas = await prisma.sala.count();
    const cursos = await prisma.curso.count();
    const professores = await prisma.user.count({ where: { role: 'PROFESSOR' } });
    const disciplinas = await prisma.disciplina.count();
    const turmas = await prisma.turma.count();
    const horarios = await prisma.horario.count();
    const alocacoes = await prisma.alocacao.count();
    
    console.log('\n📈 Resumo dos dados inseridos:');
    console.log(`🏢 Prédios: ${predios}`);
    console.log(`🚪 Salas: ${salas}`);
    console.log(`🎓 Cursos: ${cursos}`);
    console.log(`👨‍🏫 Professores: ${professores}`);
    console.log(`📚 Disciplinas: ${disciplinas}`);
    console.log(`👥 Turmas: ${turmas}`);
    console.log(`⏰ Horários: ${horarios}`);
    console.log(`📅 Alocações: ${alocacoes}`);
    
    // Verificação detalhada por semestre
    console.log('\n📋 Disciplinas por semestre:');
    for (let sem = 1; sem <= 4; sem++) {
      const disciplinasSemestre = await prisma.disciplina.count({
        where: { semestre: sem }
      });
      console.log(`   Semestre ${sem}: ${disciplinasSemestre} disciplinas`);
    }
    
    // Verificação de salas por tipo
    console.log('\n🏛️ Salas por tipo:');
    const laboratorios = await prisma.sala.count({ where: { tipo: 'Lab' } });
    const salasConvencionais = await prisma.sala.count({ where: { tipo: 'Sala' } });
    console.log(`   Laboratórios: ${laboratorios}`);
    console.log(`   Salas convencionais: ${salasConvencionais}`);
    
    console.log('\n✅ População do banco de dados concluída com sucesso!');
    
  } catch (error) {
    console.error('❌ Erro durante a população do banco:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Executar o script se for chamado diretamente
if (require.main === module) {
  popularBancoAcademico()
    .then(() => {
      console.log('🎉 Script executado com sucesso!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('💥 Falha na execução do script:', error);
      process.exit(1);
    });
}

export { popularBancoAcademico };