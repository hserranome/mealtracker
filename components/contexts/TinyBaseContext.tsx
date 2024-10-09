// TinyBaseProvider.js
import { useDrizzleStudio } from 'expo-drizzle-studio-plugin';
import { useRouter } from 'expo-router';
import { openDatabaseSync } from 'expo-sqlite';
import React, { PropsWithChildren } from 'react';
import { createExpoSqlitePersister } from 'tinybase/persisters/persister-expo-sqlite/with-schemas';

import { CALORIES_SCHEDULE_TABLE, DB_NAME, tbStore, useTinyBase } from '~/data';

const useAndStartPersister = (store: typeof tbStore, callback: () => void) => {
  const TinyBase = useTinyBase();
  // Persist store to Expo SQLite; load once, then auto-save.
  return TinyBase.useCreatePersister(
    store,
    (store) => createExpoSqlitePersister(store, openDatabaseSync(DB_NAME)),
    [],
    (persister) =>
      persister.load().then((persister) => {
        if (persister !== undefined && persister !== null) {
          persister.startAutoSave();
        } else {
          console.warn('Persister is undefined or null, auto-save not started.');
        }
        callback();
      })
  );
};

export const TinyBaseProvider = ({ children }: PropsWithChildren) => {
  const router = useRouter();
  const TinyBase = useTinyBase();
  const store = TinyBase.useCreateStore(() => tbStore);
  useDrizzleStudio(openDatabaseSync(DB_NAME, { enableChangeListener: true }) as any); // Does this still work?

  const checkHasNecessaryData = () => {
    const caloriesSchedule = store.getTable(CALORIES_SCHEDULE_TABLE);
    const missingDays = Object.keys(caloriesSchedule).length < 7;
    if (missingDays) return router.replace('/welcome');
    return router.replace('/(tabs)');
  };

  useAndStartPersister(store, checkHasNecessaryData);

  return <TinyBase.Provider store={store}>{children}</TinyBase.Provider>;
};
