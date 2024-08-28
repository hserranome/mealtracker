import { integer, real, sqliteTable, text } from 'drizzle-orm/sqlite-core';

import { users } from './users';

export const weight_goals = sqliteTable('weight_goals', {
  id: integer('id').primaryKey({ autoIncrement: true }).unique().notNull(),
  user_id: integer('user_id')
    .notNull()
    .references(() => users.id),
  height: integer('height'),
  initial_weight: real('initial_weight'),
  goal_weight: real('goal_weight'),
  weight_variance_rate: real('weight_variance_rate'),
  created_at: text('created_at').notNull().default('CURRENT_TIMESTAMP'),
});
export type WeightGoal = typeof weight_goals.$inferSelect;
export type NewWeightGoal = typeof weight_goals.$inferInsert;
