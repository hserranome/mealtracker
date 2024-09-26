export const DB_NAME = 'local.db';

export const CALORIES_SCHEDULE_TABLE = 'calories_schedule';
const CALORIES_SCHEDULE_TABLE_SCHEMA = { calories: { type: 'number' } } as const;

export const FOOD_TABLE = 'food';
const FOOD_TABLE_SCHEMA = {
  id: { type: 'number' },
  name: { type: 'string' },
  brand: { type: 'string' },
  barcode: { type: 'string' },
  serving_size: { type: 'string' },
  unit: { type: 'string' },
  image_url: { type: 'string' },
  image_thumb_url: { type: 'string' },
  image_ingredients: { type: 'string' },
  nutriment_basis: { type: 'string' },
  kcal: { type: 'number' },
  fat: { type: 'number' },
  proteins: { type: 'number' },
  carbohydrates: { type: 'number' },
} as const;

export const FOOD_SERVING_SIZES = 'food-serving-sizes';
const FOOD_SERVING_SIZES_SCHEMA = {
  id: { type: 'number' },
  food_id: { type: 'number' },
  name: { type: 'string' },
  serving_size: { type: 'string' },
  unit: { type: 'string' },
} as const;

// Structure tables and values schemas
export const tablesSchema = {
  [CALORIES_SCHEDULE_TABLE]: CALORIES_SCHEDULE_TABLE_SCHEMA,
  [FOOD_TABLE]: FOOD_TABLE_SCHEMA,
  [FOOD_SERVING_SIZES]: FOOD_SERVING_SIZES_SCHEMA,
} as const;
export const valuesSchema = {} as const;

// TODO: setRelationships(store)
