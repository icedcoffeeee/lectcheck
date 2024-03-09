import { db, lects, posts, type PostInsert } from "$lib/db.js";
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

  if (!lect.length) error(404, "Not found");

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

    console.log(Object.fromEntries(form));
    const data: PostInsert = {
      lect_tag: tag,
      content: form.get("content") as string,
      authorUID: parseInt(form.get("authorUID") as string),
      class_code: form.get("class_code") as string,
      ratings: (form.get("ratings") as string)
        .split(",")
        .map((v) => parseInt(v)),
      created_at: new Date(),
    };

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
    if (!vals.success)
      return {
        errors: vals.error.errors
          .map((v) => v.message)
          .filter((v, i, a) => a.indexOf(v) === i),
        // filter redundant messages
        vals: data,
      };

    try {
      db.insert(posts).values(vals.data);
    } catch (e) {
      return { errors: [e], vals: data };
    }
  },
};
