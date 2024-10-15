// TinyBaseProvider.js
import { useDrizzleStudio } from 'expo-drizzle-studio-plugin';
import { openDatabaseSync } from 'expo-sqlite';
import React, { PropsWithChildren } from 'react';
import { createExpoSqlitePersister } from 'tinybase/persisters/persister-expo-sqlite/with-schemas';

import { DB_NAME, tbStore, useTinyBase } from '~/data';

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
  const TinyBase = useTinyBase();
  const store = TinyBase.useCreateStore(() => tbStore);
  useDrizzleStudio(openDatabaseSync(DB_NAME, { enableChangeListener: true }) as any); // Does this still work?

  useAndStartPersister(store, () => {});

  return <TinyBase.Provider store={store}>{children}</TinyBase.Provider>;
};
