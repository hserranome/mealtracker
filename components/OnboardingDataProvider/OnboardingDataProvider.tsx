import { createContext, FC, PropsWithChildren, useState } from 'react';

import { db } from '~/data/database';
import { users } from '~/data/schemas';

export type OnboardingData = {
  goal?: (typeof users.$inferInsert)['goal'];
  activityLevel?: (typeof users.$inferInsert)['activity_level'];
  sex?: (typeof users.$inferInsert)['sex'];
  birthYear?: (typeof users.$inferInsert)['birth_year'];
  heightUnit?: (typeof users.$inferInsert)['height_unit'];
  weightUnit?: (typeof users.$inferInsert)['weight_unit'];
  initialHeight?: (typeof users.$inferInsert)['initial_height'];
  initialWeight?: (typeof users.$inferInsert)['initial_weight'];
  goalWeight?: (typeof users.$inferInsert)['goal_weight'];
  weightVarianceRate?: (typeof users.$inferInsert)['weight_variance_rate'];
};

type OnboardingDataProviderValue = {
  data: OnboardingData;
  setData: (data: OnboardingData) => void;
  submit: () => Promise<{ id: number } | void>;
  submitting: boolean;
};

export const OnboardingDataContext = createContext<OnboardingDataProviderValue>({
  data: {},
  setData: () => {},
  submit: async () => {},
  submitting: false,
});

export const OnboardingDataProvider: FC<PropsWithChildren> = ({ children }) => {
  const [data, setData] = useState<OnboardingDataProviderValue['data']>({});
  const [submitting, setSubmitting] = useState(false);

  const submit = async () => {
    setSubmitting(true);
    try {
      const newUser: typeof users.$inferInsert = {
        goal: data.goal,
        activity_level: data.activityLevel,
        sex: data.sex,
        birth_year: data.birthYear,
        height_unit: data.heightUnit,
        weight_unit: data.weightUnit,
        initial_height: data.initialHeight,
        initial_weight: data.initialWeight,
        goal_weight: data.goalWeight,
        weight_variance_rate: data.weightVarianceRate,
      };
      await db.insert(users).values(newUser).returning({ id: users.id });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <OnboardingDataContext.Provider
      value={{
        data,
        setData,
        submit,
        submitting,
      }}>
      {children}
    </OnboardingDataContext.Provider>
  );
};
