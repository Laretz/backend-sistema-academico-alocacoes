/*
  Warnings:

  - You are about to drop the column `predio` on the `Sala` table. All the data in the column will be lost.
  - Added the required column `cursoId` to the `Disciplina` table without a default value. This is not possible if the table is not empty.
  - Added the required column `numero` to the `Sala` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cursoId` to the `Turma` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "public"."TurnoCurso" AS ENUM ('MATUTINO', 'VESPERTINO', 'NOTURNO', 'INTEGRAL');

-- AlterTable
ALTER TABLE "public"."Disciplina" ADD COLUMN     "cursoId" TEXT NOT NULL,
ADD COLUMN     "obrigatoria" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "semestre" INTEGER NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE "public"."Sala" DROP COLUMN "predio",
ADD COLUMN     "ativa" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "numero" TEXT NOT NULL,
ADD COLUMN     "predioId" TEXT;

-- AlterTable
ALTER TABLE "public"."Turma" ADD COLUMN     "ativa" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "cursoId" TEXT NOT NULL,
ADD COLUMN     "semestre" INTEGER NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "cursoId" TEXT;

-- CreateTable
CREATE TABLE "public"."Predio" (
    "id" TEXT NOT NULL,
    "codigo" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "descricao" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Predio_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Curso" (
    "id" TEXT NOT NULL,
    "codigo" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "turno" "public"."TurnoCurso" NOT NULL,
    "duracao_semestres" INTEGER NOT NULL,
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Curso_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Predio_codigo_key" ON "public"."Predio"("codigo");

-- CreateIndex
CREATE UNIQUE INDEX "Curso_codigo_key" ON "public"."Curso"("codigo");

-- AddForeignKey
ALTER TABLE "public"."User" ADD CONSTRAINT "User_cursoId_fkey" FOREIGN KEY ("cursoId") REFERENCES "public"."Curso"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Disciplina" ADD CONSTRAINT "Disciplina_cursoId_fkey" FOREIGN KEY ("cursoId") REFERENCES "public"."Curso"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Turma" ADD CONSTRAINT "Turma_cursoId_fkey" FOREIGN KEY ("cursoId") REFERENCES "public"."Curso"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Sala" ADD CONSTRAINT "Sala_predioId_fkey" FOREIGN KEY ("predioId") REFERENCES "public"."Predio"("id") ON DELETE SET NULL ON UPDATE CASCADE;
