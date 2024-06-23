import { google } from '$lib/auth';
import { redirect } from '@sveltejs/kit';
import { generateCodeVerifier, generateState } from 'arctic';
import type { CookieSerializeOptions } from 'cookie';

import type { RequestEvent } from '@sveltejs/kit';

export async function GET(event: RequestEvent): Promise<Response> {
	const state = generateState();
	const codeVerifier = generateCodeVerifier();
	const url = await google.createAuthorizationURL(state, codeVerifier, {
		scopes: ['profile', 'email']
	});

	const cookiesOpts: CookieSerializeOptions & { path: string } = {
		path: '/',
		secure: import.meta.env.PROD,
		httpOnly: true,
		maxAge: 60 * 10,
		sameSite: 'lax'
	};
	event.cookies.set('google_oauth_state', state, cookiesOpts);
	event.cookies.set('google_oauth_code_verifier', codeVerifier, cookiesOpts);

	redirect(302, url.toString());
}
