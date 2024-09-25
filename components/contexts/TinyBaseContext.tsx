// TinyBaseProvider.js
import { useDrizzleStudio } from 'expo-drizzle-studio-plugin';
import { useRouter } from 'expo-router';
import { openDatabaseSync } from 'expo-sqlite';
import React, { PropsWithChildren } from 'react';
import { createExpoSqlitePersister } from 'tinybase/persisters/persister-expo-sqlite/with-schemas';
import * as TBUIReact from 'tinybase/ui-react/with-schemas';
import type { WithSchemas } from 'tinybase/ui-react/with-schemas';
import { createStore } from 'tinybase/with-schemas';

import { CALORIES_SCHEDULE_TABLE, CALORIES_SCHEDULE_TABLE_SCHEMA, DB_NAME } from '~/constants';

// TODO: Move this?
const tablesSchema = {
  [CALORIES_SCHEDULE_TABLE]: CALORIES_SCHEDULE_TABLE_SCHEMA,
} as const;
const valuesSchema = {} as const;

// Cast the whole module to be schema-based
const TinyBase = TBUIReact as WithSchemas<[typeof tablesSchema, typeof valuesSchema]>;
export const useTinyBase = () => TinyBase;

// Initialize store instance
export const tbStore = createStore().setSchema(tablesSchema, valuesSchema);

const useAndStartPersister = (store: typeof tbStore, callback: () => void) =>
  // Persist store to Expo SQLite; load once, then auto-save.
  TinyBase.useCreatePersister(
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
        callback?.();
      })
  );

export const TinyBaseProvider = ({ children }: PropsWithChildren) => {
  const router = useRouter();
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
