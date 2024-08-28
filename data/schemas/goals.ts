import { integer, real, sqliteTable, text } from 'drizzle-orm/sqlite-core';

import { users } from './users';

export const goals = sqliteTable('goals', {
  id: integer('id').primaryKey({ autoIncrement: true }).unique().notNull(),
  user_id: integer('user_id')
    .notNull()
    .references(() => users.id),
  // TODO: implement bitmask instead of text?
  high_days: text('high_days').notNull(),
  calories_goal: integer('calories_goal').notNull(), // daily, then extrapolated
  initial_weight: real('initial_weight'),
  goal_weight: real('goal_weight'),
  weight_variance_rate: real('weight_variance_rate'),
  estimated_end_date: text('estimated_end_date'),
  created_at: text('created_at').notNull().default('CURRENT_TIMESTAMP'),
});
export type Goal = typeof goals.$inferSelect;
export type NewGoal = typeof goals.$inferInsert;
