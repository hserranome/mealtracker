import { Sex, ActivityLevel } from '~/data';

const round5 = (num: number) => Math.round(num / 5) * 5;
const round05 = (num: number) => Math.round(num / 0.5) * 0.5;
const roundFirstDecimal = (num: number) => Math.round(num * 10) / 10;

// Uses the Mifflin-St Jeor Equation
export const calculateBasalMetabolicRate = ({
  sex,
  weight,
  height,
  age,
}: {
  sex: Sex;
  weight: number;
  height: number;
  age: number;
}) => {
  if (sex === Sex.Male) {
    return 10 * weight + 6.25 * height - 5 * age + 5;
  }
  if (sex === Sex.Female) {
    return 10 * weight + 6.25 * height - 5 * age - 161;
  }
  return 0;
};

export const calculateBaseTDEE = ({
  activityLevel,
  weightChangePerWeek = 0,
  ...calculateBasalMetabolicRateArgs
}: {
  activityLevel: ActivityLevel;
  weightChangePerWeek?: number;
  sex: Sex;
  weight: number;
  height: number;
  age: number;
}) => {
  const scale = {
    [ActivityLevel.Sedentary]: 1.2,
    [ActivityLevel.Light]: 1.375,
    [ActivityLevel.Moderate]: 1.55,
    [ActivityLevel.Active]: 1.725,
    [ActivityLevel.Heavy]: 1.9,
  };
  if (!scale[activityLevel]) return 0;
  const tdee = calculateBasalMetabolicRate(calculateBasalMetabolicRateArgs) * scale[activityLevel];

  return Math.round(tdee);
};

export const calculateSimpleBaseTDEE = (weight: number) => {
  return round5(weight * 28.66006);
};

const magicNumber = 7716.17;

export const getTargetDailyDiff = (weightVariancePerWeek: number) => {
  return round5((weightVariancePerWeek * magicNumber) / 7);
};

export const getTargetTdee = (
  currentWeight: number,
  goalWeight: number,
  baseTdee: number,
  targetDailyDiff: number
) => {
  if (currentWeight === goalWeight) return baseTdee;
  if (currentWeight < goalWeight) return baseTdee + targetDailyDiff;
  if (currentWeight > goalWeight) return baseTdee - targetDailyDiff;
  return NaN;
};

export const getWeeksToGoal = (
  goalWeight: number,
  currentWeight: number,
  weightVariancePerWeek: number
) => {
  return Math.abs(round05((goalWeight - currentWeight) / weightVariancePerWeek));
};

type dayRecord = {
  tdee: number;
  weight: number;
};
export const getDatesTdee = (
  days: dayRecord[],
  initialWeight: number,
  previousAverageTdee?: number, // max last 5 weeks averaged tdee sum
  numberOfPreviousWeeks?: number
) => {
  const averageTdee = Math.round(days.reduce((a, b) => a + b.tdee, 0) / days.length);

  const averageWeight = roundFirstDecimal(days.reduce((a, b) => a + b.weight, 0) / days.length);
  const daysEntried = days.length;

  const weightDiff = averageWeight - initialWeight;

  const tdee = averageTdee + (-weightDiff * magicNumber) / daysEntried;

  if (previousAverageTdee && numberOfPreviousWeeks) {
    const adjustedTdee = (tdee + previousAverageTdee) / numberOfPreviousWeeks;
    return round5(adjustedTdee);
  }
  return round5(tdee);
};
