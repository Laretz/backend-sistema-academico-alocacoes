import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'
import { prisma } from '@/lib/prisma'

describe('Buscar Disciplinas com Progresso (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to fetch all disciplines with progress', async () => {
    const { token } = await createAndAuthenticateUser(app)

    // Criar dados de teste
    const curso = await prisma.curso.create({
      data: {
        nome: 'Engenharia de Software',
        codigo: 'ES001',
        duracao_semestres: 8,
      },
    })

    const turma = await prisma.turma.create({
      data: {
        nome: '2024.1',
        ano: 2024,
        semestre: 1,
        curso_id: curso.id,
      },
    })

    const disciplina = await prisma.disciplina.create({
      data: {
        nome: 'Programação I',
        codigo: 'PROG001',
        carga_horaria: 60,
        curso_id: curso.id,
        horario_consolidado: 'SEG 08:00-10:00, QUA 08:00-10:00',
        tipo_de_sala: 'LABORATORIO',
      },
    })

    await prisma.alocacao.create({
      data: {
        disciplina_id: disciplina.id,
        turma_id: turma.id,
        professor_id: null,
      },
    })

    const response = await request(app.server)
      .get('/disciplinas/com-progresso')
      .set('Authorization', `Bearer ${token}`)
      .expect(200)

    expect(response.body.disciplinas).toHaveLength(1)
    expect(response.body.disciplinas[0]).toEqual(
      expect.objectContaining({
        id: disciplina.id,
        nome: 'Programação I',
        carga_horaria: 60,
        carga_horaria_atual: expect.any(Number),
        total_aulas: expect.any(Number),
        aulas_ministradas: expect.any(Number),
        tipo_de_sala: 'LABORATORIO',
      })
    )
  })

  it('should be able to fetch disciplines by turma', async () => {
    const { token } = await createAndAuthenticateUser(app)

    const curso = await prisma.curso.create({
      data: {
        nome: 'Ciência da Computação',
        codigo: 'CC001',
        duracao_semestres: 8,
      },
    })

    const turma1 = await prisma.turma.create({
      data: {
        nome: '2024.1',
        ano: 2024,
        semestre: 1,
        curso_id: curso.id,
      },
    })

    const turma2 = await prisma.turma.create({
      data: {
        nome: '2024.2',
        ano: 2024,
        semestre: 2,
        curso_id: curso.id,
      },
    })

    const disciplina1 = await prisma.disciplina.create({
      data: {
        nome: 'Algoritmos I',
        codigo: 'ALG001',
        carga_horaria: 60,
        curso_id: curso.id,
        horario_consolidado: 'TER 10:00-12:00',
        tipo_de_sala: 'SALA_AULA',
      },
    })

    const disciplina2 = await prisma.disciplina.create({
      data: {
        nome: 'Algoritmos II',
        codigo: 'ALG002',
        carga_horaria: 60,
        curso_id: curso.id,
        horario_consolidado: 'QUI 14:00-16:00',
        tipo_de_sala: 'SALA_AULA',
      },
    })

    // Alocar disciplina1 para turma1
    await prisma.alocacao.create({
      data: {
        disciplina_id: disciplina1.id,
        turma_id: turma1.id,
        professor_id: null,
      },
    })

    // Alocar disciplina2 para turma2
    await prisma.alocacao.create({
      data: {
        disciplina_id: disciplina2.id,
        turma_id: turma2.id,
        professor_id: null,
      },
    })

    const response = await request(app.server)
      .get(`/disciplinas/com-progresso?turmaId=${turma1.id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200)

    expect(response.body.disciplinas).toHaveLength(1)
    expect(response.body.disciplinas[0].nome).toBe('Algoritmos I')
  })

  it('should be able to fetch disciplines by curso', async () => {
    const { token } = await createAndAuthenticateUser(app)

    const curso1 = await prisma.curso.create({
      data: {
        nome: 'Sistemas de Informação',
        codigo: 'SI001',
        duracao_semestres: 8,
      },
    })

    const curso2 = await prisma.curso.create({
      data: {
        nome: 'Engenharia da Computação',
        codigo: 'EC001',
        duracao_semestres: 10,
      },
    })

    const disciplina1 = await prisma.disciplina.create({
      data: {
        nome: 'Banco de Dados',
        codigo: 'BD001',
        carga_horaria: 60,
        curso_id: curso1.id,
        horario_consolidado: 'SEX 08:00-10:00',
        tipo_de_sala: 'LABORATORIO',
      },
    })

    const disciplina2 = await prisma.disciplina.create({
      data: {
        nome: 'Circuitos Digitais',
        codigo: 'CD001',
        carga_horaria: 80,
        curso_id: curso2.id,
        horario_consolidado: 'SEG 14:00-16:00',
        tipo_de_sala: 'LABORATORIO',
      },
    })

    const response = await request(app.server)
      .get(`/disciplinas/com-progresso?cursoId=${curso1.id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200)

    expect(response.body.disciplinas).toHaveLength(1)
    expect(response.body.disciplinas[0].nome).toBe('Banco de Dados')
  })

  it('should return empty array when no disciplines found', async () => {
    const { token } = await createAndAuthenticateUser(app)

    const response = await request(app.server)
      .get('/disciplinas/com-progresso?turmaId=999')
      .set('Authorization', `Bearer ${token}`)
      .expect(200)

    expect(response.body.disciplinas).toHaveLength(0)
  })
})