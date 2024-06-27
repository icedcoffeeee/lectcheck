import { type Post, db } from '$lib';
import { type Actions, redirect } from '@sveltejs/kit';
import type { PageServerLoadEvent } from './$types';

export async function load({ cookies }: PageServerLoadEvent) {
	const cached_posts = cookies.get('posts');
	let posts: Post[];
	if (cached_posts) posts = JSON.parse(cached_posts);
	else {
		posts = await db.query.posts.findMany({
			limit: 6,
			where: ({ content }, { ne }) => ne(content, '')
		});
		cookies.set('posts', JSON.stringify(posts), {
			path: '/',
			maxAge: 60 * 60 * 24
		});
	}
	return { posts };
}

export const actions: Actions = {
	gotoTag: async ({ request }) => {
		const data = await request.formData();
		let lectTag = data.get('lectTag') as string;
		if (lectTag.includes('@')) lectTag = lectTag.split('@')[0];
		if (lectTag.includes('.')) lectTag = lectTag.replaceAll('.', '-');
		redirect(303, lectTag.toLowerCase());
	},
	gotoLogin: () => {
		redirect(303, '/login/google');
	},
	gotoAccount: () => {
		redirect(303, '/account');
	}
};
