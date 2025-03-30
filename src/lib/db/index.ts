import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";
import { env } from "$env/dynamic/private";

if (!env.DATABASE_URL) throw new Error("DATABASE_URL is not set");
const client = postgres(env.DATABASE_URL);

export const db = drizzle(client, { schema });

export type User = typeof schema.user.$inferSelect;
export type Lect = typeof schema.lect.$inferSelect;
export type Post = typeof schema.post.$inferSelect;
export type Comment = typeof schema.comment.$inferSelect;

export type LectI = typeof schema.lect.$inferInsert;
export type PostI = typeof schema.post.$inferInsert;
export type CommentI = typeof schema.comment.$inferInsert;
