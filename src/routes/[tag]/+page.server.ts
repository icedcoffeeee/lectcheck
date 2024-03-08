import { db, lects, posts } from "$lib/db.js";
import { error } from "@sveltejs/kit";
import { eq } from "drizzle-orm";
import { z } from "zod";

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

export const actions = {
  addpost: async function ({ request, params }) {
    const { tag } = params;
    const form = await request.formData();

    const data: { [key: string]: string } = { lect_tag: tag };
    ["content", "ratings", "authorUID", "class_code"].forEach((v) => {
      data[v] = form.get(v)?.toString() ?? "";
    });

    const post_schema = z.object({
      content: z.string(),
      ratings: z.array(
        z.coerce.number().int().min(1, "Rating must be at least 1.").max(5),
      ),
      authorUID: z.coerce.number(),
      lect_tag: z.string().min(1),
      class_code: z
        .string()
        .regex(/[A-Z]{3}[0-9]{4}/, "Class code must be valid."),
      created_at: z.date().default(new Date()),
    });

    const vals = post_schema.safeParse(data);
    if (!vals.success) return { error: vals.error };

    console.log(vals.data);
    // try {
    //   db.insert(posts).values(vals.data);
    // } catch (e) {
    //   return { error: e };
    // }
  },
};
