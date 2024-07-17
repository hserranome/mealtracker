import { integer, real, sqliteTable, text } from 'drizzle-orm/sqlite-core';

import { Food } from '../types/Food';

export const dairies = sqliteTable('dairy', {
  id: integer('id').primaryKey({ autoIncrement: true }).unique().notNull(),
  date: text('date').notNull(),
  meals: text('meals', { mode: 'json' }).$type<string[]>().notNull(), // can be removed and replace by settings meals based on index
  foods: text('foods', { mode: 'json' }).$type<Food[]>().notNull(), // need to create Food and Recipe schemas for database, and for this create a DairyItem type
  weight: real('weight'),
});
export type Dairy = typeof dairies.$inferSelect;
export type NewDairy = typeof dairies.$inferInsert;
