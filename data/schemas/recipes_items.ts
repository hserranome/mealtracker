import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

import { foods } from './foods';
import { recipes } from './recipes';

export const recipe_items = sqliteTable('recipe_items', {
  id: integer('id').primaryKey({ autoIncrement: true }).unique().notNull(),
  recipe_id: integer('recipe_id')
    .notNull()
    .references(() => recipes.id),
  food_id: integer('food_id')
    .notNull()
    .references(() => foods.id),
  quantity: integer('quantity').notNull(),
  unit: text('unit').notNull(),
  created_at: text('created_at').notNull().default('CURRENT_TIMESTAMP'),
});
export type RecipeItem = typeof recipe_items.$inferSelect;
export type NewRecipeItem = typeof recipe_items.$inferInsert;
