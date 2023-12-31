"use server";

import prisma, { ReviewType } from "./db";

export async function likeReview(review: ReviewType, userId: bigint) {
  const filt = (e: bigint) => e !== userId;
  const already = review.likeIds.includes(userId);
  const likeIds = review.likeIds.filter(filt);
  const dislikeIds = review.dislikeIds.filter(filt);
  if (!already) likeIds.push(userId);
  const updated = await prisma.review.update({
    where: { id: review.id },
    data: {
      likeIds,
      dislikeIds,
    },
  });
  return;
}

export async function dislikeReview(review: ReviewType, userId: bigint) {
  const filt = (e: bigint) => e !== userId;
  const already = review.dislikeIds.includes(userId);
  const likeIds = review.likeIds.filter(filt);
  const dislikeIds = review.dislikeIds.filter(filt);
  if (!already) dislikeIds.push(userId);
  const updated = await prisma.review.update({
    where: { id: review.id },
    data: {
      likeIds,
      dislikeIds,
    },
  });
  return;
}
