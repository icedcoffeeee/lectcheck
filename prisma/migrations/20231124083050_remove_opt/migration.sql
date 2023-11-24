/*
  Warnings:

  - Made the column `department` on table `Lect` required. This step will fail if there are existing NULL values in that column.
  - Made the column `faculty` on table `Lect` required. This step will fail if there are existing NULL values in that column.
  - Made the column `email` on table `Lect` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Lect" ALTER COLUMN "department" SET NOT NULL,
ALTER COLUMN "faculty" SET NOT NULL,
ALTER COLUMN "email" SET NOT NULL;
