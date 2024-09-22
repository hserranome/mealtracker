import { integer, real, sqliteTable, text } from 'drizzle-orm/sqlite-core';

import { dairies } from './dairies';
import { foods } from './foods';
import { recipes } from './recipes';

export const dairies_items = sqliteTable('dairies_items', {
  id: integer('id').primaryKey({ autoIncrement: true }).unique().notNull(),
  dairy_id: integer('dairy_id')
    .notNull()
    .references(() => dairies.id),
  recipe_id: integer('recipe_id')
    .notNull()
    .references(() => recipes.id),
  food_id: integer('food_id')
    .notNull()
    .references(() => foods.id),
  meal: text('meal').notNull(),
  quantity: real('quantity'),
  unit: text('unit'),
  created_at: text('created_at').notNull().default('CURRENT_TIMESTAMP'),
});
export type DairyItem = typeof dairies_items.$inferSelect;
export type NewDairyItem = typeof dairies_items.$inferInsert;
