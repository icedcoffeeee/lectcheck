import { getLecturerInfo } from "@/lib/getlecturerinfo";
import { getLeaderboardList } from "@/lib/getreviews";
import { Skeleton } from "@mui/material";
import { Star } from "lucide-react";
import Image from "next/image";
import { HTMLAttributes } from "react";

export async function Leaderboard({
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  const infos = await Promise.all(
    await getLeaderboardList().then((i) =>
      i.map((j) =>
        getLecturerInfo(j[0]).then((k) => {
          return {
            tag: j[0],
            avg: j[1],
            name: k?.name ?? "",
            imgSrc: k?.imgSrc ?? "",
          };
        })
      )
    )
  );
  return (
    <div {...props}>
      <h2 className="my-2 flex gap-2 items-center">Lecturer Leaderboard</h2>
      <div className={"grid grid-cols-1 gap-2"}>
        {infos.map((info, n) => {
          return <LeaderboardCard key={n} promise_info={info} />;
        })}
      </div>
    </div>
  );
}

function LeaderboardCard({
  promise_info,
}: {
  promise_info: {
    tag: string;
    avg: number;
    name: string;
    imgSrc: string;
  };
}) {
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
