export type Food = {
  name: string;
  meal: number; //index
  amount: number;
  unit: string;
  nutriment_basis: string;
  nutriments: {
    kcal: number;
    fat: number;
    protein: number;
    carbs: number;
  };
};
