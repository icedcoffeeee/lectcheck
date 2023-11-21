import { Leaderboard } from "@/components/leaderboard";
import { SplitPanes } from "@/components/splitpanes";
import { TagExample } from "@/components/tagexample";
import { HL, UL } from "@/components/ui/typography";
import { getLecturerInfo } from "@/lib/getlecturerinfo";
import { getLeaderboardList } from "@/lib/getreviews";

export default async function Home() {
  const infos = await getLeaderboardList().then((i) =>
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
  );
  return (
    <SplitPanes
      leftpane={[
        <Leaderboard
          key={"leaderboard"}
          infos={infos}
          className="hidden md:contents"
        />,
      ]}
    >
      <h1>LectCheck</h1>
      <p>Welcome to LectCheck, where you can rate your lecturers/professors!</p>

      <h2 className="mt-3">How It Works</h2>
      <p>Using LectCheck is as easy as 1-2-3:</p>

      <ul className="list-decimal pl-6">
        <li>
          <UL>Search for Professors</UL>:<br />
          Start by entering the <HL>tag</HL> of your professor. You can find
          this at the end of their UMExpert page URL. This is also their um
          email prepend.
          <br />
          <TagExample />
        </li>

        <li>
          <UL>Read Reviews</UL>:<br /> Explore the reviews from fellow students
          who have taken courses with your chosen professors. You&apos;ll find
          ratings and comments that highlight both the strengths and weaknesses
          of each instructor. If there aren&apos;t any, see number 3.
        </li>

        <li>
          <UL>Share Your Experience</UL>:<br /> After taking a course, we
          encourage you to return the favor by writing your own review. Your
          insights can help future students make informed choices, just as
          others&apos; reviews have helped you.
        </li>
      </ul>
      <Leaderboard infos={infos} className="contents md:hidden" />
    </SplitPanes>
  );
}
