"use client";

import { average } from "@/lib/utils";
import { Star } from "@mui/icons-material";
import { Rating, Tooltip } from "@mui/material";
import { Info } from "lucide-react";
import { HTMLAttributes } from "react";
export function CurrentRating({
  reviews,
  rubrics,
  classes,
}: {
  reviews: number[][];
  rubrics: string[][];
  classes: string[];
}) {
  return (
    <div className="flex flex-col gap-1">
      <h2>Current Ratings ({reviews.length})</h2>
      {rubrics.map((R, n) => {
        const avgReview = average(reviews.map((r) => r[n]));
        return <SingleRating name={R[0]} desc={R[1]} val={avgReview} key={n} />;
      })}
      <p>Classes</p>
      <div className="flex flex-wrap gap-2">
        {classes.length ? (
          classes.map((c, n) => <ClassCode code={c} key={n} />)
        ) : (
          <p>None</p>
        )}
      </div>
    </div>
  );
}

export function SingleRating({
  name,
  desc,
  val,
  size,
  ...props
}: {
  name: string;
  desc?: string;
  val: number;
  size?: "small" | "large" | "medium";
} & HTMLAttributes<HTMLDivElement>) {
  return (
    <div {...props}>
      <p className="flex gap-3 items-center">
        {name}
        {desc ? (
          <Tooltip
            title={<p className="text-lg">{desc}</p>}
            placement="bottom"
            enterTouchDelay={0}
            leaveTouchDelay={2000}
          >
            <Info size={15} />
          </Tooltip>
        ) : (
          <></>
        )}
      </p>
      <div className="flex gap-4 items-center">
        <Rating
          readOnly
          value={val}
          sx={{ stroke: "white" }}
          emptyIcon={<Star sx={{ stroke: "white" }} fontSize={"inherit"} />}
          size={size ?? "large"}
        />
        {val} / 5
      </div>
    </div>
  );
}

export function ClassCode({ code }: { code: string }) {
  return (
    <div className="bg-red-800 text-white w-fit h-fit p-1 rounded-md">
      {code}
    </div>
  );
}
