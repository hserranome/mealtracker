import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

import { users } from './users';

export const recipes = sqliteTable('recipes', {
  id: integer('id').primaryKey({ autoIncrement: true }).unique().notNull(),
  user_id: integer('user_id')
    .notNull()
    .references(() => users.id),
  name: text('name').notNull(),
  description: text('description').notNull(),
  image_url: text('image_url'),
  image_thumb_url: text('image_thumb_url'),
  created_at: text('created_at').notNull().default('CURRENT_TIMESTAMP'),
});
export type Recipe = typeof recipes.$inferSelect;
export type NewRecipe = typeof recipes.$inferInsert;
