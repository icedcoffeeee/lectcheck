/*
  Warnings:

  - You are about to drop the column `content` on the `Review` table. All the data in the column will be lost.
  - You are about to drop the column `lecturerId` on the `Review` table. All the data in the column will be lost.
  - You are about to drop the column `rating` on the `Review` table. All the data in the column will be lost.
  - You are about to drop the `Lecturer` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `assignments` to the `Review` table without a default value. This is not possible if the table is not empty.
  - Added the required column `class` to the `Review` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lecturerTag` to the `Review` table without a default value. This is not possible if the table is not empty.
  - Added the required column `teaching` to the `Review` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Review" DROP CONSTRAINT "Review_lecturerId_fkey";

-- AlterTable
ALTER TABLE "Review" DROP COLUMN "content",
DROP COLUMN "lecturerId",
DROP COLUMN "rating",
ADD COLUMN     "assignments" INTEGER NOT NULL,
ADD COLUMN     "class" TEXT NOT NULL,
ADD COLUMN     "comments" TEXT,
ADD COLUMN     "lecturerTag" TEXT NOT NULL,
ADD COLUMN     "teaching" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Lecturer";
