import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";
import { authMiddleware } from "../middleware/auth";

const router = Router();
const prisma = new PrismaClient();

// Schema de validação para criar módulo
const createModuloSchema = z.object({
  id_disciplina: z.string().uuid(),
  id_alocacao_principal: z.string().uuid(),
  id_sala: z.string().uuid(),
  id_horario: z.string().uuid(),
  data_inicio: z.string().datetime(),
  data_fim: z.string().datetime(),
});

// Schema de validação para atualizar módulo
const updateModuloSchema = z.object({
  id_sala: z.string().uuid().optional(),
  id_horario: z.string().uuid().optional(),
  data_inicio: z.string().datetime().optional(),
  data_fim: z.string().datetime().optional(),
  ativo: z.boolean().optional(),
});

// Listar módulos de uma disciplina
router.get("/disciplina/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;

    const modulos = await prisma.moduloDisciplina.findMany({
      where: {
        id_disciplina: id,
        ativo: true,
      },
      include: {
        disciplina: true,
        sala: true,
        horario: true,
      },
      orderBy: {
        created_at: "desc",
      },
    });

    res.json(modulos);
  } catch (error) {
    console.error("Erro ao buscar módulos:", error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
});

// Criar novo módulo
router.post("/", authMiddleware, async (req, res) => {
  try {
    const validatedData = createModuloSchema.parse(req.body);

    // Verificar se a disciplina existe
    const disciplina = await prisma.disciplina.findUnique({
      where: { id: validatedData.id_disciplina },
    });

    if (!disciplina) {
      return res.status(404).json({ error: "Disciplina não encontrada" });
    }

    // Verificar se a sala está disponível no horário
    const conflito = await prisma.moduloDisciplina.findFirst({
      where: {
        id_sala: validatedData.id_sala,
        id_horario: validatedData.id_horario,
        ativo: true,
        AND: [
          {
            data_inicio: {
              lte: new Date(validatedData.data_fim),
            },
          },
          {
            data_fim: {
              gte: new Date(validatedData.data_inicio),
            },
          },
        ],
      },
    });

    if (conflito) {
      return res.status(400).json({ error: "Sala já ocupada neste horário" });
    }

    const novoModulo = await prisma.moduloDisciplina.create({
      data: {
        ...validatedData,
        data_inicio: new Date(validatedData.data_inicio),
        data_fim: new Date(validatedData.data_fim),
      },
      include: {
        disciplina: true,
        sala: true,
        horario: true,
      },
    });

    // Recalcular a data de fim da disciplina
    await recalcularDataFimDisciplina(validatedData.id_disciplina);

    res.status(201).json(novoModulo);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res
        .status(400)
        .json({ error: "Dados inválidos", details: error.errors });
    }
    console.error("Erro ao criar módulo:", error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
});

// Atualizar módulo
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const validatedData = updateModuloSchema.parse(req.body);

    const moduloExistente = await prisma.moduloDisciplina.findUnique({
      where: { id },
    });

    if (!moduloExistente) {
      return res.status(404).json({ error: "Módulo não encontrado" });
    }

    const moduloAtualizado = await prisma.moduloDisciplina.update({
      where: { id },
      data: {
        ...validatedData,
        data_inicio: validatedData.data_inicio
          ? new Date(validatedData.data_inicio)
          : undefined,
        data_fim: validatedData.data_fim
          ? new Date(validatedData.data_fim)
          : undefined,
      },
      include: {
        disciplina: true,
        sala: true,
        horario: true,
      },
    });

    // Recalcular a data de fim da disciplina
    await recalcularDataFimDisciplina(moduloExistente.id_disciplina);

    res.json(moduloAtualizado);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res
        .status(400)
        .json({ error: "Dados inválidos", details: error.errors });
    }
    console.error("Erro ao atualizar módulo:", error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
});

// Deletar módulo (soft delete)
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;

    const moduloExistente = await prisma.moduloDisciplina.findUnique({
      where: { id },
    });

    if (!moduloExistente) {
      return res.status(404).json({ error: "Módulo não encontrado" });
    }

    await prisma.moduloDisciplina.update({
      where: { id },
      data: { ativo: false },
    });

    // Recalcular a data de fim da disciplina
    await recalcularDataFimDisciplina(moduloExistente.id_disciplina);

    res.status(204).send();
  } catch (error) {
    console.error("Erro ao deletar módulo:", error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
});

// Função auxiliar para recalcular a data de fim da disciplina
async function recalcularDataFimDisciplina(id_disciplina: string) {
  try {
    const disciplina = await prisma.disciplina.findUnique({
      where: { id: id_disciplina },
      include: {
        alocacoes: {
          include: {
            horario: true,
          },
        },
        modulos: {
          where: { ativo: true },
          include: {
            horario: true,
          },
        },
      },
    });

    if (!disciplina || !disciplina.data_inicio) {
      return;
    }

    // Calcular horas semanais (alocações principais + módulos)
    const horasSemanais =
      disciplina.alocacoes.length + disciplina.modulos.length;

    if (horasSemanais === 0) {
      return;
    }

    // Calcular quantas semanas são necessárias
    const semanasNecessarias = Math.ceil(
      disciplina.carga_horaria / horasSemanais
    );

    // Calcular nova data de fim
    const dataFimReal = new Date(disciplina.data_inicio);
    dataFimReal.setDate(dataFimReal.getDate() + semanasNecessarias * 7);

    // Atualizar a disciplina
    await prisma.disciplina.update({
      where: { id: id_disciplina },
      data: {
        data_fim_real: dataFimReal,
        carga_horaria_atual: Math.min(
          disciplina.carga_horaria,
          horasSemanais * semanasNecessarias
        ),
      },
    });
  } catch (error) {
    console.error("Erro ao recalcular data de fim da disciplina:", error);
  }
}

export default router;
