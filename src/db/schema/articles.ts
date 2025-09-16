import { relations } from 'drizzle-orm';
import { boolean, integer, pgEnum, pgTable, text, timestamp, varchar } from 'drizzle-orm/pg-core';

import { users } from './users';

export const categoriesEnum = pgEnum('categories', ['teknologi', 'berita', 'edukasi']);

export const articles = pgTable('articles', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  title: varchar({ length: 255 }).notNull(),
  slug: varchar({ length: 255 }).notNull().unique(),
  content: text('content'),
  excerpt: text('excerpt'),
  image: text('image'),
  authorId: integer('author_id'),
  category: categoriesEnum().notNull(),
  published: boolean().notNull().default(true),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export const articlesRelations = relations(articles, ({ one }) => ({
  author: one(users, {
    fields: [articles.authorId],
    references: [users.id],
  }),
}));