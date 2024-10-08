import '../theme/unistyles';

import { Stack } from 'expo-router';
import * as SystemUI from 'expo-system-ui';
import { Suspense, useEffect } from 'react';
import { useColorScheme } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import { LoadingScreen } from '~/components/common/LoadingScreen';
import { PocketProvider } from '~/components/contexts/PocketbaseContext';
import { TinyBaseProvider } from '~/components/contexts/TinyBaseContext';

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
          <SafeAreaProvider>
            <GestureHandlerRootView style={{ flex: 1 }}>
              <RootLayoutNav />
            </GestureHandlerRootView>
          </SafeAreaProvider>
        </PocketProvider>
      </TinyBaseProvider>
    </Suspense>
  );
}

function RootLayoutNav() {
  const { styles } = useStyles(stylesheet);

  return (
    <Stack screenOptions={{ headerShown: false, contentStyle: styles.container }}>
      <Stack.Screen name="index" />
    </Stack>
  );
}

const stylesheet = createStyleSheet((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
}));
