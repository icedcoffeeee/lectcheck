"use client";

import { Loader2, Star } from "lucide-react";
import Image from "next/image";
import { HTMLAttributes, useEffect, useState } from "react";

export async function Leaderboard({
  list,
  promised_infos,
  ...props
}: {
  list: [string, number][];
  promised_infos: Promise<string[][]>;
} & HTMLAttributes<HTMLDivElement>) {
  const [infos, setInfos] = useState<string[][]>([]);
  useEffect(() => {
    async function getData() {
      setInfos(await promised_infos);
    }
    getData();
  });
  return (
    <div {...props}>
      <h2 className="mt-2 flex gap-2 items-center">
        Lecturer Leaderboard{" "}
        {infos.length == 0 ? <Loader2 className="animate-spin" /> : <></>}
      </h2>
      <div className={"grid grid-cols-1 gap-2"}>
        {infos.map((info, n) => (
          <LeaderboardCard
            tag={list[n][0]}
            avg={list[n][1]}
            info={info}
            key={n}
          />
        ))}
      </div>
    </div>
  );
}

function LeaderboardCard({
  tag,
  avg,
  info,
}: {
  tag: string;
  avg: number;
  info: string[];
}) {
  const [imgSrc, name] = info;
  return (
    <div className="flex gap-4 p-2 bg-white rounded-md text-black text-sm h-fit">
      <Image
        src={imgSrc}
        width={50}
        height={50}
        alt={name}
        className="object-cover h-full border-2 border-gray-900 aspect-square rounded-full"
      />
      <div className="w-full grid grid-cols-2 items-baseline">
        <p className="col-span-2">{name}</p>
        <p>({tag})</p>
        <p className="place-self-end flex gap-2 items-center">
          {avg}
          <Star stroke="orange" size={"0.9rem"} />
        </p>
      </div>
    </div>
  );
}
