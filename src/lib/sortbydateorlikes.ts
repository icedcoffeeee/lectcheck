import { ReviewType } from "./db";
import { units } from "./relativetime";

export function sortByDateOrLikes(a: ReviewType, b: ReviewType) {
  const offset = Number(b.createdAt) - Number(a.createdAt);
  if (Math.abs(offset) < units["month"]) {
    const like_ratio =
      a.likeIds.length -
      a.dislikeIds.length -
      (b.likeIds.length - b.dislikeIds.length);
    if (like_ratio > 5) return like_ratio;
  }
  return offset;
}
