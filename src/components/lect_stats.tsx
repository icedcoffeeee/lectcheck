import { Rating } from "@mui/material";
import prisma from "@/app/db";
import { average } from "@/lib/utils";

interface LectStatsProps {
  tag: string;
}
export default async function LectStats({ tag }: LectStatsProps) {
  const reviews = await prisma.review
    .findMany({ where: { lecturerTag: tag } })
    .then((v) => {
      prisma.$disconnect;
      return v;
    });

  const assignments = reviews.map((r) => r.assignments);
  const teachings = reviews.map((r) => r.teaching);

  const avg_ass = average(assignments) || 3;
  const avg_tea = average(teachings);

  return (
    <div className="my-5 flex flex-col gap-3">
      <h2>Current Rating</h2>
      <Rating value={avg_ass} style={{ color: "white" }} />
      <Rating value={avg_tea} />
    </div>
  );
}
