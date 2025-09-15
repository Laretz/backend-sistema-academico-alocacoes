import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando seed dos dados...');

  // Limpar dados existentes
  await prisma.alocacao.deleteMany();
  await prisma.moduloDisciplina.deleteMany();
  await prisma.disciplina.deleteMany();
  await prisma.turma.deleteMany();
  await prisma.sala.deleteMany();
  await prisma.horario.deleteMany();
  await prisma.user.deleteMany();
  await prisma.curso.deleteMany();

  // Criar usuário coordenador
  const coordenador = await prisma.user.create({
    data: {
      nome: 'Coordenador Teste',
      email: 'coordenador@teste.com',
      senha: await hash('123456', 6),
      role: 'COORDENADOR',
    },
  });

  // Criar professor
  const professor = await prisma.user.create({
    data: {
      nome: 'Professor João Silva',
      email: 'professor@teste.com',
      senha: await hash('123456', 6),
      role: 'PROFESSOR',
      especializacao: 'Engenharia de Software',
      carga_horaria_max: 40,
      preferencia: 'Manhã e Tarde',
    },
  });

  // Criar curso
  const curso = await prisma.curso.create({
    data: {
      codigo: 'ESW001',
      nome: 'Engenharia de Software',
      turno: 'MATUTINO',
      duracao_semestres: 8,
    },
  });

  // Criar disciplina
  const disciplina = await prisma.disciplina.create({
    data: {
      nome: 'Programação Orientada a Objetos',
      carga_horaria_total: 80,
      tipo_de_sala: 'Lab',
      data_inicio: new Date('2024-02-01'),
      data_fim_prevista: new Date('2024-06-30'),
      id_curso: curso.id
    },
  });

  // Criar turma
  const turma = await prisma.turma.create({
    data: {
      nome: 'ESW-2024-1',
      num_alunos: 35,
      periodo: 3,
      turno: 'MATUTINO',
      id_curso: curso.id
    },
  });

  // Criar salas
  const salaAula = await prisma.sala.create({
    data: {
      nome: 'Sala 101',
      numero: '101',
      capacidade: 40,
      tipo: 'AULA',
      computadores: 0,
    },
  });

  const salaLab = await prisma.sala.create({
    data: {
      nome: 'Lab 201',
      numero: '201',
      capacidade: 30,
      tipo: 'LABORATORIO',
      computadores: 30,
    },
  });

  // Criar horários
  const horarios = [
    { codigo: 'M1', dia_semana: 'SEGUNDA', horarioInicio: '08:00', horarioFim: '09:00' },
    { codigo: 'M2', dia_semana: 'SEGUNDA', horarioInicio: '09:00', horarioFim: '10:00' },
    { codigo: 'M3', dia_semana: 'TERCA', horarioInicio: '08:00', horarioFim: '09:00' },
    { codigo: 'M4', dia_semana: 'TERCA', horarioInicio: '09:00', horarioFim: '10:00' },
  ];

  for (const horario of horarios) {
    await prisma.horario.create({
      data: {
        codigo: horario.codigo,
        dia_semana: horario.dia_semana as any,
        horario_inicio: new Date(`2024-01-01T${horario.horarioInicio}:00`),
        horario_fim: new Date(`2024-01-01T${horario.horarioFim}:00`),
      },
    });
  }

  // Criar alocações para associar disciplina à turma
  const alocacoes = [];
  const horariosDisponiveis = await prisma.horario.findMany();
  
  // Criar algumas alocações para a disciplina na turma
  for (let i = 0; i < Math.min(2, horariosDisponiveis.length); i++) {
    const alocacao = await prisma.alocacao.create({
      data: {
        id_user: professor.id,
        id_disciplina: disciplina.id,
        id_turma: turma.id,
        id_sala: salaLab.id, // Usar sala de lab para disciplina de POO
        id_horario: horariosDisponiveis[i].id,
        is_modulo_principal: i === 0
      }
    });
    alocacoes.push(alocacao);
  }

  console.log('✅ Seed concluído!');
  console.log('📊 Dados criados:');
  console.log(`- Coordenador: ${coordenador.email}`);
  console.log(`- Professor: ${professor.email}`);
  console.log(`- Curso: ${curso.nome}`);
  console.log(`- Disciplina: ${disciplina.nome}`);
  console.log(`- Turma: ${turma.nome}`);
  console.log(`- Salas: ${salaAula.nome}, ${salaLab.nome}`);
  console.log(`- Horários: ${horarios.length} criados`);
  console.log(`- Alocações: ${alocacoes.length} criadas`);
}

main()
  .catch((e) => {
    console.error('❌ Erro no seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });