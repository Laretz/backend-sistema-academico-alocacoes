import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

async function criarProfessoresTADS() {
  console.log('👨‍🏫 Criando professores do TADS...');

  try {
    // Buscar o curso TADS para associar os professores
    const cursoTADS = await prisma.curso.findFirst({
      where: {
        OR: [
          { codigo: 'TADS' },
          { codigo: 'ADS' }
        ]
      }
    });

    if (!cursoTADS) {
      console.error('❌ Curso TADS/ADS não encontrado!');
      return;
    }

    console.log(`✅ Curso encontrado: ${cursoTADS.nome}`);

    // Professores para criar
    const professores = [
      {
        nome: 'Carla',
        email: 'carla@tads.edu.br',
        senha: await hash('123456', 6),
        role: 'PROFESSOR' as const,
        especializacao: 'Engenharia de Software',
        carga_horaria_max: 40,
        preferencia: 'Manhã e Tarde'
      },
      {
        nome: 'Taniro',
        email: 'taniro@tads.edu.br',
        senha: await hash('123456', 6),
        role: 'PROFESSOR' as const,
        especializacao: 'Desenvolvimento Mobile',
        carga_horaria_max: 40,
        preferencia: 'Tarde e Noite'
      },
      {
        nome: 'Edson',
        email: 'edson@tads.edu.br',
        senha: await hash('123456', 6),
        role: 'PROFESSOR' as const,
        especializacao: 'Banco de Dados',
        carga_horaria_max: 40,
        preferencia: 'Manhã e Tarde'
      },
      {
        nome: 'Tasia',
        email: 'tasia@tads.edu.br',
        senha: await hash('123456', 6),
        role: 'PROFESSOR' as const,
        especializacao: 'Interação Humano-Computador',
        carga_horaria_max: 40,
        preferencia: 'Manhã e Tarde'
      },
      {
        nome: 'Leonardo',
        email: 'leonardo@tads.edu.br',
        senha: await hash('123456', 6),
        role: 'PROFESSOR' as const,
        especializacao: 'Sistemas Digitais e Hardware',
        carga_horaria_max: 40,
        preferencia: 'Tarde e Noite'
      },
      {
        nome: 'Antonino',
        email: 'antonino@tads.edu.br',
        senha: await hash('123456', 6),
        role: 'PROFESSOR' as const,
        especializacao: 'Redes de Computadores',
        carga_horaria_max: 40,
        preferencia: 'Manhã e Tarde'
      }
    ];

    console.log('\n👨‍🏫 Criando professores...');
    
    // Criar cada professor
    const professoresCriados = [];
    for (const professor of professores) {
      try {
        // Verificar se o professor já existe
        const professorExistente = await prisma.user.findUnique({
          where: {
            email: professor.email
          }
        });

        if (professorExistente) {
          console.log(`ℹ️ Professor '${professor.nome}' já existe`);
          continue;
        }

        const novoProfessor = await prisma.user.create({
          data: professor
        });

        // Criar relação com o curso TADS
        await prisma.userCurso.create({
          data: {
            id_user: novoProfessor.id,
            id_curso: cursoTADS.id
          }
        });

        professoresCriados.push(novoProfessor);
        console.log(`✅ Professor criado: ${novoProfessor.nome} (${novoProfessor.email}) - Associado ao curso TADS`);
      } catch (error) {
        console.error(`❌ Erro ao criar professor '${professor.nome}':`, error);
      }
    }

    console.log(`\n🎉 Processo concluído!`);
    console.log(`📊 Professores criados: ${professoresCriados.length}`);
    
    if (professoresCriados.length > 0) {
      console.log('\n👨‍🏫 Professores criados:');
      professoresCriados.forEach(p => {
        console.log(`- ${p.nome} (${p.email}) - ${p.especializacao}`);
      });
    }

  } catch (error) {
    console.error('❌ Erro geral:', error);
  } finally {
    await prisma.$disconnect();
  }
}

criarProfessoresTADS()
  .catch((error) => {
    console.error('💥 Falha na criação dos professores:', error);
    process.exit(1);
  });