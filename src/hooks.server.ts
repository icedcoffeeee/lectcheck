import { auth } from '$lib/auth';
import { svelteKitHandler } from 'better-auth/svelte-kit';
import { building } from '$app/environment';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async function ({ event, resolve }) {
	// Fetch current session from Better Auth
	const { session, user } =
		(await auth.api.getSession({
			headers: event.request.headers
		})) ?? {};

	// Make session and user available on server
	if (session) {
		event.locals.session = session;
		event.locals.user = user;
	}

	return svelteKitHandler({ event, resolve, auth, building });
};
