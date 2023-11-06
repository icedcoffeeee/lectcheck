import prisma, { ReviewType } from "@/app/db";
import { average } from "@/lib/utils";
import { CustomRating, CustomRatingSingle } from "@/components/ui/rating";
import { Divider } from "@mui/material";
import { AddReview } from "@/components/search_by_tag";

const CLASSTAG = "bg-red-800 w-fit h-fit p-1 rounded-md";
export const SPLIT = "md:flex max-w-5xl min-w-full md:gap-10";
export const LEFT = "md:min-w-[25%] md:max-w-[25%]";

export async function getReviews(lectTag: string) {
  return prisma.review
    .findMany({ where: { lecturerTag: lectTag } })
    .then((v) => {
      prisma.$disconnect;
      return v;
    });
}

export async function getStats(
  lectTag: string,
): Promise<[number, number, string[]]> {
  const reviews = await getReviews(lectTag);

  const assignments = reviews.map((r) => r.assignments);
  const teachings = reviews.map((r) => r.teaching);
  const classes = reviews
    .map((r) => r.kelas)
    .filter((v, i, a) => a.indexOf(v) === i);

  const avg_ass = average(assignments);
  const avg_tea = average(teachings);
  return [avg_tea, avg_ass, classes];
}

interface LectStatsProps {
  lect_tag: string;
}
export async function Reviews({ lect_tag }: LectStatsProps) {
  const reviews = await getReviews(lect_tag);

  const commentedReviews = reviews
    .filter((r) => r.comments !== "")
    .sort((r1, r2) => r2.createdAt.getTime() - r1.createdAt.getTime());

  return <ReviewList commentedReviews={commentedReviews} lectTag={lect_tag} />;
}

interface CurrentStatsProps {
  avg_ass: number;
  avg_tea: number;
  classes: string[];
}
export function CurrentStats({ avg_ass, avg_tea, classes }: CurrentStatsProps) {
  return (
    <div className="my-5 flex flex-col gap-3 text-white">
      <h2>Current Rating</h2>
      <CustomRating label={"Quality of Teaching"} value={avg_tea} />
      <CustomRating label={"Assignments"} value={avg_ass} />
      <div>
        <p>Classes</p>
        {classes.length ? (
          <div className="flex flex-wrap w-full gap-3">
            {classes.map((c, n) => (
              <div className={CLASSTAG} key={n}>
                {c}
              </div>
            ))}
          </div>
        ) : (
          <p>---</p>
        )}
      </div>
    </div>
  );
}

interface ReviewCardProps {
  review: ReviewType;
}
function ReviewCard({ review }: ReviewCardProps) {
  return (
    <div className="bg-white rounded-md md:max-w-xs p-3 shadow-md">
      <p className="text-xl">{review.comments}</p>
      <Divider sx={{ my: 1.5, borderColor: "#222" }} />
      <div className="flex justify-between">
        <p className={CLASSTAG + " text-white text-xs mb-3"}>{review.kelas}</p>
        <p>{review.createdAt.toLocaleDateString()}</p>
      </div>
      <CustomRatingSingle
        label="Quality of Teaching"
        value={review.teaching}
        sizeInd={0}
      />
      <CustomRatingSingle
        label="Assignment"
        value={review.assignments}
        sizeInd={0}
      />
    </div>
  );
}

interface ReviewListProps {
  commentedReviews: ReviewType[];
  lectTag: string;
}
function ReviewList({ commentedReviews, lectTag }: ReviewListProps) {
  return (
    <>
      <div className="flex justify-between md:justify-start md:gap-3">
        <h2>Comments</h2>
        <AddReview lectTag={lectTag} />
      </div>
      {commentedReviews.length ? (
        <div className="flex flex-col md:flex-row md:flex-wrap gap-3">
          {commentedReviews.map((r, n) => (
            <ReviewCard review={r} key={n} />
          ))}
        </div>
      ) : (
        <p className="text-white">None yet</p>
      )}
    </>
  );
}
