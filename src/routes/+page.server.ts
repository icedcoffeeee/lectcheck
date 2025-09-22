import { desc, ne } from 'drizzle-orm';
import { type Post, db, posts } from '$lib';
import { type Actions, redirect } from '@sveltejs/kit';
import type { PageServerLoadEvent } from './$types';

export async function load({ cookies }: PageServerLoadEvent) {
	const cached_posts = cookies.get('posts');
	let postsQuery: Post[];
	if (cached_posts) postsQuery = JSON.parse(cached_posts);
	else {
		postsQuery = await db.query.posts.findMany({
			limit: 8,
			where: ne(posts.content, ''),
			orderBy: desc(posts.createdAt)
		});
		cookies.set('posts', JSON.stringify(postsQuery), {
			path: '/',
			maxAge: 60 * 60 * 24
		});
	}
	return { posts: postsQuery };
}

export const actions: Actions = {
	gotoTag: async ({ request }) => {
		const data = await request.formData();
		let lectTag = data.get('lectTag') as string;
		if (lectTag.includes('@')) lectTag = lectTag.split('@')[0];
		if (lectTag.includes('.')) lectTag = lectTag.replaceAll('.', '-');
		redirect(303, lectTag.toLowerCase());
	},
	gotoAccount: () => {
		redirect(303, '/account');
	}
};
