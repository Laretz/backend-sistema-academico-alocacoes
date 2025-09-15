import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeBuscarDisciplinasProfessorUseCase } from '@/use-cases/@factories/professor-disciplina/make-buscar-disciplinas-professor-use-case'
import { RecursoNaoEncontradoError } from '@/use-cases/errors/recurso-nao-encontrado'

export async function buscarDisciplinasProfessor(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const buscarDisciplinasProfessorParamsSchema = z.object({
    id_user: z.string().uuid(),
  })

  const { id_user } = buscarDisciplinasProfessorParamsSchema.parse(
    request.params,
  )

  try {
    const buscarDisciplinasProfessorUseCase = makeBuscarDisciplinasProfessorUseCase()

    const { disciplinas } = await buscarDisciplinasProfessorUseCase.execute({
      id_user,
    })

    return reply.status(200).send({
      disciplinas,
    })
  } catch (err) {
    if (err instanceof RecursoNaoEncontradoError) {
      return reply.status(404).send({ message: err.message })
    }

    throw err
  }
}
