// TODO: This is base 100 only?
export const calculateNutrientValue = (baseNutrientValue: number | undefined, quantity: number) =>
  baseNutrientValue ? Math.ceil((Number(baseNutrientValue) * quantity) / 100) : 0;
