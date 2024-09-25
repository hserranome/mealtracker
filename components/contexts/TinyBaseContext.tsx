// TinyBaseProvider.js
import { useDrizzleStudio } from 'expo-drizzle-studio-plugin';
import { openDatabaseSync } from 'expo-sqlite';
import React, { PropsWithChildren } from 'react';
import { createStore, Store } from 'tinybase';
import { createExpoSqlitePersister } from 'tinybase/persisters/persister-expo-sqlite';
import { Provider, useCreatePersister, useCreateStore } from 'tinybase/ui-react';

import { DB_NAME } from '~/constants';
import { sqlDb } from '~/data/database';

// Create a store instance
const store = createStore();

// Create a context for the store
export const StoreContext = React.createContext(store);

const useAndStartPersister = (store: Store) =>
  // Persist store to Expo SQLite or local storage; load once, then auto-save.
  useCreatePersister(
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
  const store = useCreateStore(createStore);
  useAndStartPersister(store);
  useDrizzleStudio(sqlDb as any);

  return <Provider store={store}>{children}</Provider>;
};

export default TinyBaseProvider;
