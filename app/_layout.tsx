import '../theme/unistyles';

import { useMigrations } from 'drizzle-orm/expo-sqlite/migrator';
import { useDrizzleStudio } from 'expo-drizzle-studio-plugin';
import { Stack } from 'expo-router';
import { SQLiteProvider } from 'expo-sqlite';
import { Suspense } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { LoadingScreen } from '~/components/LoadingScreen';
import { SessionProvider } from '~/components/SessionProvider';
import { DB_NAME } from '~/constants';
import { db, sqlDb } from '~/data/database';
import migrations from '~/data/migrations/migrations';

export default function Layout() {
  useDrizzleStudio(sqlDb);
  const { success, error } = useMigrations(db, migrations);

  if (error) {
    console.error(error);
  }
  if (!success) return <LoadingScreen />;

  return (
    <Suspense fallback={<LoadingScreen />}>
      <SQLiteProvider databaseName={DB_NAME} useSuspense>
        <SessionProvider>
          <SafeAreaProvider>
            <GestureHandlerRootView>
              <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen name="index" />
              </Stack>
            </GestureHandlerRootView>
          </SafeAreaProvider>
        </SessionProvider>
      </SQLiteProvider>
    </Suspense>
  );
}
