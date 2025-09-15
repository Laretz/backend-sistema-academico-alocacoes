-- CreateTable
CREATE TABLE "public"."ProfessorDisciplina" (
    "id" TEXT NOT NULL,
    "id_user" TEXT NOT NULL,
    "id_disciplina" TEXT NOT NULL,
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProfessorDisciplina_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ProfessorDisciplina_id_user_id_disciplina_key" ON "public"."ProfessorDisciplina"("id_user", "id_disciplina");

-- AddForeignKey
ALTER TABLE "public"."ProfessorDisciplina" ADD CONSTRAINT "ProfessorDisciplina_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ProfessorDisciplina" ADD CONSTRAINT "ProfessorDisciplina_id_disciplina_fkey" FOREIGN KEY ("id_disciplina") REFERENCES "public"."Disciplina"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
