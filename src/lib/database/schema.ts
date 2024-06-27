import { integer, pgTable, serial, text, timestamp, varchar } from 'drizzle-orm/pg-core';

export const lects = pgTable('lects', {
	id: serial('id').primaryKey(),
	lectTag: varchar('lect_tag').notNull(),
	name: text('name').notNull(),
	imgSrc: text('img_src').notNull(),
	department: text('department').notNull(),
	faculty: text('faculty').notNull()
});

export const posts = pgTable('posts', {
	id: serial('id').primaryKey(),
	authorId: integer('author_id')
		.notNull()
		.references(() => users.id),
	lectTag: varchar('lect_tag')
		.notNull()
		.references(() => lects.lectTag),
	classCode: varchar('class_code').notNull(),
	ratings: integer('ratings').array().notNull(),
	content: text('content'),
	createdAt: timestamp('created_at').defaultNow(),
	likeIds: serial('like_ids').array().notNull().default([]),
	dislikeIds: serial('dislike_ids').array().notNull().default([])
});

export const users = pgTable('users', {
	id: serial('id').primaryKey(),
	email: text('email').notNull(),
	imageSrc: text('img_src').notNull()
});

export const sessions = pgTable('sessions', {
	id: text('id').primaryKey(),
	userId: integer('user_id')
		.notNull()
		.references(() => users.id),
	expiresAt: timestamp('expires_at', {
		withTimezone: true,
		mode: 'date'
	}).notNull()
});
