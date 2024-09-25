// TinyBaseProvider.js
import { useDrizzleStudio } from 'expo-drizzle-studio-plugin';
import { openDatabaseSync } from 'expo-sqlite';
import React, { PropsWithChildren } from 'react';
import { createExpoSqlitePersister } from 'tinybase/persisters/persister-expo-sqlite/with-schemas';
import * as TBUIReact from 'tinybase/ui-react/with-schemas';
import type { WithSchemas } from 'tinybase/ui-react/with-schemas';
import { createStore } from 'tinybase/with-schemas';

import { CALORIES_SCHEDULE_TABLE, CALORIES_SCHEDULE_TABLE_SCHEMA, DB_NAME } from '~/constants';
import { sqlDb } from '~/data/database';

const tablesSchema = {
  [CALORIES_SCHEDULE_TABLE]: CALORIES_SCHEDULE_TABLE_SCHEMA,
} as const;
const valuesSchema = {} as const;

// Cast the whole module to be schema-based
export const TinyBase = TBUIReact as WithSchemas<[typeof tablesSchema, typeof valuesSchema]>;

const storeInstance = createStore().setSchema(tablesSchema, valuesSchema);
export const StoreContext = React.createContext(storeInstance); // Not used at the moment

const useAndStartPersister = (store: typeof storeInstance) =>
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
      })
  );

// Define the provider component
const TinyBaseProvider = ({ children }: PropsWithChildren) => {
  const store = TinyBase.useCreateStore(() => storeInstance);
  useAndStartPersister(store);
  useDrizzleStudio(sqlDb as any); // Does this still work?

  return <TinyBase.Provider store={store}>{children}</TinyBase.Provider>;
};

export default TinyBaseProvider;

// Holy shit this library has some convulated typing solutions
