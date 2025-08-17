import { relations } from 'drizzle-orm';
import { integer, pgEnum, pgTable, varchar } from 'drizzle-orm/pg-core';

import { articles } from './articles';

export const rolesEnum = pgEnum('roles', ['member', 'admin']);

export const users = pgTable('users', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  age: integer().notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  role: rolesEnum().notNull().default('member'),
});

export const usersRelations = relations(users, ({ many }) => ({
  posts: many(articles),
}));