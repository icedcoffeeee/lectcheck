import { PUBLIC_BETTER_AUTH_URL } from "$env/static/public";
import { createAuthClient } from "better-auth/svelte";

export const authc = createAuthClient({
  baseURL: PUBLIC_BETTER_AUTH_URL,
});
