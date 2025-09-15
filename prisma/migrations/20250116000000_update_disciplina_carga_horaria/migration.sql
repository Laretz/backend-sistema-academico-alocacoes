-- CreateEnum
CREATE TYPE "CargaHoraria" AS ENUM ('TRINTA', 'QUARENTA_CINCO', 'SESSENTA', 'NOVENTA');

-- AlterTable
ALTER TABLE "Disciplina" ADD COLUMN "carga_horaria" "CargaHoraria";
ALTER TABLE "Disciplina" ADD COLUMN "total_aulas" INTEGER;
ALTER TABLE "Disciplina" ADD COLUMN "aulas_ministradas" INTEGER DEFAULT 0;
ALTER TABLE "Disciplina" ADD COLUMN "periodo_letivo" TEXT;
ALTER TABLE "Disciplina" ADD COLUMN "semestre" INTEGER;
ALTER TABLE "Disciplina" ADD COLUMN "obrigatoria" BOOLEAN DEFAULT true;

-- Migrate existing data
UPDATE "Disciplina" SET 
  "carga_horaria" = CASE 
    WHEN "carga_horaria_total" = 30 THEN 'TRINTA'::"CargaHoraria"
    WHEN "carga_horaria_total" = 45 THEN 'QUARENTA_CINCO'::"CargaHoraria"
    WHEN "carga_horaria_total" = 60 THEN 'SESSENTA'::"CargaHoraria"
    WHEN "carga_horaria_total" = 90 THEN 'NOVENTA'::"CargaHoraria"
    ELSE 'SESSENTA'::"CargaHoraria"
  END,
  "total_aulas" = CASE 
    WHEN "carga_horaria_total" = 30 THEN 36
    WHEN "carga_horaria_total" = 45 THEN 54
    WHEN "carga_horaria_total" = 60 THEN 72
    WHEN "carga_horaria_total" = 90 THEN 108
    ELSE 72
  END,
  "periodo_letivo" = '2024.1',
  "semestre" = 1
WHERE "carga_horaria" IS NULL;

-- Make new columns NOT NULL
ALTER TABLE "Disciplina" ALTER COLUMN "carga_horaria" SET NOT NULL;
ALTER TABLE "Disciplina" ALTER COLUMN "total_aulas" SET NOT NULL;
ALTER TABLE "Disciplina" ALTER COLUMN "aulas_ministradas" SET NOT NULL;
ALTER TABLE "Disciplina" ALTER COLUMN "periodo_letivo" SET NOT NULL;
ALTER TABLE "Disciplina" ALTER COLUMN "semestre" SET NOT NULL;
ALTER TABLE "Disciplina" ALTER COLUMN "obrigatoria" SET NOT NULL;

-- Drop old column
ALTER TABLE "Disciplina" DROP COLUMN "carga_horaria_total";
ALTER TABLE "Disciplina" DROP COLUMN "carga_horaria_atual";