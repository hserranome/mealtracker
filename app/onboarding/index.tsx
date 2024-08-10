import { Image } from 'expo-image';
import { Link } from 'expo-router';
import { Text, View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import { Button } from '~/components/Button';
import { OnboardingFormStepContainer } from '~/components/onboarding/OnboardingFormStepContainer';
import { useSetOnboardingParams } from '~/components/onboarding/OnboardingParamsProvider';

export default function Welcome() {
  const { theme, styles } = useStyles(stylesheet);
  useSetOnboardingParams({ title: null, progress: null });

  return (
    <OnboardingFormStepContainer
      content={
        <View>
        <Text style={[styles.title, theme.fonts.heading.m]}>Welcome to MealTracker</Text>
        <Text style={[styles.subtitle, theme.fonts.body.xl]}>
          Enter your details so Meal Tracker can customize your goals.
        </Text>
        <Image
          source={require('~/assets/images/onboarding/01_welcome.png')}
          style={{ height: 300, width: 300, alignSelf: 'center', justifyContent: 'center' }}
        />
      </View>
      }
      footer={
        <Link href={{ pathname: '/onboarding/goals' }} asChild>
          <Button title="Continue" />
        </Link>
      }
    />
  );
}

const stylesheet = createStyleSheet((theme) => ({
  title: {
    marginTop: theme.margins[32],
    color: theme.colors.base800,
  },
  subtitle: {
    marginTop: theme.margins[20],
    color: theme.colors.base800,
  },
}));
