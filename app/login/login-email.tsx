import { router } from 'expo-router';
import { ClientResponseError } from 'pocketbase';
import React, { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { View, Text, TouchableOpacity, TextInput as RNTextInput } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import { usePocketbase } from '~/components/contexts/PocketbaseContext';
import { Button } from '~/components/elements/Button';
import { TextInput } from '~/components/elements/TextInput/TextInput';
import { OnboardingScreenContainer } from '~/components/onboarding/OnboardingScreenContainer';

const LoginEmailScreen = () => {
  const { styles } = useStyles(stylesheet);
  const { login } = usePocketbase();
  const methods = useForm();
  const { handleSubmit, setError, formState: { errors } } = methods;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (data) => {
    const { email, password } = data;
    if (!email || !password) {
      setError('email', { type: 'manual', message: 'Email and password are required' });
      return;
    }

    try {
      setLoading(true);
      await login?.(email, password);
      router.navigate('(tabs)');
    } catch (err) {
      if (err instanceof ClientResponseError) {
        if (err.message.includes('Failed to authenticate')) {
          setError('email', { type: 'manual', message: 'Invalid email or password' });
        } else if (
          err.message.includes('Missing required') ||
          err.message.includes('Invalid') ||
          err.message.includes('email')
        ) {
          setError('email', { type: 'manual', message: 'Please enter a valid email address' });
        } else if (err.message.includes('password')) {
          setError('password', { type: 'manual', message: 'Password is incorrect' });
        } else {
          setError('email', { type: 'manual', message: 'An error occurred. Please try again.' });
        }
      } else {
        setError('email', { type: 'manual', message: 'An unexpected error occurred' });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormProvider {...methods}>
      <OnboardingScreenContainer title="Login with Email" progress={null}>
        <View style={styles.container}>
          <TextInput
            name="email"
            placeholder="Email"
            keyboardType="email-address"
            autoCapitalize="none"
            returnKeyType="next"
            onSubmitEditing={() => methods.setFocus('password')}
            blurOnSubmit={false}
          />
          {errors.email && <Text style={styles.error}>{errors.email.message}</Text>}
          <TextInput
            name="password"
            placeholder="Password"
            secureTextEntry
            returnKeyType="join"
            onSubmitEditing={handleSubmit(handleLogin)}
          />
          {errors.password && <Text style={styles.error}>{errors.password.message}</Text>}
          <TouchableOpacity
            onPress={() => {
              /* @todo: Forgot password logic */
            }}>
            <Text style={styles.forgotPassword}>Forgot Password?</Text>
          </TouchableOpacity>
          <Button disabled={loading} title="Login" onPress={handleSubmit(handleLogin)} style={styles.button} />
        </View>
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
    color: theme.colors.base600,
    marginBottom: theme.margins[16],
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
