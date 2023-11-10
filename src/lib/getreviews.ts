import prisma from "@/lib/db";

export async function getReviews(tag: string) {
  return prisma.review.findMany({ where: { lecturerTag: tag } });
}

export async function getMyReviews(userId: string) {
  return prisma.review.findMany({ where: { authorId: userId } });
}
