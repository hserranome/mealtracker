import { router } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import { usePocketbase } from '~/components/contexts/PocketbaseContext';
import { Button } from '~/components/elements/Button';
import { TextInput } from '~/components/elements/TextInput/TextInput';
import { OnboardingScreenContainer } from '~/components/onboarding/OnboardingScreenContainer';

const LoginEmailScreen = () => {
  const { styles } = useStyles(stylesheet);
  const { login } = usePocketbase();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Email and password are required');
      return;
    }

    try {
      setLoading(true);
      await login?.(email, password);
      router.navigate('(tabs)');
    } catch (err) {
      console.error(err);
      setError('Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <OnboardingScreenContainer title="Login with Email" progress={null}>
      <View style={styles.container}>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={loading ? undefined : setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={loading ? undefined : setPassword}
          secureTextEntry
        />
        {error ? <Text style={styles.error}>{error}</Text> : null}
        <TouchableOpacity
          onPress={() => {
            /* @todo: Forgot password logic */
          }}>
          <Text style={styles.forgotPassword}>Forgot Password?</Text>
        </TouchableOpacity>
        <Button disabled={loading} title="Login" onPress={handleLogin} style={styles.button} />
      </View>
    </OnboardingScreenContainer>
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
