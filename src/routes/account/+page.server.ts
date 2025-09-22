import { db, posts } from '$lib';
import { redirect } from '@sveltejs/kit';
import { arrayContains, desc, eq } from 'drizzle-orm';
import type { PageServerLoadEvent } from './$types';

export async function load({ locals: { user } }: PageServerLoadEvent) {
	if (!user) redirect(301, '/');
	const postsPromise = db.query.posts.findMany({
		where: eq(posts.authorId, user.id),
		orderBy: [desc(posts.createdAt)]
	});
	const likedPostsPromise = db.query.posts.findMany({
		where: arrayContains(posts.likeIds, [user.id]),
		orderBy: [desc(posts.createdAt)]
	});
	return { postsPromise, likedPostsPromise };
}
