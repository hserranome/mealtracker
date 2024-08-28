import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const dairies = sqliteTable('dairies', {
  id: integer('id').primaryKey({ autoIncrement: true }).unique().notNull(),
  date: text('date').notNull(),
});
export type Dairy = typeof dairies.$inferSelect;
export type NewDairy = typeof dairies.$inferInsert;
