import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const foods = sqliteTable('foods', {
  id: integer('id').primaryKey({ autoIncrement: true }).unique().notNull(),
  name: text('name').notNull(),
  brand: text('brand').notNull(),
  quantity: text('quantity').notNull(),
  unit: text('unit').notNull(),
  image_url: text('image_url'),
  image_thumb_url: text('image_thumb_url'),
  image_ingredients: text('image_ingredients'),
  nutriment_basis: text('nutriment_basis'),
  kcal: integer('kcal').notNull(),
  fat: integer('fat').notNull(),
  proteins: integer('proteins').notNull(),
  carbohydrates: integer('carbohydrates').notNull(),
});
export type Food = typeof foods.$inferSelect;
export type NewFood = typeof foods.$inferInsert;
