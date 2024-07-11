import { drizzle } from 'drizzle-orm/expo-sqlite';
import { openDatabaseSync } from 'expo-sqlite';

import { DB_NAME } from '~/constants';

export const sqlDb = openDatabaseSync(DB_NAME, { enableChangeListener: true });
export const db = drizzle(sqlDb);
