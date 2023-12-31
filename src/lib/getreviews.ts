import prisma from "@/lib/db";
import { average } from "./utils";

export async function getReviews(tag: string) {
  return prisma.review.findMany({ where: { lecturerTag: tag } });
}

export async function getMyReviews(userId: bigint) {
  return prisma.review.findMany({ where: { authorId: userId } });
}

export async function getLeaderboardList() {
  const allReviews = (
    await prisma.review.findMany({
      select: {
        lecturerTag: true,
        comments: true,
        reviews: true,
        likeIds: true,
        dislikeIds: true,
      },
    })
  )
    .filter(filterExtreme)
    .filter(filterLikes);

  const tags = allReviews
    .map((r) => r.lecturerTag)
    .filter((v, n, a) => a.indexOf(v) === n);

  let list: [string, number][] = tags.map((t) => [t, 0]);

  allReviews.map((v) => {
    const currAvg = list[tags.indexOf(v.lecturerTag)][1];

    if (currAvg == 0) {
      list[tags.indexOf(v.lecturerTag)][1] = average(v.reviews);
    } else {
      list[tags.indexOf(v.lecturerTag)][1] = average([currAvg, ...v.reviews]);
    }
  });

  return list.sort((a, b) => b[1] - a[1]).slice(0, 4);
}

export function filterExtreme(review: any) {
  if ([1, 5].includes(average(review.reviews)) && review.comments === "")
    return false;
  return true;
}

export function filterLikes(review: any) {
  return review.likeIds.length - review.dislikeIds.length > -5;
}
