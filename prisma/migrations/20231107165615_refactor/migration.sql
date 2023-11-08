-- CreateTable
CREATE TABLE "Review" (
    "id" SERIAL NOT NULL,
    "authorId" INTEGER NOT NULL,
    "reviews" INTEGER[],
    "comments" TEXT,
    "lecturerTag" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "kelas" TEXT NOT NULL,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
);
