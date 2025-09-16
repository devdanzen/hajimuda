import { relations } from 'drizzle-orm';
import { integer, pgEnum, pgTable, timestamp,varchar } from 'drizzle-orm/pg-core';

import { articles } from './articles';

export const rolesEnum = pgEnum('roles', ['member', 'admin']);

export const users = pgTable('users', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  age: integer().notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  password: varchar({ length: 255 }).notNull(),
  role: rolesEnum().notNull().default('member'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

export const usersRelations = relations(users, ({ many }) => ({
  posts: many(articles),
}));