import {
  calculateBasalMetabolicRate,
  calculateSimpleBaseTDEE,
  getDatesTdee,
  getWeeksToGoal,
  getTargetTdee,
  calculateBaseTDEE,
} from './calculateTDEE';

import { Sex, ActivityLevel } from '~/data/types';

describe('calculateBasalMetabolicRate', () => {
  it('should calculate BMR for a male', () => {
    const result = calculateBasalMetabolicRate({
      sex: Sex.Male,
      weight: 70,
      height: 180,
      age: 30,
    });
    expect(result).toBe(1680);
  });

  it('should calculate BMR for a female', () => {
    const result = calculateBasalMetabolicRate({
      sex: Sex.Female,
      weight: 70,
      height: 180,
      age: 30,
    });
    expect(result).toBe(1514);
  });

  it('should return 0 for an unknown sex', () => {
    const result = calculateBasalMetabolicRate({
      sex: 'unknown' as unknown as Sex,
      weight: 70,
      height: 180,
      age: 30,
    });
    expect(result).toBe(0);
  });
});

describe('calculateBaseTDEE', () => {
  it('should calculate TDEE for a male with a sedentary activity level', () => {
    const result = calculateBaseTDEE({
      activityLevel: ActivityLevel.Sedentary,
      sex: Sex.Male,
      weight: 70,
      height: 180,
      age: 30,
    });
    expect(result).toBe(2016);
  });

  it('should calculate TDEE for a female with a moderate activity level', () => {
    const result = calculateBaseTDEE({
      activityLevel: ActivityLevel.Moderate,
      sex: Sex.Female,
      weight: 70,
      height: 180,
      age: 30,
    });
    expect(result).toBe(2347);
  });

  it('should return 0 for an unknown activity level', () => {
    const result = calculateBaseTDEE({
      activityLevel: 'unknown' as unknown as ActivityLevel,
      sex: Sex.Male,
      weight: 70,
      height: 180,
      age: 30,
    });
    expect(result).toBe(0);
  });
});

describe('calculateSimpleBaseTDEE', () => {
  it('should return correct value', () => {
    const result = calculateSimpleBaseTDEE(70);
    expect(result).toBe(2005);
  });
});

describe('getWeeksToGoal', () => {
  it('should return correct value', () => {
    const result = getWeeksToGoal(70, 80, 0.5);
    expect(result).toBe(20);
  });
});

describe('getTargetTDEE', () => {
  it('should return correct value', () => {
    const result = getTargetTdee(70, 72, 1575, 275);
    expect(result).toBe(1850);
  });
});

describe('getDatesTdee', () => {
  it('should return correct value', () => {
    const dates = [
      {
        tdee: 2012,
        weight: 70,
      },
      {
        tdee: 2007,
        weight: 70,
      },
      {
        tdee: 2000,
        weight: 70,
      },
      {
        tdee: 1800,
        weight: 70,
      },
      {
        tdee: 1800,
        weight: 70,
      },
      {
        tdee: 2000,
        weight: 70,
      },
      {
        tdee: 2000,
        weight: 70,
      },
    ];
    const result = getDatesTdee(dates, 70);
    expect(result).toBe(1945);
  });

  it('should return correct value', () => {
    const day = {
      weight: 72,
      tdee: 2000,
    };

    const data = [day, day, day, day, day, day, day];

    const result = getDatesTdee(data, 70, 1945, 2);
    expect(result).toBe(870);
  });
});
