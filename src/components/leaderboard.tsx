import { getLeaderboardList } from "@/lib/getreviews";
import { HTMLAttributes } from "react";
import Image from "next/image";
import { getLecturerInfo } from "@/lib/getlecturerinfo";
import { Star } from "lucide-react";

export async function Leaderboard({
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  const leaderboardList = await getLeaderboardList();
  return (
    <div {...props}>
      <h2 className="mt-2">Lecturer Leaderboard</h2>
      <div className={"grid grid-cols-1 gap-2"}>
        {leaderboardList.map(([tag, avg], n) => (
          <LeaderboardCard tag={tag} avg={avg} key={n} />
        ))}
      </div>
    </div>
  );
}

async function LeaderboardCard({ tag, avg }: { tag: string; avg: number }) {
  const lectInfo = await getLecturerInfo(tag);
  return (
    <div className="flex gap-4 p-2 bg-white rounded-md text-black text-sm h-fit">
      <Image
        src={lectInfo?.imgSrc || ""}
        width={50}
        height={50}
        alt={lectInfo?.name || ""}
        className="object-cover h-full border-2 border-gray-900 aspect-square rounded-full"
      />
      <div className="w-full grid grid-cols-2 items-baseline">
        <p className="col-span-2">{lectInfo?.name || ""}</p>
        <p>({tag})</p>
        <p className="place-self-end flex gap-2 items-center">
          {avg}
          <Star stroke="orange" size={"0.9rem"} />
        </p>
      </div>
    </div>
  );
}
