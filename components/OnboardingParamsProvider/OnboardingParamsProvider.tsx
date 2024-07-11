import { createContext, useState } from 'react';

type OnboardingParamsContextType = {
  screenParams: {
    title: string | null;
    progress: number | null;
  };
  setScreenParams: ({ title, progress }: { title: string | null; progress: number | null }) => void;
};

export const OnboardingParamsContext = createContext<OnboardingParamsContextType>({
  screenParams: {
    title: null,
    progress: null,
  },
  setScreenParams: () => {},
});

export const OnboardingParamsProvider = ({ children }: { children: React.ReactNode }) => {
  const [screenParams, setScreenParams] = useState<OnboardingParamsContextType['screenParams']>({
    title: null,
    progress: null,
  });

  return (
    <OnboardingParamsContext.Provider
      value={{
        screenParams,
        setScreenParams,
      }}>
      {children}
    </OnboardingParamsContext.Provider>
  );
};
