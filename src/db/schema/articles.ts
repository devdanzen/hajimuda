import { relations } from 'drizzle-orm';
import { integer, pgEnum, pgTable, text, varchar } from 'drizzle-orm/pg-core';
import { users } from './users';

export const categoriesEnum = pgEnum('categories', ['teknologi', 'berita', 'edukasi']);

export const articles = pgTable('articles', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  title: varchar({ length: 255 }).notNull(),
  content: text('content'),
  authorId: integer('author_id'),
  category: categoriesEnum().notNull(),
});

export const articlesRelations = relations(articles, ({ one }) => ({
  author: one(users, {
    fields: [articles.authorId],
    references: [users.id],
  }),
}));