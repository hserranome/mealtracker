import { integer, real, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const dairies = sqliteTable('dairies', {
  id: integer('id').primaryKey({ autoIncrement: true }).unique().notNull(),
  date: text('date').notNull(),
  meals: text('meals', { mode: 'json' }).notNull(),
  foods: text('foods', { mode: 'json' }).notNull(),
  weight: real('weight'),
});
