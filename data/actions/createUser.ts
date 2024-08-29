import { db } from '../database';
import { goals, NewGoal, NewUser, users } from '../schemas';

export const createUser = async (data) => {
  const newUser: NewUser = {
    sex: data.sex,
    activity_level: data.activityLevel,
    birth_year: data.birthYear,
    length_unit: data.lengthUnit,
    weight_unit: data.weightUnit,
    height: data.height,
  };

  // get tdee needed to achieve goal based on weight_variance_rate

  await db.transaction(async (tx) => {
    const [{ insertedUserId }] = await tx
      .insert(users)
      .values(newUser)
      .returning({ insertedUserId: users.id });

    const newMacroGoal: NewGoal = {
      user_id: insertedUserId,
      initial_weight: data.initialWeight,
      goal_weight: data.goalWeight,
      weight_variance_rate: data.weightVarianceRate,
      high_days: data.highDays,
      calories_goal: data.caloriesGoal,
    };
    await tx.insert(goals).values(newMacroGoal);
  });
};
