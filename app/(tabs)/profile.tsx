import { useRouter } from 'expo-router';
import { Text, View } from 'react-native';

import { Button } from '~/components/common/Button';
import { usePocketbase } from '~/components/contexts/PocketbaseContext';
import { TinyBase } from '~/components/contexts/TinyBaseContext';
import { CALORIES_SCHEDULE_TABLE } from '~/constants';

export default function Profile() {
  const router = useRouter();
  const { logout } = usePocketbase();

  const handleLogout = async () => {
    try {
      await logout?.();
    } finally {
      router.replace('/');
    }
  };

  const deleteCalorieSchedule = TinyBase.useDelTableCallback(
    CALORIES_SCHEDULE_TABLE,
    undefined,
    () => router.replace('/welcome')
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
