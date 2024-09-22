import AsyncStorage from '@react-native-async-storage/async-storage';
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

  const deleteLocalStorageData = async () => {
    try {
      await AsyncStorage.removeItem('weekdayCalories');
      console.log('Local storage data deleted successfully');
      router.replace('/welcome');
    } catch (error) {
      console.error('Error deleting local storage data:', error);
    }
  };

  const navigateToSetupWeekdays = () => {
    router.push('/setup-weekdays');
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Profile</Text>
      <Button onPress={() => wipeData()} title="Wipe data" />
      <Button onPress={handleLogout} title="Logout" />
      <Button onPress={deleteLocalStorageData} title="Delete local storage data" />
      <Button onPress={navigateToSetupWeekdays} title="Edit Calorie Intake" />
    </View>
  );
}
