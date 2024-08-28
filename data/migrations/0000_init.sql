CREATE TABLE `users` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`username` text,
	`goal` integer,
	`activity_level` integer,
	`sex` integer,
	`birth_year` integer,
	`weight_unit` text,
	`length_unit` text,
	`height` integer,
	`email` text,
	`password_hash` text,
	`recovery_token` text,
	`recovery_expires_at` text,
	`accepted_tos` text,
	`created_at` text DEFAULT 'CURRENT_TIMESTAMP' NOT NULL
);
--> statement-breakpoint
CREATE TABLE `dairies` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`date` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `dairies_items` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`dairy_id` integer NOT NULL,
	`recipe_id` integer NOT NULL,
	`food_id` integer NOT NULL,
	`quantity` real,
	`unit` text,
	`created_at` text DEFAULT 'CURRENT_TIMESTAMP' NOT NULL,
	FOREIGN KEY (`dairy_id`) REFERENCES `dairies`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`recipe_id`) REFERENCES `recipes`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`food_id`) REFERENCES `foods`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `foods` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`brand` text NOT NULL,
	`quantity` text NOT NULL,
	`unit` text NOT NULL,
	`image_url` text,
	`image_thumb_url` text,
	`image_ingredients` text,
	`nutriment_basis` text,
	`kcal` integer NOT NULL,
	`fat` integer NOT NULL,
	`proteins` integer NOT NULL,
	`carbohydrates` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `recipes` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`user_id` integer NOT NULL,
	`name` text NOT NULL,
	`description` text NOT NULL,
	`image_url` text,
	`image_thumb_url` text,
	`created_at` text DEFAULT 'CURRENT_TIMESTAMP' NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `recipe_items` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`recipe_id` integer NOT NULL,
	`food_id` integer NOT NULL,
	`quantity` integer NOT NULL,
	`unit` text NOT NULL,
	`created_at` text DEFAULT 'CURRENT_TIMESTAMP' NOT NULL,
	FOREIGN KEY (`recipe_id`) REFERENCES `recipes`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`food_id`) REFERENCES `foods`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `macro_goals` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`user_id` integer NOT NULL,
	`days` text NOT NULL,
	`calories_goal` integer NOT NULL,
	`fat_goal` integer NOT NULL,
	`protein_goal` integer NOT NULL,
	`carbs_goal` integer NOT NULL,
	`created_at` text DEFAULT 'CURRENT_TIMESTAMP' NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `weight_goals` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`user_id` integer NOT NULL,
	`height` integer,
	`initial_weight` real,
	`goal_weight` real,
	`weight_variance_rate` real,
	`created_at` text DEFAULT 'CURRENT_TIMESTAMP' NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_id_unique` ON `users` (`id`);--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);--> statement-breakpoint
CREATE UNIQUE INDEX `dairies_id_unique` ON `dairies` (`id`);--> statement-breakpoint
CREATE UNIQUE INDEX `dairies_items_id_unique` ON `dairies_items` (`id`);--> statement-breakpoint
CREATE UNIQUE INDEX `foods_id_unique` ON `foods` (`id`);--> statement-breakpoint
CREATE UNIQUE INDEX `recipes_id_unique` ON `recipes` (`id`);--> statement-breakpoint
CREATE UNIQUE INDEX `recipe_items_id_unique` ON `recipe_items` (`id`);--> statement-breakpoint
CREATE UNIQUE INDEX `macro_goals_id_unique` ON `macro_goals` (`id`);--> statement-breakpoint
CREATE UNIQUE INDEX `weight_goals_id_unique` ON `weight_goals` (`id`);