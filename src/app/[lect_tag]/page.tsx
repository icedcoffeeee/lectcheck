import LectStats from "@/components/lect_stats";
import dynamic from "next/dynamic";
const LectInfo = dynamic(() => import("@/components/lect_info"), {
  ssr: false,
});
interface LectPageProps {
  params: {
    lect_tag: string;
  };
}

export default function LectPage({ params: { lect_tag } }: LectPageProps) {
  return (
    <div>
      <LectInfo tag={lect_tag} />
      <LectStats tag={lect_tag} />
    </div>
  );
}
