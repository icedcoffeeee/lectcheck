import { PUBLIC_BETTER_AUTH_URL } from '$env/static/public';
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from '$env/static/private';

import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { sveltekitCookies } from 'better-auth/svelte-kit';
import { getRequestEvent } from '$app/server';

import { db } from './database';

export const auth = betterAuth({
	database: drizzleAdapter(db, {
		provider: 'pg',
		usePlural: true
	}),
	socialProviders: {
		google: {
			clientId: GOOGLE_CLIENT_ID,
			clientSecret: GOOGLE_CLIENT_SECRET,
			scope: ['profile', 'email'],
			redirectURI: PUBLIC_BETTER_AUTH_URL + '/api/auth/callback/google'
		}
	},
	plugins: [sveltekitCookies(getRequestEvent)]
});
