import { prisma } from "$lib/db.js";
import { error } from "@sveltejs/kit";

export async function load({ params }) {
  const { tag } = params;
  const lect = await prisma.lect.findUnique({ where: { tag } });

  if (!lect) error(404, "Not found");

  const reviews = await prisma.review.findMany({ where: { lecturerTag: tag } });

  return { lect, reviews };
}
