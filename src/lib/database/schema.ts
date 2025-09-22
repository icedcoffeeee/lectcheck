import { users } from './user-schema';
import { integer, pgTable, serial, text, timestamp, varchar } from 'drizzle-orm/pg-core';

export const lects = pgTable('lects', {
	id: serial('id').primaryKey(),
	lectTag: varchar('lect_tag').unique().notNull(),
	name: text('name').notNull(),
	imgSrc: text('img_src').notNull(),
	department: text('department').notNull(),
	faculty: text('faculty').notNull()
});

export const posts = pgTable('posts', {
	id: serial('id').primaryKey(),
	authorId: text('author_id')
		.notNull()
		.references(() => users.id),
	lectTag: varchar('lect_tag')
		.notNull()
		.references(() => lects.lectTag),
	classCode: varchar('class_code').notNull(),
	ratings: integer('ratings').array().notNull(),
	content: text('content'),
	createdAt: timestamp('created_at').defaultNow(),
	likeIds: text('like_ids').array().notNull().default([]),
	dislikeIds: text('dislike_ids').array().notNull().default([])
});

export { users, sessions, accounts, verifications } from './user-schema';
