import { Sex, ActivityLevel } from '~/data/types';

const caloriesPerKgLose = 7700 / 7;
const caloriesPerKgGain = 7000 / 7;

export type calculateBasalMetabolicRateArgs = {
  sex: Sex;
  weight: number;
  height: number;
  age: number;
};

// Uses the Mifflin-St Jeor Equation
export const calculateBasalMetabolicRate = ({
  sex,
  weight,
  height,
  age,
}: calculateBasalMetabolicRateArgs) => {
  if (sex === Sex.Male) {
    return 10 * weight + 6.25 * height - 5 * age + 5;
  }
  if (sex === Sex.Female) {
    return 10 * weight + 6.25 * height - 5 * age - 161;
  }
  return 0;
};

export type calculateTDEEArgs = {
  activityLevel: ActivityLevel;
  weightChangePerWeek?: number;
} & calculateBasalMetabolicRateArgs;

export const calculateTDEE = ({
  activityLevel,
  weightChangePerWeek = 0,
  ...calculateBasalMetabolicRateArgs
}: calculateTDEEArgs) => {
  const scale = {
    [ActivityLevel.Sedentary]: 1.2,
    [ActivityLevel.Light]: 1.375,
    [ActivityLevel.Moderate]: 1.55,
    [ActivityLevel.Active]: 1.725,
    [ActivityLevel.Heavy]: 1.9,
  };
  if (!scale[activityLevel]) return 0;
  const tdee = calculateBasalMetabolicRate(calculateBasalMetabolicRateArgs) * scale[activityLevel];

  // Adjust calories based on weight change per week.
  // Probably can be improved and made dynamic. Like on that CSV
  const calorieAdjustment =
    weightChangePerWeek * (weightChangePerWeek > 0 ? caloriesPerKgGain : caloriesPerKgLose);
  const adjustedTDEE = tdee + calorieAdjustment;

  return Math.round(adjustedTDEE);
};
