import { useRouter } from 'expo-router';
import { Text, View } from 'react-native';

import { Button } from '~/components/elements/Button';
import { db } from '~/data/database';
import { users } from '~/data/schemas';

export default function Profile() {
  const router = useRouter();

  const wipeData = async () => {
    await db.delete(users);
    router.replace('/');
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Profile</Text>
      <Button onPress={() => wipeData()} title="Wipe data" />
    </View>
  );
}
