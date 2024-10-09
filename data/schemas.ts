import { z } from 'zod';

import { zodToSimpleSchema } from '~/utils/zodToSimpleSchema';

// CaloriesSchedule
const CaloriesScheduleSchema = z.object({
  calories: z.number(),
});
export const CALORIES_SCHEDULE_TABLE = 'calories_schedule';
export type CaloriesSchedule = z.infer<typeof CaloriesScheduleSchema>;

// Food
const FoodSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  brands: z.string(),
  code: z.string(),
  image_url: z.string().url(),
  deleted: z.boolean(),
  default_serving_size: z.number(),
  default_serving_unit: z.string(),
  energy_kcal: z.number(),
  fat: z.number(),
  saturated_fat: z.number(),
  carbohydrates: z.number(),
  sugars: z.number(),
  proteins: z.number(),
  fiber: z.number().optional(),
  salt: z.number().optional(),
  sodium: z.number().optional(),
});
export const FOOD_TABLE = 'food';
export type Food = z.infer<typeof FoodSchema>;

// Weight
const WeightSchema = z.object({
  weight: z.number(),
});
export const WEIGHT_TABLE = 'weight';

// Meals
const MealSchema = z.object({
  date: z.string().date(),
  name: z.string(),
  order: z.number().int().positive(),
});
export const MEALS_TABLE = 'meals';

const MealItemSchema = z.object({
  meal_id: z.string().uuid(),
  type: z.enum(['food', 'recipe', 'quick_add']),
  quantity: z.number(),
  unit: z.string(),
  // TODO: support ingredients
});

// TinyBase schemas
export const tablesSchema = {
  [CALORIES_SCHEDULE_TABLE]: zodToSimpleSchema(CaloriesScheduleSchema),
  [FOOD_TABLE]: zodToSimpleSchema(FoodSchema),
  [WEIGHT_TABLE]: zodToSimpleSchema(WeightSchema),
  [MEALS_TABLE]: zodToSimpleSchema(MealSchema),
} as const;
export const valuesSchema = {} as const;

// const FoodServingSize = z.object({
//   id: z.number(),
//   food_id: z.number(),
//   name: z.string(),
//   serving_size: z.string(),
//   unit: z.string(),
// });
// export const FOOD_SERVING_SIZES = 'food_serving_sizes';
// setRelationships(store);
