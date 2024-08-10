import { useLiveQuery } from 'drizzle-orm/expo-sqlite';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';

import { db } from '~/data/database';
import { users } from '~/data/schemas';

export const SessionProvider = ({ children }: { children: React.ReactNode }) => {
  const { data } = useLiveQuery(db.select().from(users).limit(1));
  const router = useRouter();

  useEffect(() => {
    const hasUser = data.length > 0;
    if (hasUser) router.replace('/(tabs)');
  }, [data]);

  return children;
};
