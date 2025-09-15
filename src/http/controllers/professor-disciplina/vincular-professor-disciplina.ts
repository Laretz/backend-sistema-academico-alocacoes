import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeVincularProfessorDisciplinaUseCase } from '@/use-cases/@factories/professor-disciplina/make-vincular-professor-disciplina-use-case'
import { RecursoNaoEncontradoError } from '@/use-cases/errors/recurso-nao-encontrado'

export async function vincularProfessorDisciplina(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const vincularProfessorDisciplinaBodySchema = z.object({
    id_user: z.string().uuid(),
    id_disciplina: z.string().uuid(),
  })

  const { id_user, id_disciplina } = vincularProfessorDisciplinaBodySchema.parse(
    request.body,
  )

  try {
    const vincularProfessorDisciplinaUseCase = makeVincularProfessorDisciplinaUseCase()

    const { professorDisciplina } = await vincularProfessorDisciplinaUseCase.execute({
      id_user,
      id_disciplina,
    })

    return reply.status(201).send({
      professorDisciplina,
    })
  } catch (err) {
    if (err instanceof RecursoNaoEncontradoError) {
      return reply.status(404).send({ message: err.message })
    }

    throw err
  }
}
