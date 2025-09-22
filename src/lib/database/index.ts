import { DATABASE_URL } from '$env/static/private';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

import { lects, posts, users, sessions, accounts, verifications } from './schema';

const connectionString = DATABASE_URL;
const client = postgres(connectionString);

export const db = drizzle(client, {
	schema: { lects, posts, users, sessions, accounts, verifications }
});

export { lects, posts, users };
export type Lect = typeof lects.$inferSelect;
export type Post = typeof posts.$inferSelect;
export type User = typeof users.$inferSelect;
