import {
  calculateBasalMetabolicRate,
  calculateTDEE,
  calculateBasalMetabolicRateArgs,
  calculateTDEEArgs,
} from './calculateTDEE';

import { Sex, ActivityLevel } from '~/data/types';

describe('calculateBasalMetabolicRate', () => {
  it('should calculate BMR for a male', () => {
    const args: calculateBasalMetabolicRateArgs = {
      sex: Sex.Male,
      weight: 70,
      height: 180,
      age: 30,
    };
    const result = calculateBasalMetabolicRate(args);
    expect(result).toBe(1680);
  });

  it('should calculate BMR for a female', () => {
    const args: calculateBasalMetabolicRateArgs = {
      sex: Sex.Female,
      weight: 70,
      height: 180,
      age: 30,
    };
    const result = calculateBasalMetabolicRate(args);
    expect(result).toBe(1514);
  });

  it('should return 0 for an unknown sex', () => {
    const args: calculateBasalMetabolicRateArgs = {
      sex: 'unknown' as Sex,
      weight: 70,
      height: 180,
      age: 30,
    };
    const result = calculateBasalMetabolicRate(args);
    expect(result).toBe(0);
  });
});

describe('calculateTDEE', () => {
  it('should calculate TDEE for a male with a sedentary activity level', () => {
    const args: calculateTDEEArgs = {
      activityLevel: ActivityLevel.Sedentary,
      sex: Sex.Male,
      weight: 70,
      height: 180,
      age: 30,
    };
    const result = calculateTDEE(args);
    expect(result).toBe(2016);
  });

  it('should calculate TDEE for a female with a moderate activity level', () => {
    const args: calculateTDEEArgs = {
      activityLevel: ActivityLevel.Moderate,
      sex: Sex.Female,
      weight: 70,
      height: 180,
      age: 30,
    };
    const result = calculateTDEE(args);
    expect(result).toBe(2347);
  });

  it('should return 0 for an unknown activity level', () => {
    const args: calculateTDEEArgs = {
      activityLevel: 'unknown' as ActivityLevel,
      sex: Sex.Male,
      weight: 70,
      height: 180,
      age: 30,
    };
    const result = calculateTDEE(args);
    expect(result).toBe(0);
  });
});
