DROP TABLE IF EXISTS `dairies`;
--> statement-breakpoint
CREATE TABLE `dairies` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`date` text NOT NULL,
	`meals` text NOT NULL,
	`foods` text NOT NULL,
	`weight` real
);
--> statement-breakpoint
CREATE UNIQUE INDEX `dairies_id_unique` ON `dairies` (`id`);