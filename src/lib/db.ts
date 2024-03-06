import "dotenv/config";
import {
  bigint,
  char,
  integer,
  pgTable,
  serial,
  timestamp,
  text,
} from "drizzle-orm/pg-core";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

const ID = serial("id").primaryKey();
const UIDs = (name: string) =>
  bigint(name, { mode: "number" }).array().default([]).notNull();
const created_at = timestamp("created_at", { mode: "date" }).notNull();

export const lects = pgTable("lects", {
  id: ID,
  lect_tag: text("lect_tag").notNull(),
  name: text("name").notNull(),
  faculty: text("faculty").notNull(),
  department: text("department").notNull(),
  img_src: text("img_src").notNull(),
});

export const posts = pgTable("posts", {
  id: ID,
  content: text("content").notNull(),
  ratings: integer("ratings").array().notNull(),
  authorUID: bigint("authorUID", { mode: "number" }).notNull(),
  lect_tag: text("lect_tag").notNull(),
  class_code: char("class_code", { length: 7 }).notNull(),

  likeUIDs: UIDs("likeUIDs"),
  dislikeUIDs: UIDs("dislikeUIDs"),
  commentIDs: integer("commentIDs").array().default([]).notNull(),
  created_at,
});

export const comments = pgTable("comments", {
  id: ID,
  content: text("content").notNull(),
  authorUID: bigint("authorUID", { mode: "number" }).notNull(),

  likeUIDs: UIDs("likeUIDs"),
  dislikeUIDs: UIDs("dislikeUIDs"),
  created_at,
});

export type Lect = typeof lects.$inferSelect;
export type LectInsert = typeof lects.$inferInsert;

export type Post = typeof posts.$inferSelect;
export type PostInsert = typeof posts.$inferInsert;

export type Comment = typeof comments.$inferSelect;
export type CommentInsert = typeof comments.$inferInsert;

const url = process.env.DATABASE_URL ?? "";
const client = postgres(url, { prepare: false });
export const db = drizzle(client);
