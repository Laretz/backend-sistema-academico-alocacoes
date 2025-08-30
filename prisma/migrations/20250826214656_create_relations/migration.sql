/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "public"."User";

-- CreateTable
CREATE TABLE "public"."Professor" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "especializacao" TEXT NOT NULL,
    "cargaHorariaMax" INTEGER NOT NULL,
    "preferenciasHorario" TEXT,

    CONSTRAINT "Professor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Disciplina" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "cargaHorariaTotal" INTEGER NOT NULL,

    CONSTRAINT "Disciplina_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Turma" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "numAlunos" INTEGER NOT NULL,
    "periodo" INTEGER NOT NULL,
    "turno" TEXT NOT NULL,

    CONSTRAINT "Turma_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Sala" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "predio" TEXT NOT NULL,
    "capacidade" INTEGER NOT NULL,
    "tipo" TEXT NOT NULL,

    CONSTRAINT "Sala_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Horario" (
    "id" TEXT NOT NULL,
    "diaSemana" TEXT NOT NULL,
    "horarioInicio" TIMESTAMP(3) NOT NULL,
    "horarioFim" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Horario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Alocacao" (
    "id" TEXT NOT NULL,
    "id_professor" TEXT NOT NULL,
    "id_disciplina" TEXT NOT NULL,
    "id_turma" TEXT NOT NULL,
    "id_sala" TEXT NOT NULL,
    "id_horario" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Alocacao_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."Alocacao" ADD CONSTRAINT "Alocacao_id_professor_fkey" FOREIGN KEY ("id_professor") REFERENCES "public"."Professor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Alocacao" ADD CONSTRAINT "Alocacao_id_disciplina_fkey" FOREIGN KEY ("id_disciplina") REFERENCES "public"."Disciplina"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Alocacao" ADD CONSTRAINT "Alocacao_id_turma_fkey" FOREIGN KEY ("id_turma") REFERENCES "public"."Turma"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Alocacao" ADD CONSTRAINT "Alocacao_id_sala_fkey" FOREIGN KEY ("id_sala") REFERENCES "public"."Sala"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Alocacao" ADD CONSTRAINT "Alocacao_id_horario_fkey" FOREIGN KEY ("id_horario") REFERENCES "public"."Horario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
