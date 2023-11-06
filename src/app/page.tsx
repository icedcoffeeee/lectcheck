import { LEFT, SPLIT } from "@/components/reviews";
import SearchByTag from "@/components/search_by_tag";
import { Dot } from "lucide-react";

export default function Home() {
  return (
    <main className={SPLIT}>
      <div className={LEFT}>
        <SearchByTag />
      </div>
      <div className="text-white space-y-2">
        <h2>UM Profs</h2>
        <p>
          Welcome to UM Profs, where you can rate your lecturers/professors!
        </p>

        <h2>How It Works</h2>
        <p>Using Rate Your Professors is as easy as 1-2-3:</p>

        <ul className="list-decimal pl-6">
          <li>
            <UL>Search for Professors</UL>:<br />
            Start by entering the <HL>tag</HL> of your professor. You can find
            this at the end of their UMExpert page URL. This is also their um
            email prepend.
          </li>

          <li>
            <UL>Read Reviews</UL>:<br /> Explore the reviews from fellow
            students who have taken courses with your chosen professors.
            You&apos;ll find ratings and comments that highlight both the
            strengths and weaknesses of each instructor. If there aren&apos;t
            any, see number 3.
          </li>

          <li>
            <UL>Share Your Experience</UL>:<br /> After taking a course, we
            encourage you to return the favor by writing your own review. Your
            insights can help future students make informed choices, just as
            others&apos; reviews have helped you.
          </li>
        </ul>
      </div>
      <div className="absolute bottom-0 left-0 flex justify-center items-center py-3 w-full text-xs text-white">
        <span>copyright (c) 2023</span>
        <Dot />
        <span>icedcoffeeee</span>
      </div>
    </main>
  );
}

function HL({ children }: { children: string }) {
  return <span className="bg-red-700 px-1 rounded-md">{children}</span>;
}

function UL({ children }: { children: string }) {
  return (
    <span className="underline-offset-4 underline decoration-yellow-500 decoration-2">
      {children}
    </span>
  );
}
function Code({ children }: { children: string }) {
  return (
    <span className="font-mono bg-black/30 px-1 rounded-xm text-red-500">
      {children}
    </span>
  );
}
