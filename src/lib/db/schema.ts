import { pgTable as table } from "drizzle-orm/pg-core";
import { serial, text, varchar, integer } from "drizzle-orm/pg-core";
import { user } from "./auth-schema";

export * from "./auth-schema";

export const lect = table("lect", {
  id: serial("id").primaryKey(),
  tag: varchar("tag").notNull(),
  name: text("name").notNull(),
  image: text("image").notNull(),
});

export const post = table("post", {
  id: serial("id").primaryKey(),
  text: text("text").notNull(),
  class: varchar("class").notNull(),
  rating: integer("rating").array().notNull(),
  liked: text("liked")
    .references(() => user.id)
    .array()
    .notNull(),
  disliked: text("liked")
    .references(() => user.id)
    .array()
    .notNull(),

  user: text("user")
    .notNull()
    .references(() => user.id),
  lect: integer("lect")
    .notNull()
    .references(() => lect.id),
});

export const comment = table("comment", {
  id: serial("id").primaryKey(),
  text: text("text").notNull(),

  user: text("user")
    .notNull()
    .references(() => user.id),
  post: integer("post")
    .notNull()
    .references(() => post.id),
});
