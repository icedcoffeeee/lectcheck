"use client";

import { deleteReview } from "@/lib/adddeletereview";
import { ReviewType } from "@/lib/db";
import { dislikeReview, likeReview } from "@/lib/likedislikereviews";
import { getRelativeTime } from "@/lib/relativetime";
import { sortByDateOrLikes } from "@/lib/sortbydateorlikes";
import { Divider } from "@mui/material";
import {
  LucideIcon,
  LucideProps,
  ThumbsDownIcon,
  ThumbsUpIcon,
  Trash,
} from "lucide-react";
import { Session } from "next-auth";
import { useState } from "react";
import { ErrorSnackbar } from "./addreviewbutton";
import { ClassCode, SingleRating } from "./currentrating";
import stringHash from "string-hash";

export const RUBRICS = [
  ["Teaching", "How well do they present the knowledge?"],
  ["Assessments", "How easy/stressful are the assignments?"],
  ["Guidance", "How well do they answer curiosity?"],
  ["Reach", "How easy are they to contact?"],
];

export const REVIEWGRIDCLASS = "grid grid-cols-1 gap-2 my-3 md:grid-cols-2";

export async function ReviewsList({
  reviews,
  session,
}: {
  reviews: ReviewType[];
  session: Session | null;
}) {
  return (
    <div className={REVIEWGRIDCLASS}>
      {reviews.sort(sortByDateOrLikes).map((r, n) => (
        <ReviewCard review={r} session={session} key={n} />
      ))}
    </div>
  );
}

export function ReviewCard({
  review,
  session,
  title,
}: {
  review: ReviewType;
  session: Session | null;
  title?: string;
}) {
  const userId = BigInt(
    stringHash(session?.user?.email?.split("@")[0] ?? "")
  );
  const [liked, setLiked] = useState(
    Number(review.likeIds.includes(userId)) -
      Number(review.dislikeIds.includes(userId))
  );
  const hasComment = !!review.comments?.length;
  return (
    <div className="bg-white flex flex-col text-black rounded-md md:max-w-xs p-3 shadow-md">
      {title ? <p className="font-bold mb-2">{title}</p> : <></>}
      <p
        data-nocomment={!hasComment}
        className="data-[nocomment=true]:text-gray-500"
      >
        {hasComment ? review.comments : "(No comment)"}
      </p>
      <span className="grow" />
      <div className="flex items-center justify-between mt-2">
        {userId === review.authorId ? (
          <IconButton
            Icon={Trash}
            action={async () => await deleteReview(review)}
            session={session}
          />
        ) : (
          <p />
        )}
        <span className="flex gap-3 items-baseline">
          {review.likeIds.filter((e) => e !== userId).length -
            review.dislikeIds.filter((e) => e !== userId).length +
            liked}
          <IconButton
            Icon={ThumbsUpIcon}
            action={async () => {
              setLiked(liked <= 0 ? 1 : 0);
              await likeReview(review, userId);
            }}
            color={liked === 1 ? "blue" : "black"}
            session={session}
          />
          <IconButton
            Icon={ThumbsDownIcon}
            action={async () => {
              setLiked(liked >= 0 ? -1 : 0);
              await dislikeReview(review, userId);
            }}
            color={liked === -1 ? "blue" : "black"}
            session={session}
          />
        </span>
      </div>
      <Divider sx={{ my: 1.5, borderColor: "#222" }} />
      <div className="flex justify-between items-center">
        <ClassCode code={review.kelas} />
        <p>{getRelativeTime(review.createdAt)}</p>
      </div>
      <div className="flex flex-col gap-1 mt-3">
        {RUBRICS.map((r, n) => (
          <SingleRating
            name={r[0]}
            val={review.reviews[n]}
            size="small"
            className="flex justify-between"
            key={n}
          />
        ))}
      </div>
    </div>
  );
}

function IconButton({
  action,
  Icon,
  session,
  ...props
}: { action: any; session: Session | null; Icon: LucideIcon } & LucideProps) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Icon
        size={15}
        className={"cursor-pointer"}
        onClick={
          session
            ? async () => {
                await action();
              }
            : () => {
                setOpen(true);
              }
        }
        {...props}
      />
      <ErrorSnackbar
        state={[open, setOpen]}
        intent="to like or dislike this review"
      />
    </>
  );
}
