/*
  Warnings:

  - You are about to drop the column `id_professor` on the `Alocacao` table. All the data in the column will be lost.
  - You are about to drop the `Professor` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `id_user` to the `Alocacao` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."Alocacao" DROP CONSTRAINT "Alocacao_id_professor_fkey";

-- AlterTable
ALTER TABLE "public"."Alocacao" DROP COLUMN "id_professor",
ADD COLUMN     "id_user" TEXT NOT NULL;

-- DropTable
DROP TABLE "public"."Professor";

-- CreateTable
CREATE TABLE "public"."User" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'PROFESSOR',
    "especializacao" TEXT NOT NULL,
    "cargaHorariaMax" INTEGER NOT NULL,
    "preferencia" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "public"."User"("email");

-- AddForeignKey
ALTER TABLE "public"."Alocacao" ADD CONSTRAINT "Alocacao_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
