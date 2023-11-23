import { getLectDB } from "@/lib/getlecturerinfo";
import { getLeaderboardList } from "@/lib/getreviews";
import { Skeleton } from "@mui/material";
import { Star } from "lucide-react";
import Image from "next/image";
import { HTMLAttributes, Suspense } from "react";

export async function Leaderboard({
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  const infos = await getLeaderboardList();
  return (
    <div {...props}>
      <h2 className="my-2 flex gap-2 items-center">Lecturer Leaderboard</h2>
      <div className={"grid grid-cols-1 gap-2"}>
        {infos.map((info, n) => (
          <Suspense key={n} fallback={<SkeletonLeaderboardCard />}>
            <LeaderboardCard info={info} />
          </Suspense>
        ))}
      </div>
    </div>
  );
}

async function LeaderboardCard({ info }: { info: [string, number] }) {
  const [tag, avg] = info;
  const { name, imgSrc } = (await getLectDB(tag)) ?? { name: "", imgSrc: "" };
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
