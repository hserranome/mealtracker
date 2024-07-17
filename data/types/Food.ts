export type Food = {
  name: string;
  brand: string;
  code: string;
  meal: number; //index
  amount: number;
  image_url?: string;
  image_thumb_url?: string;
  image_ingredients?: string;
  unit: string;
  nutriment_basis: string;
  nutriments: {
    kcal: number;
    fat: number;
    proteins: number;
    carbohydrates: number;
  };
};
