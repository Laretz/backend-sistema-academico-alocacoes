/*
  Warnings:

  - Added the required column `codigo` to the `Horario` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Horario" ADD COLUMN     "codigo" TEXT NOT NULL,
ALTER COLUMN "horarioInicio" SET DATA TYPE TIME,
ALTER COLUMN "horarioFim" SET DATA TYPE TIME;
