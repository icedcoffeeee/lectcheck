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
import { ErrorSnackbar } from "./addreviewbutton";

export const RUBRICS = [
  ["Teaching", "How well do they present the knowledge?"],
  ["Assessments", "How easy/stressful are the assignments?"],
  ["Guidance", "How well do they answer curiosity?"],
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
          if (Math.abs(offset) < units["month"])
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
  const hasComment = !!review.comments?.length;
  return (
    <div className="bg-white flex flex-col text-black rounded-md md:max-w-xs p-3 shadow-md">
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
          {review.likeIds.length - review.dislikeIds.length}
          <IconButton
            Icon={ThumbsUpIcon}
            action={async () => await likeReview(review, userId)}
            color={review.likeIds.includes(userId) ? "blue" : "black"}
            session={session}
          />
          <IconButton
            Icon={ThumbsDownIcon}
            action={async () => await dislikeReview(review, userId)}
            color={review.dislikeIds.includes(userId) ? "blue" : "black"}
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
  const [pressed, setPressed] = useState(false);
  const [open, setOpen] = useState(false);
  return pressed ? (
    <Loader2 className="animate-spin" size={15} />
  ) : (
    <>
      <Icon
        size={15}
        className={"cursor-pointer"}
        onClick={
          session
            ? async () => {
                setPressed(true);
                await action();
                setPressed(false);
              }
            : () => {
                console.log(open);
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

const units: { [id: string]: number } = {
  year: 24 * 60 * 60 * 1000 * 365,
  month: (24 * 60 * 60 * 1000 * 365) / 12,
  day: 24 * 60 * 60 * 1000,
  hour: 60 * 60 * 1000,
  minute: 60 * 1000,
  second: 1000,
};

function getRelativeTime(date: Date) {
  const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });
  const elapsed = Number(date) - Number(new Date());

  // "Math.abs" accounts for both "past" & "future" scenarios
  for (var u in units)
    if (Math.abs(elapsed) > units[u] || u == "second")
      return rtf.format(
        Math.round(elapsed / units[u]),
        u as Intl.RelativeTimeFormatUnit
      );
}
