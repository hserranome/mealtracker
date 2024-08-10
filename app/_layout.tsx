import '../theme/unistyles';

import { useMigrations } from 'drizzle-orm/expo-sqlite/migrator';
import { useDrizzleStudio } from 'expo-drizzle-studio-plugin';
import { Stack } from 'expo-router';
import { deleteDatabaseSync, SQLiteProvider } from 'expo-sqlite';
import * as SystemUI from 'expo-system-ui';
import { Suspense, useEffect } from 'react';
import { useColorScheme } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import { LoadingScreen } from '~/components/LoadingScreen';
import { SessionProvider } from '~/components/contexts/SessionProvider';
import { DB_NAME } from '~/constants';
import { db, sqlDb } from '~/data/database';
import migrations from '~/data/migrations/migrations';

export default function Layout() {
  useDrizzleStudio(sqlDb);
  const { success, error } = useMigrations(db, migrations);
  const { styles, theme } = useStyles(stylesheet);
  const colorScheme = useColorScheme();

  useEffect(() => {
    SystemUI.setBackgroundColorAsync(theme.colors.background);
  }, [colorScheme]);

  if (!success && !error) return <LoadingScreen />;
  if (error) {
    console.error(error);
    sqlDb.closeSync();
    deleteDatabaseSync(DB_NAME); // @todo: only on dev mode (?)
    return <></>;
  }

  return (
    <Suspense fallback={<LoadingScreen />}>
      <SQLiteProvider databaseName={DB_NAME} useSuspense>
        <SessionProvider>
          <SafeAreaProvider>
            <GestureHandlerRootView>
              <Stack screenOptions={{ headerShown: false, contentStyle: styles.container }}>
                <Stack.Screen name="index" />
              </Stack>
            </GestureHandlerRootView>
          </SafeAreaProvider>
        </SessionProvider>
      </SQLiteProvider>
    </Suspense>
  );
}

const stylesheet = createStyleSheet((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
}));
