import { REVIEWGRIDCLASS, ReviewCard } from "@/components/reviewslist";
import { SplitPanes } from "@/components/splitpanes";
import { CallOut } from "@/components/ui/typography";
import { ReviewType } from "@/lib/db";
import { filterExtreme, getMyReviews } from "@/lib/getreviews";
import { sortByDateOrLikes } from "@/lib/sortbydateorlikes";
import { Session, getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { options } from "../api/auth/[...nextauth]/options";
import stringHash from "string-hash";

export default async function Page() {
  const session = await getServerSession(options);
  if (!session) redirect("/api/auth/signin");
  const myReviews = await getMyReviews(
    stringHash(session.user?.email?.split("@")[0] ?? "")
  );
  const containsFullNoComment =
    myReviews.filter((r) => !filterExtreme(r)).length > 0;
  return (
    <SplitPanes
      leftpane={[
        containsFullNoComment && (
          <CallOut key={1} emoji={"⚠️"} color="bg-yellow-800">
            Some of your reviews have been hidden. Giving extremely high/low
            ratings require a comment to ensure helpful reviews
          </CallOut>
        ),
      ]}
    >
      <h2 className="mb-2">My Reviews</h2>
      <div className={REVIEWGRIDCLASS}>
        {myReviews.sort(sortByDateOrLikes).map((r, n) => (
          <MyReviewsCard review={r} session={session} key={n} />
        ))}
      </div>
    </SplitPanes>
  );
}

function MyReviewsCard({
  review,
  session,
}: {
  review: ReviewType;
  session: Session;
}) {
  return (
    <ReviewCard review={review} session={session} title={review.lecturerTag} />
  );
}
