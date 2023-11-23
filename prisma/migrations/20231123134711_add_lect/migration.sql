-- CreateTable
CREATE TABLE "Lect" (
    "id" SERIAL NOT NULL,
    "tag" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "imgSrc" TEXT NOT NULL,

    CONSTRAINT "Lect_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Lect_tag_key" ON "Lect"("tag");
