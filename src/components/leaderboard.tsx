"use client";

import { Skeleton } from "@mui/material";
import { Star } from "lucide-react";
import Image from "next/image";
import { HTMLAttributes, useEffect, useState } from "react";

interface Info {
  tag: string;
  avg: number;
  name: string;
  imgSrc: string;
}

export async function Leaderboard({
  promise_infos,
  ...props
}: {
  promise_infos: Promise<Info>[];
} & HTMLAttributes<HTMLDivElement>) {
  const [infos, setInfos] = useState<Info[]>([]);
  useEffect(() => {
    async function setData() {
      setInfos(await Promise.all(promise_infos));
    }
    setData();
  }, [promise_infos]);
  return (
    <div {...props}>
      <h2 className="my-2 flex gap-2 items-center">Lecturer Leaderboard</h2>
      <div className={"grid grid-cols-1 gap-2"}>
        {infos.length
          ? infos.map((info, n) => (
              <LeaderboardCard key={n} promise_info={info} />
            ))
          : Array.from({ length: 4 }).map((_, n) => (
              <SkeletonLeaderboardCard key={n} />
            ))}
      </div>
    </div>
  );
}

async function LeaderboardCard({ promise_info }: { promise_info: Info }) {
  const info = promise_info;
  return (
    <div className="flex gap-4 p-2 bg-white rounded-md text-black text-sm h-fit">
      <Image
        src={info.imgSrc}
        width={50}
        height={50}
        alt={info.name}
        className="object-cover h-full border-2 border-gray-900 aspect-square rounded-full"
      />
      <div className="w-full grid grid-cols-2 items-baseline">
        <p className="col-span-2">{info.name}</p>
        <p>({info.tag})</p>
        <p className="place-self-end flex gap-2 items-center">
          {info.avg}
          <Star stroke="orange" size={"0.9rem"} />
        </p>
      </div>
    </div>
  );
}

function SkeletonLeaderboardCard() {
  return (
    <div className="flex gap-4 p-2 bg-white rounded-md text-black text-sm h-fit">
      <Skeleton
        variant="circular"
        width={50}
        height={50}
        className="h-full aspect-square"
      />
      <div className="w-full grid grid-cols-2 items-baseline">
        <Skeleton className="col-span-2" />
        <Skeleton className="w-10" />
        <Skeleton className="w-5 justify-self-end" />
      </div>
    </div>
  );
}
