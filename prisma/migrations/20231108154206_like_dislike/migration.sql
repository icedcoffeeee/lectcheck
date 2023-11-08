/*
  Warnings:

  - You are about to drop the column `peerReview` on the `Review` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Review" DROP COLUMN "peerReview",
ADD COLUMN     "dislikeIds" INTEGER[],
ADD COLUMN     "likeIds" INTEGER[];
