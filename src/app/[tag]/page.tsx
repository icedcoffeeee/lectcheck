import { AddReviewButton } from "@/components/addreviewbutton";
import { CurrentRating } from "@/components/currentrating";
import { LecturerInfo } from "@/components/lecturerinfo";
import { RUBRICS, ReviewsList } from "@/components/reviewslist";
import { SplitPanes } from "@/components/splitpanes";
import { filterExtreme, filterLikes, getReviews } from "@/lib/getreviews";
import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options";

export default async function Page({
  params: { tag },
}: {
  params: { tag: string };
}) {
  const session = await getServerSession(options);
  const allReviews = (await getReviews(tag))
    .filter(filterExtreme)
    .filter(filterLikes);
  const commentedReviews = allReviews.filter(
    (r) =>
      (r.comments !== null && r.comments.length > 0) ||
      r.authorId === session?.user?.email?.split("@")[0]
  );
  const trueReviews = allReviews.map((r) => r.reviews);
  const classes = allReviews
    .map((r) => r.kelas)
    .filter((v, n, a) => a.indexOf(v) === n);
  return (
    <SplitPanes
      leftpane={[
        <LecturerInfo tag={tag} key={1} />,
        <CurrentRating
          reviews={trueReviews}
          rubrics={RUBRICS}
          classes={classes}
          key={2}
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
