CREATE TABLE `user` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`username` text,
	`goal` integer,
	`activity_level` integer,
	`sex` integer,
	`birth_year` integer,
	`weight_unit` text,
	`height_unit` text,
	`initial_height` integer,
	`initial_weight` real,
	`goal_weight` real,
	`weight_variance_rate` real,
	`email` text,
	`password_hash` text,
	`recovery_token` text,
	`recovery_expires_at` text,
	`accepted_tos` text,
	`created_at` text DEFAULT 'CURRENT_TIMESTAMP' NOT NULL
);
--> statement-breakpoint
CREATE TABLE `dairy` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`date` text NOT NULL,
	`meals` text NOT NULL,
	`foods` text NOT NULL,
	`weight` real
);
--> statement-breakpoint
CREATE UNIQUE INDEX `user_id_unique` ON `user` (`id`);--> statement-breakpoint
CREATE UNIQUE INDEX `user_email_unique` ON `user` (`email`);--> statement-breakpoint
CREATE UNIQUE INDEX `dairy_id_unique` ON `dairy` (`id`);