import { integer, real, sqliteTable, text } from 'drizzle-orm/sqlite-core';

import { HeightUnit, WeightUnit } from '../types';

export const users = sqliteTable('users', {
  id: integer('id').primaryKey({ autoIncrement: true }).unique().notNull(),
  username: text('username'),
  goal: integer('goal', { mode: 'number' }),
  activity_level: integer('activity_level', { mode: 'number' }),
  sex: integer('sex', { mode: 'number' }),
  birth_year: integer('birth_year', { mode: 'number' }),
  weight_unit: text('weight_unit', { enum: [WeightUnit.kg, WeightUnit.lb] }),
  height_unit: text('height_unit', { enum: [HeightUnit.cm, HeightUnit.ftIn] }),
  initial_height: integer('initial_height'),
  initial_weight: real('initial_weight'),
  goal_weight: real('goal_weight'),
  weight_variance_rate: real('weight_variance_rate'),
  //   Account
  email: text('email').unique(),
  password_hash: text('password_hash'),
  recovery_token: text('recovery_token'),
  recovery_expires_at: text('recovery_expires_at'),
  accepted_tos: text('accepted_tos'),
  //   Misc
  created_at: text('created_at').notNull().default('CURRENT_TIMESTAMP'),
});
export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
