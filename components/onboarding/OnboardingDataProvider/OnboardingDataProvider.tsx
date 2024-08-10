import { createContext, FC, PropsWithChildren, useState } from 'react';

import { db } from '~/data/database';
import { NewUser, users } from '~/data/schemas';

export type OnboardingData = {
  goal?: NewUser['goal'];
  activityLevel?: NewUser['activity_level'];
  sex?: NewUser['sex'];
  birthYear?: NewUser['birth_year'];
  heightUnit?: NewUser['height_unit'];
  weightUnit?: NewUser['weight_unit'];
  initialHeight?: NewUser['initial_height'];
  initialWeight?: NewUser['initial_weight'];
  goalWeight?: NewUser['goal_weight'];
  weightVarianceRate?: NewUser['weight_variance_rate'];
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
