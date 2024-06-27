import { db, posts } from '$lib';
import { lucia } from '$lib/auth';
import { type Actions, fail, redirect } from '@sveltejs/kit';
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

export const actions: Actions = {
	default: async ({ cookies, locals: { session } }) => {
		if (!session) {
			return fail(401);
		}
		await lucia.invalidateSession(session.id);
		const sessionCookie = lucia.createBlankSessionCookie();
		cookies.set(sessionCookie.name, sessionCookie.value, {
			path: '.',
			...sessionCookie.attributes
		});
		redirect(302, '/');
	}
};
