import { Link } from 'expo-router';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import { Button, ButtonType } from '~/components/elements/Button';
import { OnboardingFormStepContainer } from '~/components/onboarding/OnboardingFormStepContainer';

export default function Start() {
  const { styles, theme } = useStyles(stylesheet);

  return (
    <SafeAreaView style={styles.container}>
      <OnboardingFormStepContainer
        content={<Text style={[theme.fonts.heading.xl, styles.title]}>MealTracker</Text>}
        footer={
          <View style={styles.buttons}>
            <Link href={{ pathname: '/onboarding' }} asChild>
              <Button title="Start now" />
            </Link>
            <Link href={{ pathname: '/login' }} asChild>
              <Button title="Log in" type={ButtonType.Outline} />
            </Link>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const stylesheet = createStyleSheet((theme) => ({
  container: {
    flex: 1,
  },
  title: {
    marginTop: '40%',
    textAlign: 'center',
    color: theme.colors.base800,
  },
  buttons: {
    gap: theme.margins[10],
  },
}));
