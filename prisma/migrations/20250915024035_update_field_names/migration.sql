/*
  Warnings:

  - You are about to drop the column `horario_fim` on the `Horario` table. All the data in the column will be lost.
  - You are about to drop the column `horario_inicio` on the `Horario` table. All the data in the column will be lost.
  - Added the required column `horarioFim` to the `Horario` table without a default value. This is not possible if the table is not empty.
  - Added the required column `horarioInicio` to the `Horario` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Horario" DROP COLUMN "horario_fim",
DROP COLUMN "horario_inicio",
ADD COLUMN     "horarioFim" TIME NOT NULL,
ADD COLUMN     "horarioInicio" TIME NOT NULL,
ALTER COLUMN "dia_semana" DROP DEFAULT,
ALTER COLUMN "dia_semana" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "public"."Turma" ALTER COLUMN "num_alunos" DROP DEFAULT;
