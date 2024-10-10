import { router } from 'expo-router';
import { ClientResponseError } from 'pocketbase';
import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { Text, KeyboardAvoidingView } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import { Button } from '~/components/common/Button';
import { TextInput } from '~/components/common/TextInput/TextInput';
import { usePocketbase } from '~/components/contexts/PocketbaseContext';
import { OnboardingScreenContainer } from '~/components/onboarding/OnboardingScreenContainer';

type FormData = {
  email: string;
  password: string;
};

const LoginEmailScreen = () => {
  const { styles } = useStyles(stylesheet);
  const { login } = usePocketbase();

  const methods = useForm<FormData>();
  const {
    handleSubmit,
    setError,
    setFocus,
    formState: { errors, isSubmitting },
  } = methods;

  const handleLogin = async (data: FormData) => {
    console.log('data', data);
    const { email, password } = data;

    try {
      await login?.(email, password);
      router.navigate('(tabs)');
    } catch (err) {
      if (err instanceof ClientResponseError) {
        if (
          err.message.includes('Failed to authenticate') ||
          err.message.includes('Missing required') ||
          err.message.includes('Invalid') ||
          err.message.includes('email') ||
          err.message.includes('password')
        ) {
          return setError('root', { type: 'manual', message: 'Invalid email or password' });
        }
        return setError('root', {
          type: 'manual',
          message: 'An error occurred. Please try again.',
        });
      }
      return setError('root', { type: 'manual', message: 'An unexpected error occurred' });
    }
  };

  return (
    <FormProvider {...methods}>
      <OnboardingScreenContainer title="Login with Email" progress={null}>
        <KeyboardAvoidingView style={styles.container} behavior="padding">
          <TextInput
            name="email"
            placeholder="Email"
            keyboardType="email-address"
            autoCapitalize="none"
            returnKeyType="next"
            onSubmitEditing={() => setFocus('password')}
            blurOnSubmit={false}
          />
          <TextInput
            name="password"
            placeholder="Password"
            secureTextEntry
            returnKeyType="join"
            onSubmitEditing={handleSubmit(handleLogin)}
          />
          <TouchableOpacity
            onPress={() => {
              // @todo: Forgot password navigation
              // @todo: Should be a button with type ghost
            }}>
            <Text style={styles.forgotPassword}>Forgot Password?</Text>
          </TouchableOpacity>
          <Button
            disabled={isSubmitting}
            title="Login"
            onPress={handleSubmit(handleLogin)}
            style={styles.button}
          />
          {errors.root && <Text style={styles.error}>{errors.root.message}</Text>}
        </KeyboardAvoidingView>
      </OnboardingScreenContainer>
    </FormProvider>
  );
};

const stylesheet = createStyleSheet((theme) => ({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: theme.margins[16],
    gap: theme.margins[16],
  },
  error: {
    color: theme.colors.red,
  },
  forgotPassword: {
    color: theme.colors.blue,
    textAlign: 'right',
    marginBottom: theme.margins[16],
  },
  button: {
    width: '100%',
  },
}));

export default LoginEmailScreen;
