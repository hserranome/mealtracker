import { integer, real, sqliteTable, text } from 'drizzle-orm/sqlite-core';

import { DairyItem } from '../types/Food';

export const dairies = sqliteTable('dairies', {
  id: integer('id').primaryKey({ autoIncrement: true }).unique().notNull(),
  date: text('date').notNull(),
  items: text('items', { mode: 'json' }).$type<DairyItem[]>().notNull(),
  weight: real('weight'),
});
export type Dairy = typeof dairies.$inferSelect;
export type NewDairy = typeof dairies.$inferInsert;
