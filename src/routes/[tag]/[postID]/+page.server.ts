import { db, posts } from "$lib/db.js";
import { error } from "@sveltejs/kit";
import { eq } from "drizzle-orm";

export async function load({ params }) {
  const { postID } = params;

  const postsID = await db
    .select()
    .from(posts)
    .where(eq(posts.id, parseInt(postID)));

  if (!postsID.length) error(404, "Not Found");

  return { post: postsID[0] };
}
