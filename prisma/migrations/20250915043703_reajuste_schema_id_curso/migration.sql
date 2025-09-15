/*
  Warnings:

  - You are about to drop the column `cursoId` on the `User` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."User" DROP CONSTRAINT "User_cursoId_fkey";

-- AlterTable
ALTER TABLE "public"."User" DROP COLUMN "cursoId",
ADD COLUMN     "id_curso" TEXT;

-- AddForeignKey
ALTER TABLE "public"."User" ADD CONSTRAINT "User_id_curso_fkey" FOREIGN KEY ("id_curso") REFERENCES "public"."Curso"("id") ON DELETE SET NULL ON UPDATE CASCADE;
