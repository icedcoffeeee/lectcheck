"use client";

import { ReviewType } from "@/utils/db";
import { Divider } from "@mui/material";
import { ClassCode, SingleRating } from "./currentrating";
import { Session } from "next-auth";
import {
  Loader2,
  LucideIcon,
  LucideProps,
  ThumbsDownIcon,
  ThumbsUpIcon,
  Trash,
} from "lucide-react";
import { deleteReview } from "@/utils/adddeletereview";
import { useState } from "react";
import { dislikeReview, likeReview } from "@/utils/likedislikereviews";

export const RUBRICS = [
  ["Teaching", "How well do they present the knowledge?"],
  ["Assessments", "How easy/stressful are the assignments?"],
  ["Guidance", "How well do they connect answer curiosity?"],
  ["Reach", "How easy are they to contact?"],
];

export async function ReviewsList({
  reviews,
  session,
}: {
  reviews: ReviewType[];
  session: Session | null;
}) {
  return (
    <div className="grid grid-cols-1 gap-2 my-3 md:grid-cols-2">
      {reviews
        .sort((a, b) => {
          const offset = Number(b.createdAt) - Number(a.createdAt);
          if (Math.abs(offset) < 100)
            return (
              a.likeIds.length -
              a.dislikeIds.length -
              (b.likeIds.length - b.dislikeIds.length)
            );
          return offset;
        })
        .filter((a) => a.likeIds.length - a.dislikeIds.length > -5)
        .map((r, n) => (
          <ReviewCard review={r} session={session} key={n} />
        ))}
    </div>
  );
}

function ReviewCard({
  review,
  session,
}: {
  review: ReviewType;
  session: Session | null;
}) {
  const [pressed, setPressed] = useState(false);
  const userId = session?.user?.email?.split("@")[0] ?? "";
  return (
    <div className="bg-white flex flex-col text-black rounded-md md:max-w-xs p-3 shadow-md">
      <p>{review.comments}</p>
      <span className="grow" />
      <div className="flex items-center justify-between mt-2">
        {userId === review.authorId ? (
          <IconButton
            Icon={Trash}
            action={async () => await deleteReview(review)}
          />
        ) : (
          <p />
        )}
        <span className="flex gap-3 items-center">
          {review.likeIds.length - review.dislikeIds.length}
          <IconButton
            Icon={ThumbsUpIcon}
            action={async () => await likeReview(review, userId)}
            color={review.likeIds.includes(userId) ? "blue" : "black"}
          />
          <IconButton
            Icon={ThumbsDownIcon}
            action={async () => await dislikeReview(review, userId)}
            color={review.dislikeIds.includes(userId) ? "blue" : "black"}
          />
        </span>
      </div>
      <Divider sx={{ my: 1.5, borderColor: "#222" }} />
      <div className="flex justify-between items-center">
        <ClassCode code={review.kelas} />
        <p>{review.createdAt.toDateString()}</p>
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
  ...props
}: { action: any; Icon: LucideIcon } & LucideProps) {
  const [pressed, setPressed] = useState(false);
  return pressed ? (
    <Loader2 className="animate-spin" size={15} />
  ) : (
    <Icon
      size={15}
      className={"cursor-pointer"}
      onClick={async () => {
        setPressed(true);
        await action();
        setPressed(false);
      }}
      {...props}
    />
  );
}
