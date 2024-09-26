import { z } from 'zod';

import { createTablesSchema } from '~/utils/createTablesSchema';

export const CaloriesScheduleTableSchema = z.object({
  calories: z.number(),
});
export const CALORIES_SCHEDULE_TABLE = 'calories_schedule';

const FoodSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  brand: z.string(),
  barcode: z.string(),
  serving_size: z.number(),
  unit: z.string(),
  image_url: z.string().url(),
  image_thumb_url: z.string().url(),
  image_ingredients: z.string().url(),
  nutriment_basis: z.string(),
  kcal: z.number(),
  fat: z.number(),
  proteins: z.number(),
  carbohydrates: z.number(),
});
export const FOOD_TABLE = 'food';
export type Food = z.infer<typeof FoodSchema>;

const FoodServingSize = z.object({
  id: z.number(),
  food_id: z.number(),
  name: z.string(),
  serving_size: z.string(),
  unit: z.string(),
});
export const FOOD_SERVING_SIZES = 'food_serving_sizes';

// Structure tables and values schemas
// TODO: avoid repetition
export const tablesSchema = createTablesSchema({
  [CALORIES_SCHEDULE_TABLE]: CaloriesScheduleTableSchema,
  [FOOD_TABLE]: FoodSchema,
  [FOOD_SERVING_SIZES]: FoodServingSize,
});
export const valuesSchema = {} as const;

// TODO: setRelationships(store)
