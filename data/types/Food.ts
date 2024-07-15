export type Food = {
  name: string;
  meal: string;
  amount: number;
  measure: string;
  nutriment_basis: string;
  nutriments: {
    kcal: number;
    fat: number;
    protein: number;
    carbs: number;
  };
};
