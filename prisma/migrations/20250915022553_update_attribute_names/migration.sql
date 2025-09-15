/*
  Warnings:

  - Migration to update attribute names from camelCase to snake_case
  - Migrating existing data to new column names

*/

-- Step 1: Add new columns with default values
ALTER TABLE "public"."User" ADD COLUMN "carga_horaria_max" INTEGER;

-- Step 2: Migrate existing data
UPDATE "public"."User" SET "carga_horaria_max" = "cargaHorariaMax";

-- Step 3: Drop old columns
ALTER TABLE "public"."User" DROP COLUMN "cargaHorariaMax";

-- Step 4: Add new columns to Horario table
ALTER TABLE "public"."Horario" ADD COLUMN "dia_semana" INTEGER DEFAULT 1;
ALTER TABLE "public"."Horario" ADD COLUMN "horario_inicio" TEXT DEFAULT '08:00';
ALTER TABLE "public"."Horario" ADD COLUMN "horario_fim" TEXT DEFAULT '09:00';

-- Step 5: Migrate existing data for Horario
UPDATE "public"."Horario" SET "dia_semana" = CAST("diaSemana" AS INTEGER) WHERE "diaSemana" IS NOT NULL;
UPDATE "public"."Horario" SET "horario_inicio" = "horarioInicio" WHERE "horarioInicio" IS NOT NULL;
UPDATE "public"."Horario" SET "horario_fim" = "horarioFim" WHERE "horarioFim" IS NOT NULL;

-- Step 6: Drop old columns from Horario
ALTER TABLE "public"."Horario" DROP COLUMN "diaSemana";
ALTER TABLE "public"."Horario" DROP COLUMN "horarioInicio";
ALTER TABLE "public"."Horario" DROP COLUMN "horarioFim";

-- Step 7: Add new column to Turma table
ALTER TABLE "public"."Turma" ADD COLUMN "num_alunos" INTEGER DEFAULT 30;

-- Step 8: Migrate existing data for Turma
UPDATE "public"."Turma" SET "num_alunos" = "numAlunos" WHERE "numAlunos" IS NOT NULL;

-- Step 9: Drop old column from Turma
ALTER TABLE "public"."Turma" DROP COLUMN "numAlunos";

-- Step 10: Make columns NOT NULL after migration
ALTER TABLE "public"."Horario" ALTER COLUMN "dia_semana" SET NOT NULL;
ALTER TABLE "public"."Horario" ALTER COLUMN "horario_inicio" SET NOT NULL;
ALTER TABLE "public"."Horario" ALTER COLUMN "horario_fim" SET NOT NULL;
ALTER TABLE "public"."Turma" ALTER COLUMN "num_alunos" SET NOT NULL;
