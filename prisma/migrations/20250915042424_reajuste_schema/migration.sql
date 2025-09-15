/*
  Warnings:

  - You are about to drop the column `cursoId` on the `Disciplina` table. All the data in the column will be lost.
  - You are about to drop the column `cursoId` on the `Turma` table. All the data in the column will be lost.
  - Added the required column `id_curso` to the `Disciplina` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_curso` to the `Turma` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."Disciplina" DROP CONSTRAINT "Disciplina_cursoId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Turma" DROP CONSTRAINT "Turma_cursoId_fkey";

-- AlterTable
ALTER TABLE "public"."Disciplina" DROP COLUMN "cursoId",
ADD COLUMN     "id_curso" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "public"."Turma" DROP COLUMN "cursoId",
ADD COLUMN     "id_curso" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."Disciplina" ADD CONSTRAINT "Disciplina_id_curso_fkey" FOREIGN KEY ("id_curso") REFERENCES "public"."Curso"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Turma" ADD CONSTRAINT "Turma_id_curso_fkey" FOREIGN KEY ("id_curso") REFERENCES "public"."Curso"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
