// Uses the Mifflin-St Jeor Equation

// Formula
// Females: (10*weight [kg]) + (6.25*height [cm]) – (5*age [years]) – 161
// Males: (10*weight [kg]) + (6.25*height [cm]) – (5*age [years]) + 5

// Multiply by scale factor for activity level:
// Sedentary *1.2
// Lightly active *1.375
// Moderately active *1.55
// Active *1.725
// Very active *1.9

// More likely than the other equations to predict RMR to within 10% of that measured.

import { Sex, ActivityLevel } from '~/data/types';

export type calculateBasalMetabolicRateArgs = {
  sex: Sex;
  weight: number;
  height: number;
  age: number;
};

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
} & calculateBasalMetabolicRateArgs;

export const calculateTDEE = ({
  activityLevel,
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
  const result =
    calculateBasalMetabolicRate(calculateBasalMetabolicRateArgs) * scale[activityLevel];

  return Math.round(result);
};
