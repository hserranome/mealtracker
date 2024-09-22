import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const users = sqliteTable('users', {
  id: integer('id').primaryKey({ autoIncrement: true }).unique().notNull(),
  username: text('username'),
  goal: integer('goal', { mode: 'number' }),
  activity_level: integer('activity_level', { mode: 'number' }),
  sex: integer('sex', { mode: 'number' }),
  birth_year: integer('birth_year', { mode: 'number' }),
  height: integer('height'),
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
