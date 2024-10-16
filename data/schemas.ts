import { observable } from '@legendapp/state';
import { ObservablePersistMMKV } from '@legendapp/state/persist-plugins/mmkv';
import { syncObservable } from '@legendapp/state/sync';
import { z } from 'zod';

// // Calories schedule
// Types
export type Days =
  | 'monday'
  | 'tuesday'
  | 'wednesday'
  | 'thursday'
  | 'friday'
  | 'saturday'
  | 'sunday';
export type CaloriesSchedule = Record<Days, number>;
// Observable
export const caloriesSchedule$ = observable({
  schedule: {} as CaloriesSchedule,
  setSchedule: (newSchedule: CaloriesSchedule) => caloriesSchedule$.schedule.set(newSchedule),
  getDateCalories: (date: Date) => {
    const day = date.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase() as Days;
    return caloriesSchedule$.schedule.get()[day];
  },
});
// Persist
syncObservable(caloriesSchedule$, {
  persist: {
    name: 'caloriesSchedule',
    plugin: ObservablePersistMMKV,
  },
});

// // Food
// Types
const NutrimentsSchema = z.object({
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
// Observable
// TODO: Rename to library$
export const library$ = observable({
  foods: {} as Record<string, Food>,
  setFood: (foodId: string, newFood: Food) => library$.foods.assign({ [foodId]: newFood }),
  getFood: (foodId?: string) => library$.foods.get()[foodId ?? ''],
  deleteFood: (foodId: string) => library$.foods[foodId].delete(),
});
// Persist
syncObservable(library$, {
  persist: {
    name: 'library',
    plugin: ObservablePersistMMKV,
  },
});

// // Dairy
// Types
const MealItemSchema = z.object({
  quantity: z.number(),
  unit: z.string(),
  item: z.object({ type: z.literal('food') }).merge(FoodSchema),
  // TODO: RecipeSchema
  // .or(z.object({ type: z.literal('recipe') }).merge(RecipeSchema))
  // TODO: QuickAddSchema
  // .or(z.object({ type: z.literal('quick_add') }).merge(QuickAddSchema))
});
export type MealItem = z.infer<typeof MealItemSchema>;
const MealSchema = z.object({
  id: z.string().uuid(),
  date: z.string().date(), // YYYY-MM-DD
  name: z.string(),
  order: z.number().int().positive().optional(),
  nutriments: NutrimentsSchema,
  items: z.record(MealItemSchema),
});
export type Meal = z.infer<typeof MealSchema>;
const DairyEntrySchema = z.object({
  weight: z.number(),
  meals: z.record(MealSchema),
});
export type DairyEntry = z.infer<typeof DairyEntrySchema>;
// Observable
export const dairy$ = observable({
  entries: {} as Record<string, DairyEntry>, // string is always an ISO date string YYYY-MM-DD

  getEntry: (date?: string) => dairy$.entries.get()[date ?? ''],

  getDateMeal: (date: string, mealName: string) => dairy$.entries[date].meals[mealName].get(),

  getMealItem: (date: string, mealName: string, mealItemId?: string): MealItem | undefined =>
    mealItemId ? dairy$.entries[date].meals[mealName].items[mealItemId].get() : undefined,

  setMealItem: (
    date: string,
    mealName: string,
    itemId: string,
    item: DairyEntry['meals'][number]['items'][number]
  ) => {
    dairy$.entries[date].meals[mealName].items.assign({ [itemId]: item });
    // TODO: generate meal nutriments
  },

  deleteMealItem: (date: string, mealName: string, mealItemId: string) => {
    dairy$.entries[date].meals[mealName].items[mealItemId].delete();
  },
});
// Persist
syncObservable(dairy$, {
  persist: {
    name: 'dairy',
    plugin: ObservablePersistMMKV,
  },
});
