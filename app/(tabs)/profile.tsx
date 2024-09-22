import { useRouter } from 'expo-router';
import { Text, View } from 'react-native';

import { Button } from '~/components/common/Button';
import { usePocketbase } from '~/components/contexts/PocketbaseContext';
import { db } from '~/data/database';
import { users } from '~/data/schemas';

export default function Profile() {
  const router = useRouter();
  const { logout } = usePocketbase();

  const wipeData = async () => {
    await db.delete(users);
    router.replace('/');
  };

  const handleLogout = async () => {
    try {
      await logout?.();
    } finally {
      router.replace('/');
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Profile</Text>
      <Button onPress={() => wipeData()} title="Wipe data" />
      <Button onPress={handleLogout} title="Logout" />
    </View>
  );
}
