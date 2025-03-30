import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "./db";

import { env } from "$env/dynamic/public";
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from "$env/static/private";

export const auth = betterAuth({
  baseURL: env.PUBLIC_BETTER_AUTH_URL,
  database: drizzleAdapter(db, { provider: "pg" }),
  socialProviders: {
    google: {
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
    },
  },
});
