/*
  Warnings:

  - You are about to drop the column `cargaHorariaTotal` on the `Disciplina` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "public"."TipoDeSala" AS ENUM ('Lab', 'Sala');

-- AlterTable
ALTER TABLE "public"."Alocacao" ADD COLUMN     "is_modulo_principal" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "public"."Disciplina" DROP COLUMN "cargaHorariaTotal",
ADD COLUMN     "carga_horaria_atual" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "carga_horaria_total" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "data_fim_prevista" TIMESTAMP(3),
ADD COLUMN     "data_fim_real" TIMESTAMP(3),
ADD COLUMN     "data_inicio" TIMESTAMP(3),
ADD COLUMN     "tipo_de_sala" "public"."TipoDeSala" NOT NULL DEFAULT 'Sala';

-- AlterTable
ALTER TABLE "public"."Sala" ADD COLUMN     "computadores" INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "public"."ModuloDisciplina" (
    "id" TEXT NOT NULL,
    "id_disciplina" TEXT NOT NULL,
    "id_alocacao_principal" TEXT NOT NULL,
    "id_sala" TEXT NOT NULL,
    "id_horario" TEXT NOT NULL,
    "data_inicio" TIMESTAMP(3) NOT NULL,
    "data_fim" TIMESTAMP(3) NOT NULL,
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ModuloDisciplina_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."ModuloDisciplina" ADD CONSTRAINT "ModuloDisciplina_id_disciplina_fkey" FOREIGN KEY ("id_disciplina") REFERENCES "public"."Disciplina"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ModuloDisciplina" ADD CONSTRAINT "ModuloDisciplina_id_sala_fkey" FOREIGN KEY ("id_sala") REFERENCES "public"."Sala"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ModuloDisciplina" ADD CONSTRAINT "ModuloDisciplina_id_horario_fkey" FOREIGN KEY ("id_horario") REFERENCES "public"."Horario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
