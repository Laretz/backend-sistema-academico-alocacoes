import { PrismaClient, TipoDeSala } from '@prisma/client'

const prisma = new PrismaClient()

async function resetDisciplinas() {
  try {
    // Excluir todas as alocações primeiro (devido à foreign key)
    console.log('Excluindo alocações existentes...')
    await prisma.alocacao.deleteMany({})
    
    // Excluir módulos de disciplina
    console.log('Excluindo módulos existentes...')
    await prisma.moduloDisciplina.deleteMany({})
    
    // Excluir vínculos professor-disciplina
    console.log('Excluindo vínculos professor-disciplina...')
    await prisma.professorDisciplina.deleteMany({})
    
    // Excluir todas as disciplinas existentes
    console.log('Excluindo disciplinas existentes...')
    await prisma.disciplina.deleteMany({})
    
    // Buscar cursos existentes
    const cursos = await prisma.curso.findMany()
    
    if (cursos.length === 0) {
      console.log('Nenhum curso encontrado. Criando cursos primeiro...')
      return
    }
    
    const cursoEngenharia = cursos.find(c => c.nome.includes('Engenharia')) || cursos[0]
    
    // Criar novas disciplinas
    const disciplinas = [
      {
        nome: 'Algoritmos e Estruturas de Dados',
        codigo: 'AED001',
        carga_horaria: 60,
        total_aulas: 72,
        aulas_ministradas: 0,
        periodo_letivo: '2024.1',
        semestre: 3,
        obrigatoria: true,
        id_curso: cursoEngenharia.id,
        tipo_de_sala: TipoDeSala.Lab,
        data_inicio: new Date('2024-02-01'),
        data_fim_prevista: new Date('2024-06-30')
      },
      {
        nome: 'Banco de Dados',
        codigo: 'BD001',
        carga_horaria: CargaHoraria.SESSENTA,
        total_aulas: 72,
        aulas_ministradas: 0,
        periodo_letivo: '2024.1',
        semestre: 4,
        obrigatoria: true,
        id_curso: cursoEngenharia.id,
        tipo_de_sala: TipoDeSala.Lab,
        data_inicio: new Date('2024-02-01'),
        data_fim_prevista: new Date('2024-06-30')
      },
      {
        nome: 'Programação Orientada a Objetos',
        codigo: 'POO001',
        carga_horaria: 90,
        total_aulas: 108,
        aulas_ministradas: 0,
        periodo_letivo: '2024.1',
        semestre: 2,
        obrigatoria: true,
        id_curso: cursoEngenharia.id,
        tipo_de_sala: TipoDeSala.Lab,
        data_inicio: new Date('2024-02-01'),
        data_fim_prevista: new Date('2024-06-30')
      },
      {
        nome: 'Cálculo I',
        codigo: 'CALC001',
        carga_horaria: CargaHoraria.SESSENTA,
        total_aulas: 72,
        aulas_ministradas: 0,
        periodo_letivo: '2024.1',
        semestre: 1,
        obrigatoria: true,
        id_curso: cursoEngenharia.id,
        tipo_de_sala: TipoDeSala.Sala,
        data_inicio: new Date('2024-02-01'),
        data_fim_prevista: new Date('2024-06-30')
      },
      {
        nome: 'Física I',
        codigo: 'FIS001',
        carga_horaria: CargaHoraria.SESSENTA,
        total_aulas: 72,
        aulas_ministradas: 0,
        periodo_letivo: '2024.1',
        semestre: 1,
        obrigatoria: true,
        id_curso: cursoEngenharia.id,
        tipo_de_sala: TipoDeSala.Lab,
        data_inicio: new Date('2024-02-01'),
        data_fim_prevista: new Date('2024-06-30')
      },
      {
        nome: 'Engenharia de Software',
        codigo: 'ES001',
        carga_horaria: 45,
        total_aulas: 54,
        aulas_ministradas: 0,
        periodo_letivo: '2024.1',
        semestre: 5,
        obrigatoria: true,
        id_curso: cursoEngenharia.id,
        tipo_de_sala: TipoDeSala.Sala,
        data_inicio: new Date('2024-02-01'),
        data_fim_prevista: new Date('2024-06-30')
      },
      {
        nome: 'Redes de Computadores',
        codigo: 'RC001',
        carga_horaria: CargaHoraria.SESSENTA,
        total_aulas: 72,
        aulas_ministradas: 0,
        periodo_letivo: '2024.1',
        semestre: 6,
        obrigatoria: true,
        id_curso: cursoEngenharia.id,
        tipo_de_sala: TipoDeSala.Lab,
        data_inicio: new Date('2024-02-01'),
        data_fim_prevista: new Date('2024-06-30')
      },
      {
        nome: 'Inteligência Artificial',
        codigo: 'IA001',
        carga_horaria: CargaHoraria.QUARENTA_CINCO,
        total_aulas: 54,
        aulas_ministradas: 0,
        periodo_letivo: '2024.1',
        semestre: 7,
        obrigatoria: false,
        id_curso: cursoEngenharia.id,
        tipo_de_sala: TipoDeSala.Lab,
        data_inicio: new Date('2024-02-01'),
        data_fim_prevista: new Date('2024-06-30')
      }
    ]
    
    console.log('Criando novas disciplinas...')
    for (const disciplina of disciplinas) {
      await prisma.disciplina.create({
        data: disciplina
      })
      console.log(`Disciplina criada: ${disciplina.nome}`)
    }
    
    console.log('Reset de disciplinas concluído!')
    
  } catch (error) {
    console.error('Erro ao resetar disciplinas:', error)
  } finally {
    await prisma.$disconnect()
  }
}

resetDisciplinas()