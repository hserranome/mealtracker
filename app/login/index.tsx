import { Link } from 'expo-router';
import React from 'react';
import { View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import { Button, ButtonType } from '~/components/elements/Button';
import { OnboardingScreenContainer } from '~/components/onboarding/OnboardingScreenContainer';

const LoginScreen = () => {
  const { styles } = useStyles(stylesheet);

  return (
    <OnboardingScreenContainer title="Login" progress={null}>
      <View style={styles.container}>
        <Link href="/login/login-email" asChild>
          <Button title="Login with Email" style={styles.button} />
        </Link>
        <Button title="Login with Google" type={ButtonType.Outline} style={styles.button} />
        <Button title="Login with Apple" type={ButtonType.Outline} style={styles.button} />
      </View>
    </OnboardingScreenContainer>
  );
};

const stylesheet = createStyleSheet((theme) => ({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: theme.margins[16],
  },
  button: {
    width: '100%',
    marginBottom: theme.margins[16],
  },
}));

export default LoginScreen;
