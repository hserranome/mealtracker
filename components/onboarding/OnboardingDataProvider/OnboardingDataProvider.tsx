import { createContext, FC, PropsWithChildren, useReducer } from 'react';

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

type OnboardingAction = {
  type: 'UPDATE_DATA';
  key: keyof OnboardingData;
  value: OnboardingData[keyof OnboardingData];
};

const onboardingDataReducer = (state: OnboardingData, action: OnboardingAction): OnboardingData => {
  switch (action.type) {
    case 'UPDATE_DATA':
      return { ...state, [action.key]: action.value };
    default:
      return state;
  }
};

type OnboardingDataProviderValue = {
  data: OnboardingData;
  updateData: <K extends keyof OnboardingData>(key: K, value: OnboardingData[K]) => void;
  submit: () => Promise<{ id: number } | void>;
  submitting: boolean;
};

export const OnboardingDataContext = createContext<OnboardingDataProviderValue>({
  data: {},
  updateData: () => {},
  submit: async () => {},
  submitting: false,
});

export const OnboardingDataProvider: FC<PropsWithChildren> = ({ children }) => {
  const [data, dispatch] = useReducer(onboardingDataReducer, {});
  const [submitting, setSubmitting] = useState(false);

  const updateData = <K extends keyof OnboardingData>(key: K, value: OnboardingData[K]) => {
    dispatch({ type: 'UPDATE_DATA', key, value });
  };

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
        updateData,
        submit,
        submitting,
      }}>
      {children}
    </OnboardingDataContext.Provider>
  );
};
