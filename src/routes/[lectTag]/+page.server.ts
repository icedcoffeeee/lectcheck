import { db, posts } from '$lib';
import { and, asc, desc, eq, sql } from 'drizzle-orm';
import { z } from 'zod';
import { type Actions, error, fail } from '@sveltejs/kit';
import type { PageServerLoadEvent } from './$types';

export async function load({ params: { lectTag } }: PageServerLoadEvent) {
  const lect = await db.query.lects.findFirst({
    where: (lect, { eq }) => eq(lect.lectTag, lectTag)
  });
  if (!lect) error(404, 'Lecturer Not Found.');

  const allPosts = await db.query.posts.findMany({
    where: eq(posts.lectTag, lectTag),
    orderBy: [
      desc(sql`coalesce(array_length(${posts.likeIds}, 1), 0)`),
      asc(sql`coalesce(array_length(${posts.dislikeIds}, 1), 0)`),
      desc(posts.createdAt),
    ]
  });

  return { lect, posts: allPosts };
}

export const actions: Actions = {
  like: async function({ request, locals: { user } }) {
    if (!user) return;
    const formData = await request.formData();
    const postId = parseInt(formData.get('postId') as string);

    await db.query.posts
      .findFirst({
        columns: { likeIds: true },
        where: (post) => eq(post.id, postId)
      })
      .then(async function(post) {
        if (!post) return;

        const likeIds = post.likeIds.includes(user.id)
          ? sql`array_remove(${posts.likeIds}, ${user.id})`
          : sql`array_append(${posts.likeIds}, ${user.id})`;
        const dislikeIds = sql`array_remove(${posts.dislikeIds}, ${user.id})`;

        await db.update(posts).set({ likeIds, dislikeIds }).where(eq(posts.id, postId));
      });
  },
  dislike: async function({ request, locals: { user } }) {
    if (!user) return;
    const formData = await request.formData();
    const postId = parseInt(formData.get('postId') as string);

    await db.query.posts
      .findFirst({
        columns: { dislikeIds: true },
        where: (post) => eq(post.id, postId)
      })
      .then(async function(post) {
        if (!post) return;

        const dislikeIds = post.dislikeIds.includes(user.id)
          ? sql`array_remove(${posts.dislikeIds}, ${user.id})`
          : sql`array_append(${posts.dislikeIds}, ${user.id})`;
        const likeIds = sql`array_remove(${posts.likeIds}, ${user.id})`;

        await db.update(posts).set({ likeIds, dislikeIds }).where(eq(posts.id, postId));
      });
  },
  delete: async function({ request, locals: { user } }) {
    if (!user) return;
    const formData = await request.formData();
    const postId = parseInt(formData.get('postId') as string);

    await db.delete(posts)
      .where(and(
        eq(posts.id, postId),
        eq(posts.authorId, user.id)
      ))
  },
  submitReview: async function({ request, locals: { user } }) {
    if (!user) return fail(422);

    const unparsedData: { [key: string]: string | string[] } = {};
    (await request.formData()).forEach((v, k) => (unparsedData[k as string] = v.toString()));

    const { teaching, assessment, guidance, reach } = unparsedData;
    unparsedData.ratings = [teaching, assessment, guidance, reach] as string[];
    unparsedData.authorId = user.id.toString();

    const { success, data, error } = postSchema.safeParse(unparsedData);
    if (!success) return fail(422, { errors: error.errors.map((v) => v.message) });

    await db.insert(posts).values(data);
  }
};

const postSchema = z.object({
  authorId: z.coerce.number(),
  lectTag: z.string(),
  classCode: z.string().regex(/[A-Z]{3}\d{4}/, 'Enter a valid course, ensure all caps'),
  content: z.string().max(200, 'Comment too long'),
  ratings: z
    .array(z.coerce.number().int())
    .refine((r) => !r.includes(0), 'You forgot to give a rating'),
  createdAt: z.date().default(new Date()),
  likeIds: z.number().array().default([]),
  dislikeIds: z.number().array().default([])
});
