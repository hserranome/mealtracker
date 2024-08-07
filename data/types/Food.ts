export type Nutriments = {
  kcal: number;
  fat: number;
  proteins: number;
  carbohydrates: number;
};

export type Food = {
  name: string;
  brand: string;
  code: string;
  nutriments: Nutriments;
  images_url?: string;
  images_thumb_url?: string;
  images_ingredients?: string;
};

export type Ingredient = {
  amount: number;
  unit: string;
  food: Food;
};

export type Recipe = {
  name: string;
  description: string;
  instructions: string;
  ingredients: Ingredient[];
};

export type DairyItem = {
  meal: number;
  amount: number;
  unit: string;
  item: Food | Recipe;
};