import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

import { users } from './users';

export const macro_goals = sqliteTable('macro_goals', {
  id: integer('id').primaryKey({ autoIncrement: true }).unique().notNull(),
  user_id: integer('user_id')
    .notNull()
    .references(() => users.id),
  // TODO: implement bitmask instead of text?
  days: text('days').notNull(),
  calories_goal: integer('calories_goal').notNull(),
  fat_goal: integer('fat_goal').notNull(),
  protein_goal: integer('protein_goal').notNull(),
  carbs_goal: integer('carbs_goal').notNull(),
  created_at: text('created_at').notNull().default('CURRENT_TIMESTAMP'),
});
export type MacroGoal = typeof macro_goals.$inferSelect;
export type NewMacroGoal = typeof macro_goals.$inferInsert;
