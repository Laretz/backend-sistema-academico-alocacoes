import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function popularBancoCompleto() {
  try {
    console.log('🚀 Iniciando população completa do banco de dados...');

    // 1. PRÉDIOS
    console.log('🏢 Criando prédios...');
    const predios = await Promise.all([
      prisma.predio.create({
        data: {
          codigo: 'PRED-A',
          nome: 'Prédio Administrativo',
          descricao: 'Prédio principal com salas administrativas e laboratórios'
        }
      }),
      prisma.predio.create({
        data: {
          codigo: 'PRED-B',
          nome: 'Prédio de Tecnologia',
          descricao: 'Prédio dedicado aos cursos de tecnologia e informática'
        }
      })
    ]);

    // 2. SALAS
    console.log('🚪 Criando salas...');
    const salas = await Promise.all([
      // Salas do Prédio A
      prisma.sala.create({
        data: {
          nome: 'Laboratório de Informática A1',
          numero: 'A101',
          capacidade: 40,
          tipo: 'Lab',
          computadores: 40,
          predioId: predios[0].id,
          ativa: true
        }
      }),
      prisma.sala.create({
        data: {
          nome: 'Laboratório de Redes A2',
          numero: 'A102',
          capacidade: 40,
          tipo: 'Lab',
          computadores: 40,
          predioId: predios[0].id,
          ativa: true
        }
      }),
      prisma.sala.create({
        data: {
          nome: 'Sala de Aula A3',
          numero: 'A103',
          capacidade: 40,
          tipo: 'Sala',
          computadores: 0,
          predioId: predios[0].id,
          ativa: true
        }
      }),
      prisma.sala.create({
        data: {
          nome: 'Sala de Aula A4',
          numero: 'A104',
          capacidade: 40,
          tipo: 'Sala',
          computadores: 0,
          predioId: predios[0].id,
          ativa: true
        }
      }),
      // Salas do Prédio B
      prisma.sala.create({
        data: {
          nome: 'Laboratório de Desenvolvimento B1',
          numero: 'B101',
          capacidade: 40,
          tipo: 'Lab',
          computadores: 40,
          predioId: predios[1].id,
          ativa: true
        }
      }),
      prisma.sala.create({
        data: {
          nome: 'Laboratório de Banco de Dados B2',
          numero: 'B102',
          capacidade: 40,
          tipo: 'Lab',
          computadores: 40,
          predioId: predios[1].id,
          ativa: true
        }
      }),
      prisma.sala.create({
        data: {
          nome: 'Sala de Aula B3',
          numero: 'B103',
          capacidade: 40,
          tipo: 'Sala',
          computadores: 0,
          predioId: predios[1].id,
          ativa: true
        }
      }),
      prisma.sala.create({
        data: {
          nome: 'Sala de Aula B4',
          numero: 'B104',
          capacidade: 40,
          tipo: 'Sala',
          computadores: 0,
          predioId: predios[1].id,
          ativa: true
        }
      })
    ]);

    // 3. CURSOS
    console.log('🎓 Criando cursos...');
    const cursos = await Promise.all([
      prisma.curso.create({
        data: {
          codigo: 'TADS',
          nome: 'Tecnologia em Análise e Desenvolvimento de Sistemas',
          turno: 'NOTURNO',
          duracao_semestres: 6,
          ativo: true
        }
      }),
      prisma.curso.create({
        data: {
          codigo: 'TSI',
          nome: 'Tecnologia em Sistemas para Internet',
          turno: 'VESPERTINO',
          duracao_semestres: 6,
          ativo: true
        }
      }),
      prisma.curso.create({
        data: {
          codigo: 'TGTI',
          nome: 'Tecnologia em Gestão da Tecnologia da Informação',
          turno: 'MATUTINO',
          duracao_semestres: 6,
          ativo: true
        }
      })
    ]);

    // 4. PROFESSORES
    console.log('👨‍🏫 Criando professores...');
    const professores = await Promise.all([
      prisma.user.create({
        data: {
          nome: 'Prof. Dr. João Silva',
          email: 'joao.silva@instituicao.edu.br',
          senha: '$2b$10$hashedpassword1',
          role: 'PROFESSOR',
          especializacao: 'Engenharia de Software',
          carga_horaria_max: 40,
          preferencia: 'Desenvolvimento Web'
        }
      }),
      prisma.user.create({
        data: {
          nome: 'Prof. Dra. Maria Santos',
          email: 'maria.santos@instituicao.edu.br',
          senha: '$2b$10$hashedpassword2',
          role: 'PROFESSOR',
          especializacao: 'Banco de Dados',
          carga_horaria_max: 40,
          preferencia: 'Sistemas de Informação'
        }
      }),
      prisma.user.create({
        data: {
          nome: 'Prof. Carlos Oliveira',
          email: 'carlos.oliveira@instituicao.edu.br',
          senha: '$2b$10$hashedpassword3',
          role: 'PROFESSOR',
          especializacao: 'Redes de Computadores',
          carga_horaria_max: 40,
          preferencia: 'Infraestrutura'
        }
      }),
      prisma.user.create({
        data: {
          nome: 'Prof. Dra. Ana Costa',
          email: 'ana.costa@instituicao.edu.br',
          senha: '$2b$10$hashedpassword4',
          role: 'PROFESSOR',
          especializacao: 'Algoritmos e Estruturas de Dados',
          carga_horaria_max: 40,
          preferencia: 'Programação'
        }
      }),
      prisma.user.create({
        data: {
          nome: 'Prof. Roberto Lima',
          email: 'roberto.lima@instituicao.edu.br',
          senha: '$2b$10$hashedpassword5',
          role: 'PROFESSOR',
          especializacao: 'Gestão de Projetos',
          carga_horaria_max: 40,
          preferencia: 'Metodologias Ágeis'
        }
      }),
      prisma.user.create({
        data: {
          nome: 'Prof. Dra. Fernanda Rocha',
          email: 'fernanda.rocha@instituicao.edu.br',
          senha: '$2b$10$hashedpassword6',
          role: 'PROFESSOR',
          especializacao: 'Design de Interface',
          carga_horaria_max: 40,
          preferencia: 'UX/UI Design'
        }
      })
    ]);

    // 5. DISCIPLINAS
    console.log('📚 Criando disciplinas...');
    const disciplinas = await Promise.all([
      // 1º Semestre TADS
      prisma.disciplina.create({
        data: {
          codigo: 'TADS101',
          nome: 'Algoritmos e Programação I',
          carga_horaria: 80,
          semestre: 1,
          tipo_de_sala: 'Lab',
          id_curso: cursos[0].id
        }
      }),
      // 2º Semestre TADS
      prisma.disciplina.create({
        data: {
          codigo: 'TADS201',
          nome: 'Algoritmos e Programação II',
          carga_horaria: 80,
          semestre: 2,
          tipo_de_sala: 'Lab',
          id_curso: cursos[0].id
        }
      }),
      prisma.disciplina.create({
        data: {
          codigo: 'TADS202',
          nome: 'Banco de Dados I',
          carga_horaria: 80,
          semestre: 2,
          tipo_de_sala: 'Lab',
          id_curso: cursos[0].id
        }
      }),
      prisma.disciplina.create({
        data: {
          codigo: 'TADS203',
          nome: 'Engenharia de Software I',
          carga_horaria: 80,
          semestre: 2,
          tipo_de_sala: 'Sala',
          id_curso: cursos[0].id
        }
      }),
      prisma.disciplina.create({
        data: {
          codigo: 'TADS204',
          nome: 'Redes de Computadores',
          carga_horaria: 80,
          semestre: 2,
          tipo_de_sala: 'Lab',
          id_curso: cursos[0].id
        }
      }),
      prisma.disciplina.create({
        data: {
          codigo: 'TADS205',
          nome: 'Estruturas de Dados',
          carga_horaria: 80,
          semestre: 2,
          tipo_de_sala: 'Lab',
          id_curso: cursos[0].id
        }
      }),
      prisma.disciplina.create({
        data: {
          codigo: 'TADS206',
          nome: 'Gestão de Projetos',
          carga_horaria: 40,
          semestre: 2,
          tipo_de_sala: 'Sala',
          id_curso: cursos[0].id
        }
      }),
      // TSI
      prisma.disciplina.create({
        data: {
          codigo: 'TSI201',
          nome: 'Design de Interface',
          carga_horaria: 80,
          semestre: 2,
          tipo_de_sala: 'Lab',
          id_curso: cursos[1].id
        }
      })
    ]);

    // 6. TURMAS
    console.log('👥 Criando turmas...');
    const turmas = await Promise.all([
      prisma.turma.create({
        data: {
          nome: 'TADS 2024.1 - 1º Semestre',
          num_alunos: 35,
          periodo: 1,
          turno: 'NOTURNO',
          id_curso: cursos[0].id,
          semestre: 1,
          ativa: true
        }
      }),
      prisma.turma.create({
        data: {
          nome: 'TADS 2023.2 - 2º Semestre',
          num_alunos: 32,
          periodo: 2,
          turno: 'NOTURNO',
          id_curso: cursos[0].id,
          semestre: 2,
          ativa: true
        }
      }),
      prisma.turma.create({
        data: {
          nome: 'TSI 2024.1 - 1º Semestre',
          num_alunos: 25,
          periodo: 1,
          turno: 'VESPERTINO',
          id_curso: cursos[1].id,
          semestre: 1,
          ativa: true
        }
      }),
      prisma.turma.create({
        data: {
          nome: 'TSI 2023.2 - 2º Semestre',
          num_alunos: 27,
          periodo: 2,
          turno: 'VESPERTINO',
          id_curso: cursos[1].id,
          semestre: 2,
          ativa: true
        }
      })
    ]);

    // 7. HORÁRIOS (usando horários já existentes no sistema)
    console.log('⏰ Usando horários existentes do sistema...');
    // IDs dos horários já cadastrados no sistema
    const horariosExistentes = [
      'd11ee0aa-e9ca-4a1d-8ba0-c39cc089aebc', // M1 SEGUNDA
      'dad74cff-7ef2-4ea6-9ed3-aceb17b55ff8', // M2 SEGUNDA
      '7dea2a04-2c4d-4d0c-9578-36a0dddf1297', // N1 SEGUNDA
      'a8dd9610-339a-4557-9e1d-c0a6359c81e6', // N2 SEGUNDA
      '19ff9784-4965-4214-a2d1-b21fed8eb0a8', // M1 TERCA
      'ecf3fead-fa67-44d4-9251-53842a13c228', // N1 TERCA
      'b6b55c35-bfa3-48c5-829a-a4426777b341', // N2 TERCA
      'a7d5d110-089a-4f3b-8fab-1edf59302e00', // T1 SEGUNDA
      '22de303e-62aa-4b0b-91fc-df1470c94ee4', // T1 TERCA
      'f65f130c-b43b-40cd-98a7-0987e2a43331'  // T1 QUARTA
    ];

    // 8. RELACIONAMENTOS PROFESSOR-DISCIPLINA
    console.log('🔗 Criando relacionamentos professor-disciplina...');
    await Promise.all([
      prisma.professorDisciplina.create({
        data: {
          id_user: professores[0].id,
          id_disciplina: disciplinas[0].id
        }
      }),
      prisma.professorDisciplina.create({
        data: {
          id_user: professores[0].id,
          id_disciplina: disciplinas[1].id
        }
      }),
      prisma.professorDisciplina.create({
        data: {
          id_user: professores[1].id,
          id_disciplina: disciplinas[2].id
        }
      }),
      prisma.professorDisciplina.create({
        data: {
          id_user: professores[2].id,
          id_disciplina: disciplinas[4].id
        }
      }),
      prisma.professorDisciplina.create({
        data: {
          id_user: professores[3].id,
          id_disciplina: disciplinas[5].id
        }
      }),
      prisma.professorDisciplina.create({
        data: {
          id_user: professores[4].id,
          id_disciplina: disciplinas[6].id
        }
      }),
      prisma.professorDisciplina.create({
        data: {
          id_user: professores[5].id,
          id_disciplina: disciplinas[7].id
        }
      })
    ]);

    // 9. ALOCAÇÕES EXEMPLO
    console.log('📅 Criando alocações exemplo...');
    await Promise.all([
      prisma.alocacao.create({
        data: {
          id_user: professores[0].id,
          id_disciplina: disciplinas[0].id,
          id_turma: turmas[0].id,
          id_sala: salas[0].id,
          id_horario: horariosExistentes[0],
          is_modulo_principal: true
        }
      }),
      prisma.alocacao.create({
        data: {
          id_user: professores[1].id,
          id_disciplina: disciplinas[2].id,
          id_turma: turmas[1].id,
          id_sala: salas[5].id,
          id_horario: horariosExistentes[2],
          is_modulo_principal: true
        }
      }),
      prisma.alocacao.create({
        data: {
          id_user: professores[3].id,
          id_disciplina: disciplinas[5].id,
          id_turma: turmas[1].id,
          id_sala: salas[4].id,
          id_horario: horariosExistentes[4],
          is_modulo_principal: true
        }
      }),
      prisma.alocacao.create({
        data: {
          id_user: professores[5].id,
          id_disciplina: disciplinas[7].id,
          id_turma: turmas[3].id,
          id_sala: salas[4].id,
          id_horario: horariosExistentes[7],
          is_modulo_principal: true
        }
      })
    ]);

    // VERIFICAÇÕES FINAIS
    console.log('\n📊 Verificando dados inseridos...');
    const contadores = await Promise.all([
      prisma.predio.count(),
      prisma.sala.count(),
      prisma.curso.count(),
      prisma.user.count({ where: { role: 'PROFESSOR' } }),
      prisma.disciplina.count(),
      prisma.turma.count(),
      prisma.horario.count(),
      prisma.alocacao.count()
    ]);

    console.log('\n📈 Resumo dos dados inseridos:');
    console.log(`🏢 Prédios: ${contadores[0]}`);
    console.log(`🚪 Salas: ${contadores[1]}`);
    console.log(`🎓 Cursos: ${contadores[2]}`);
    console.log(`👨‍🏫 Professores: ${contadores[3]}`);
    console.log(`📚 Disciplinas: ${contadores[4]}`);
    console.log(`👥 Turmas: ${contadores[5]}`);
    console.log(`⏰ Horários: ${contadores[6]} (total no sistema)`);
    console.log(`📅 Alocações: ${contadores[7]}`);

    // Verificar disciplinas por semestre
    const disciplinasPorSemestre = await prisma.disciplina.groupBy({
      by: ['semestre'],
      _count: { id: true },
      orderBy: { semestre: 'asc' }
    });

    console.log('\n📋 Disciplinas por semestre:');
    for (const item of disciplinasPorSemestre) {
      console.log(`   Semestre ${item.semestre}: ${item._count.id} disciplinas`);
    }

    // Verificar salas por tipo
    const salasPorTipo = await prisma.sala.groupBy({
      by: ['tipo'],
      _count: { id: true }
    });

    console.log('\n🏛️ Salas por tipo:');
    for (const item of salasPorTipo) {
      const tipoNome = item.tipo === 'Lab' ? 'Laboratórios' : 'Salas convencionais';
      console.log(`   ${tipoNome}: ${item._count.id}`);
    }

    console.log('\n✅ População do banco de dados concluída com sucesso!');

  } catch (error) {
    console.error('❌ Erro ao popular banco de dados:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Executar o script
popularBancoCompleto()
  .then(() => {
    console.log('🎉 Script executado com sucesso!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('💥 Falha na execução do script:', error);
    process.exit(1);
  });