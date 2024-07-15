import { integer, real, sqliteTable, text } from 'drizzle-orm/sqlite-core';

import { Food } from '../types/Food';

export const dairies = sqliteTable('dairies', {
  id: integer('id').primaryKey({ autoIncrement: true }).unique().notNull(),
  date: text('date').notNull(),
  meals: text('meals', { mode: 'json' }).$type<string[]>().notNull(),
  foods: text('foods', { mode: 'json' }).$type<Food[]>().notNull(),
  weight: real('weight'),
});
export type Dairy = typeof dairies.$inferSelect;
export type NewDairy = typeof dairies.$inferInsert;
