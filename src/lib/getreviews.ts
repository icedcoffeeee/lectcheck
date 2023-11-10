import prisma from "@/lib/db";

export async function getReviews(tag: string) {
  return prisma.review.findMany({ where: { lecturerTag: tag } }).then((v) => {
    prisma.$disconnect();
    return v;
  });
}

export async function getStats(tag: string) {
  const reviews = await getReviews(tag);
  const ratings = reviews.map((r) => r.reviews);
}
