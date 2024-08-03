import { integer, real, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { Nutriments } from '../types/Food';

export const foods = sqliteTable('foods', {
  id: integer('id').primaryKey({ autoIncrement: true }).unique().notNull(),
  name: text('name').notNull(),
  brand: text('brand').notNull(),
  code: text('code').notNull(),
  nutriments: text('nutriments', { mode: 'json' }).$type<Nutriments>().notNull(),
  images_url: text('images_url'),
  images_thumb_url: text('images_thumb_url'),
  images_ingredients: text('images_ingredients'),
});

export type FoodSchema = typeof foods.$inferSelect;
export type NewFood = typeof foods.$inferInsert;
