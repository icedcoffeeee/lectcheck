import { LectInfo } from "@/components/lect_info";
import {
  CurrentStats,
  LEFT,
  Reviews,
  SPLIT,
  getStats,
} from "@/components/reviews";
import SearchByTag from "@/components/search_by_tag";

interface PageProps {
  params: {
    lect_tag: string;
  };
}

export default async function Page({ params: { lect_tag } }: PageProps) {
  const [avg_tea, avg_ass, classes] = await getStats(lect_tag);
  return (
    <div className={SPLIT}>
      <div className={LEFT}>
        <SearchByTag />
        <LectInfo lect_tag={lect_tag} />
        <CurrentStats avg_tea={avg_tea} avg_ass={avg_ass} classes={classes} />
      </div>
      <div className="w-full">
        <Reviews lect_tag={lect_tag} />
      </div>
    </div>
  );
}
