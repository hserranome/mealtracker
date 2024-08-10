import { Stack } from 'expo-router';
import { FC, PropsWithChildren, useContext } from 'react';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import { OnboardingDataProvider } from '~/components/onboarding/OnboardingDataProvider';
import {
  OnboardingParamsContext,
  OnboardingParamsProvider,
} from '~/components/onboarding/OnboardingParamsProvider';
import { OnboardingScreenContainer } from '~/components/onboarding/OnboardingScreenContainer';

const LayoutWrapper: FC<PropsWithChildren> = ({ children }) => {
  const { screenParams: screen } = useContext(OnboardingParamsContext);

  return (
    <OnboardingScreenContainer
      title={screen.title}
      progress={screen.progress}
    >
      {children}
    </OnboardingScreenContainer>
  );
};

export default function Layout() {
  const { styles } = useStyles(stylesheet);
  return (
    <OnboardingParamsProvider>
      <OnboardingDataProvider>
        <LayoutWrapper>
          <Stack screenOptions={{ headerShown: false, contentStyle: styles.container }} />
        </LayoutWrapper>
      </OnboardingDataProvider>
    </OnboardingParamsProvider>
  );
}

const stylesheet = createStyleSheet((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
}));
