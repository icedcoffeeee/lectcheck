import { SplitPanes } from "@/components/splitpanes";
import { getMyReviews } from "@/lib/getreviews";
import { Session, getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";
import { ReviewType } from "@/lib/db";
import { REVIEWGRIDCLASS, ReviewCard } from "@/components/reviewslist";

export default async function Page() {
  const session = await getServerSession(options);
  if (!session) redirect("/api/auth/signin");
  const myReviews = await getMyReviews(
    session.user?.email?.split("@")[0] ?? ""
  );
  return (
    <SplitPanes>
      <h2 className="mb-2">My Reviews</h2>
      <div className={REVIEWGRIDCLASS}>
        {myReviews.map((r, n) => (
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
    <div>
      <ReviewCard
        review={review}
        session={session}
        title={review.lecturerTag}
      />
    </div>
  );
}
