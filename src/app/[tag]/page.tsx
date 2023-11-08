import { CurrentRating } from "@/components/currentrating";
import { LecturerInfo } from "@/components/lecturerinfo";
import { RUBRICS, ReviewsList } from "@/components/reviewslist";
import { SplitPanes } from "@/components/splitpanes";
import { getReviews } from "@/utils/getreviews";
import { getServerSession } from "next-auth";
import { options } from "../auth/[...nextauth]/options";
import { AddReviewButton } from "@/components/addreviewbutton";

export default async function Page({
  params: { tag },
}: {
  params: { tag: string };
}) {
  const commentedReviews = (await getReviews(tag)).filter(
    (r) => r.comments !== null && r.comments.length > 0,
  );
  // const reviews: ReviewType[] = [
  //   {
  //     id: 1,
  //     lecturerTag: "wat",
  //     reviews: [1, 2, 3],
  //     authorId: "hazim.saharuddin",
  //     comments: "not cool",
  //     createdAt: new Date(),
  //     kelas: "SIF2020",
  //   },
  //   {
  //     id: 2,
  //     lecturerTag: "wat",
  //     reviews: [4, 1, 2],
  //     authorId: "hazim.saharuddin",
  //     comments: "bla ".repeat(20),
  //     createdAt: new Date(),
  //     kelas: "SIF2020",
  //   },
  //   {
  //     id: 3,
  //     lecturerTag: "wat",
  //     reviews: [2, 3, 2],
  //     authorId: "matkilau",
  //     comments: "bla ".repeat(4),
  //     createdAt: new Date(),
  //     kelas: "SIF2030",
  //   },
  // ];
  [1, 2, 3, 4].map((a, n) => []);
  const trueReviews = commentedReviews.map((r) => r.reviews);
  const classes = commentedReviews
    .map((r) => r.kelas)
    .filter((v, n, a) => a.indexOf(v) === n);
  const session = await getServerSession(options);
  return (
    <SplitPanes
      leftpane={[
        <LecturerInfo tag={tag} />,
        <CurrentRating
          reviews={trueReviews}
          rubrics={RUBRICS}
          classes={classes}
        />,
      ]}
    >
      <div className="flex justify-between items-center gap-3">
        <h2>Comments</h2>
        <AddReviewButton tag={tag} session={session} />
      </div>
      <ReviewsList reviews={commentedReviews} session={session} />
    </SplitPanes>
  );
}
