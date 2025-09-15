import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeBuscarProfessoresDisciplinaUseCase } from '@/use-cases/@factories/professor-disciplina/make-buscar-professores-disciplina-use-case'
import { RecursoNaoEncontradoError } from '@/use-cases/errors/recurso-nao-encontrado'

export async function buscarProfessoresDisciplina(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const buscarProfessoresDisciplinaParamsSchema = z.object({
    id_disciplina: z.string().uuid(),
  })

  const { id_disciplina } = buscarProfessoresDisciplinaParamsSchema.parse(
    request.params,
  )

  try {
    const buscarProfessoresDisciplinaUseCase = makeBuscarProfessoresDisciplinaUseCase()

    const { professores } = await buscarProfessoresDisciplinaUseCase.execute({
      id_disciplina,
    })

    return reply.status(200).send({
      professores,
    })
  } catch (err) {
    if (err instanceof RecursoNaoEncontradoError) {
      return reply.status(404).send({ message: err.message })
    }

    throw err
  }
}
