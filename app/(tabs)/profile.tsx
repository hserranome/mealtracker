import { useRouter } from 'expo-router';
import { Text, View } from 'react-native';

import { Button } from '~/components/common/Button';
import { usePocketbase } from '~/components/contexts/PocketbaseContext';
import { useTinyBase, CALORIES_SCHEDULE_TABLE } from '~/data';

export default function Profile() {
  const router = useRouter();
  const { logout } = usePocketbase();
  const { useDelTableCallback } = useTinyBase();

  const handleLogout = async () => {
    try {
      await logout?.();
    } finally {
      router.replace('/');
    }
  };

  const deleteCalorieSchedule = useDelTableCallback(CALORIES_SCHEDULE_TABLE, undefined, () =>
    router.replace('/welcome')
  );

  const navigateToSetupWeekdays = () => {
    router.push('/setup-weekdays');
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Profile</Text>
      <Button onPress={handleLogout} title="Logout" />
      <Button onPress={deleteCalorieSchedule} title="Delete calorie schedule" />
      <Button onPress={navigateToSetupWeekdays} title="Edit Calorie Intake" />
    </View>
  );
}
