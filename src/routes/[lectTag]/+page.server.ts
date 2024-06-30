import { db, lects, posts, type Lect } from '$lib';
import { and, asc, desc, eq, sql } from 'drizzle-orm';
import { z } from 'zod';
import { JSDOM } from 'jsdom';
import { type Actions, error, fail } from '@sveltejs/kit';
import type { PageServerLoadEvent } from './$types';

export async function load({ params: { lectTag }, fetch }: PageServerLoadEvent) {
	const tag = lectTag.toLowerCase();
	let lect = await db.query.lects.findFirst({
		where: (lect, { eq }) => eq(lect.lectTag, tag)
	});
	if (!lect) lect = await newLect(tag, fetch);
	if (!lect) error(404, 'Lecturer Not Found.');

	const allPosts = await db.query.posts.findMany({
		where: eq(posts.lectTag, tag),
		orderBy: [
			desc(sql`coalesce(array_length(${posts.likeIds}, 1), 0)`),
			asc(sql`coalesce(array_length(${posts.dislikeIds}, 1), 0)`),
			desc(posts.createdAt)
		]
	});

	return { lect, posts: allPosts };
}

async function newLect(
	tag: string,
	fetch: (input: string) => Promise<Response>
): Promise<Lect | undefined> {
	const lect = await fetch('https://umexpert.um.edu.my/' + tag).then(async (res) => {
		const parent = new JSDOM(await res.text()).window.document.querySelector('.profile-upper');
		if (parent === null) return null;
		const children = parent.children;

		let items: string[] = [];
		items.push(children.item(0)?.getAttribute('src') ?? '');
		for (var i = 1; i < parent.children.length; i++) {
			items.push(children.item(i)?.textContent ?? '');
		}

		const [imgSrc, name, department, faculty] = items;
		return { imgSrc, name, department, faculty };
	});
	if (!lect) return;
	return (
		await db
			.insert(lects)
			.values({ lectTag: tag, ...lect })
			.returning()
	)[0];
}

export const actions: Actions = {
	like: async function ({ request, locals: { user } }) {
		if (!user) return;
		const formData = await request.formData();
		const postId = parseInt(formData.get('postId') as string);

		await db.query.posts
			.findFirst({
				columns: { likeIds: true },
				where: (post) => eq(post.id, postId)
			})
			.then(async function (post) {
				if (!post) return;

				const likeIds = post.likeIds.includes(user.id)
					? sql`array_remove(${posts.likeIds}, ${user.id})`
					: sql`array_append(${posts.likeIds}, ${user.id})`;
				const dislikeIds = sql`array_remove(${posts.dislikeIds}, ${user.id})`;

				await db.update(posts).set({ likeIds, dislikeIds }).where(eq(posts.id, postId));
			});
	},
	dislike: async function ({ request, locals: { user } }) {
		if (!user) return;
		const formData = await request.formData();
		const postId = parseInt(formData.get('postId') as string);

		await db.query.posts
			.findFirst({
				columns: { dislikeIds: true },
				where: (post) => eq(post.id, postId)
			})
			.then(async function (post) {
				if (!post) return;

				const dislikeIds = post.dislikeIds.includes(user.id)
					? sql`array_remove(${posts.dislikeIds}, ${user.id})`
					: sql`array_append(${posts.dislikeIds}, ${user.id})`;
				const likeIds = sql`array_remove(${posts.likeIds}, ${user.id})`;

				await db.update(posts).set({ likeIds, dislikeIds }).where(eq(posts.id, postId));
			});
	},
	delete: async function ({ request, locals: { user } }) {
		if (!user) return;
		const formData = await request.formData();
		const postId = parseInt(formData.get('postId') as string);

		await db.delete(posts).where(and(eq(posts.id, postId), eq(posts.authorId, user.id)));
	},
	submitReview: async function ({ request, locals: { user } }) {
		if (!user) return fail(422);

		const unparsedData: { [key: string]: string | string[] } = {};
		(await request.formData()).forEach((v, k) => (unparsedData[k as string] = v.toString()));

		const { teaching, assessment, guidance, reach } = unparsedData;
		unparsedData.ratings = [teaching, assessment, guidance, reach] as string[];
		unparsedData.authorId = user.id.toString();

		const { success, data, error } = postSchema.safeParse(unparsedData);
		if (!success) return fail(422, { errors: error.errors.map((v) => v.message) });

		const dbData = await db.query.posts.findFirst({
			where: and(
				eq(posts.lectTag, data.lectTag),
				eq(posts.authorId, user.id),
				eq(posts.classCode, data.classCode)
			)
		});
		if (dbData)
			return fail(422, { errors: ["You've already reviewed this class for this lecturer"] });
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
