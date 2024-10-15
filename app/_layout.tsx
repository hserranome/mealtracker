import '../theme/unistyles';

import { observer } from '@legendapp/state/react';
import { Stack, useRouter } from 'expo-router';
import * as SystemUI from 'expo-system-ui';
import React, { Suspense, useEffect } from 'react';
import { useColorScheme } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import { LoadingScreen } from '~/components/common/LoadingScreen';
import { PocketProvider } from '~/components/contexts/PocketbaseContext';
import { TinyBaseProvider } from '~/components/contexts/TinyBaseContext';
import { caloriesSchedule$ } from '~/data';

export default function Layout() {
  const { theme } = useStyles(stylesheet);
  const colorScheme = useColorScheme();

  useEffect(() => {
    SystemUI.setBackgroundColorAsync(theme.colors.background);
  }, [colorScheme]);

  return (
    <Suspense fallback={<LoadingScreen />}>
      <TinyBaseProvider>
        <PocketProvider>
          <KeyboardProvider>
            <SafeAreaProvider>
              <GestureHandlerRootView style={{ flex: 1 }}>
                <RootLayoutNav />
              </GestureHandlerRootView>
            </SafeAreaProvider>
          </KeyboardProvider>
        </PocketProvider>
      </TinyBaseProvider>
    </Suspense>
  );
}

const RootLayoutNav = observer(() => {
  const { styles } = useStyles(stylesheet);

  const router = useRouter();
  const checkHasNecessaryData = () => {
    const missingDays = Object.keys(caloriesSchedule$.schedule.get()).length < 7;
    if (missingDays) return router.replace('/welcome');
    return router.replace('/(tabs)');
  };

  useEffect(() => {
    checkHasNecessaryData();
  }, [router]);

  return (
    <Stack screenOptions={{ headerShown: false, contentStyle: styles.container }}>
      <Stack.Screen name="index" />
    </Stack>
  );
});

const stylesheet = createStyleSheet((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
}));
