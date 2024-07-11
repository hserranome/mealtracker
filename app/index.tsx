import { Link } from 'expo-router';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import { Button, ButtonType } from '~/components/Button';
import { OnboardingStepContainer } from '~/components/OnboardingStepContainer';

export default function Start() {
  const { styles, theme } = useStyles(stylesheet);

  return (
    <SafeAreaView style={styles.container}>
      <OnboardingStepContainer>
        <Text style={[theme.fonts.heading.xl, styles.title]}>MealTracker</Text>
        <View style={styles.buttons}>
          <Link href={{ pathname: '/onboarding' }} asChild>
            <Button title="Start now" />
          </Link>
          <Link href={{ pathname: '/login' }} asChild>
            <Button title="Log in" type={ButtonType.Outline} />
          </Link>
        </View>
      </OnboardingStepContainer>
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
  },
  buttons: {
    gap: theme.margins[10],
  },
}));
