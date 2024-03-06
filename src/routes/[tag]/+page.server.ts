import { db, lects, posts } from "$lib/db.js";
import { error } from "@sveltejs/kit";
import { eq } from "drizzle-orm";

export async function load({ params }) {
  const { tag } = params;
  const lect = await db
    .select()
    .from(lects)
    .where(eq(lects.lect_tag, tag))
    .limit(1);

  if (!lect) error(404, "Not found");

  const lectPosts = await db
    .select()
    .from(posts)
    .where(eq(posts.lect_tag, tag));

  return { lect: lect[0], lectPosts };
}
