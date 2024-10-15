import { observable } from '@legendapp/state';
import { ObservablePersistMMKV } from '@legendapp/state/persist-plugins/mmkv';
import { syncObservable } from '@legendapp/state/sync';
import { z } from 'zod';

import { zodToSimpleSchema } from '~/utils/zodToSimpleSchema';

// Calories schedule
// // Types
export type Days =
  | 'monday'
  | 'tuesday'
  | 'wednesday'
  | 'thursday'
  | 'friday'
  | 'saturday'
  | 'sunday';
export type CaloriesSchedule = Record<Days, number>;
// // Observable
export const caloriesSchedule$ = observable({
  schedule: {} as CaloriesSchedule,
  setSchedule: (newSchedule: CaloriesSchedule) => caloriesSchedule$.schedule.set(newSchedule),
  getDateCalories: (date: Date) => {
    const day = date.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase() as Days;
    return caloriesSchedule$.schedule.get()[day];
  },
});
// // Persist
syncObservable(caloriesSchedule$, {
  persist: {
    name: 'caloriesSchedule',
    plugin: ObservablePersistMMKV,
  },
});

// Nutriments
const NutrimentsSchema = z.object({
  nutriment_basis: z.string(), // per 100g, 100ml, etc.
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
export type Nutriments = z.infer<typeof NutrimentsSchema>;

// Serving Size
const ServingSizeSchema = z.object({
  id: z.number(),
  name: z.string(),
  quantity: z.number(),
});
export type ServingSize = z.infer<typeof ServingSizeSchema>;

// Food
// // Types
const FoodSchema = z.object({
  id: z.string(), // can be barcode or generated uuid
  name: z.string(),
  brands: z.string().optional(),
  code: z.string(),
  image_url: z.string().url(),
  deleted: z.boolean(),
  base_nutriments: NutrimentsSchema,
  base_serving_size: z.number(),
  base_serving_unit: z.string(),
  extra_serving_sizes: z.array(
    z.object({
      id: z.number(),
      name: z.string(),
      quantity: z.number(),
    })
  ),
});
export type Food = z.infer<typeof FoodSchema>;
// // Observable
export const foods$ = observable({
  foods: {} as Record<string, Food>,
  setFood: (foodId: string, newFood: Food) => foods$.foods.assign({ [foodId]: newFood }),
  getFood: (foodId?: string) => foods$.foods.get()[foodId ?? ''],
  deleteFood: (foodId: string) => foods$.foods[foodId].delete(),
});
// // Persist
syncObservable(foods$, {
  persist: {
    name: 'foods',
    plugin: ObservablePersistMMKV,
  },
});
// // Tinybase - TODO: remove
export const FOOD_TABLE = 'food';

// Meals
const MealSchema = z.object({
  id: z.string().uuid(),
  date: z.string().date(), // YYYY-MM-DD
  name: z.string(),
  order: z.number().int().positive().optional(),
  items: z.array(
    z.object({
      quantity: z.number(),
      unit: z.string(),
      item: z.object({ type: z.literal('food') }).merge(FoodSchema),
      // TODO: RecipeSchema
      // .or(z.object({ type: z.literal('recipe') }).merge(RecipeSchema))
      // TODO: QuickAddSchema
      // .or(z.object({ type: z.literal('quick_add') }).merge(QuickAddSchema))
    })
  ),
});
export const MEALS_TABLE = 'meals';
export type Meal = z.infer<typeof MealSchema>;

// Meal food
const MealItemSchema = z
  .object({
    item_id: FoodSchema.shape.id.optional(),
    meal_id: MealSchema.shape.id,
    type: z.enum(['food', 'recipe', 'quick_add']),
    quantity: z.number(),
    unit: z.string(),
  })
  .merge(FoodSchema);
export const MEAL_ITEMS_TABLE = 'meal_items';
export type MealItem = z.infer<typeof MealItemSchema>;

// TinyBase schemas
export const tablesSchema = {
  [FOOD_TABLE]: zodToSimpleSchema(FoodSchema),
  [MEALS_TABLE]: zodToSimpleSchema(MealSchema),
  [MEAL_ITEMS_TABLE]: zodToSimpleSchema(MealItemSchema),
} as const;
export const valuesSchema = {} as const;
