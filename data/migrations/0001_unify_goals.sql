CREATE TABLE `goals` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`user_id` integer NOT NULL,
	`high_days` text NOT NULL,
	`calories_goal` integer NOT NULL,
	`initial_weight` real,
	`goal_weight` real,
	`weight_variance_rate` real,
	`estimated_end_date` text,
	`created_at` text DEFAULT 'CURRENT_TIMESTAMP' NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
DROP TABLE `macro_goals`;--> statement-breakpoint
DROP TABLE `weight_goals`;--> statement-breakpoint
CREATE UNIQUE INDEX `goals_id_unique` ON `goals` (`id`);