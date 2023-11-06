/*
  Warnings:

  - You are about to drop the column `class` on the `Review` table. All the data in the column will be lost.
  - Added the required column `kelas` to the `Review` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Review" DROP COLUMN "class",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "kelas" TEXT NOT NULL;
