import { useRouter } from 'expo-router';
import { Text, View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import { Button, ButtonType } from '~/components/common/Button';
import { usePocketbase } from '~/components/contexts/PocketbaseContext';
import { useTinyBase, CALORIES_SCHEDULE_TABLE } from '~/data';

export default function Profile() {
  const router = useRouter();
  const { logout } = usePocketbase();
  const { useDelTableCallback } = useTinyBase();
  const { styles, theme } = useStyles(stylesheet);

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
    <View style={styles.container}>
      <Text style={[styles.title, { color: theme.colors.foreground }]}>Profile</Text>
      <View style={styles.buttonContainer}>
        <Button
          onPress={navigateToSetupWeekdays}
          title="Edit Calorie Intake"
          type={ButtonType.Solid}
          style={styles.button}
        />
        <Button
          onPress={deleteCalorieSchedule}
          title="Delete calorie schedule"
          type={ButtonType.Outline}
          style={styles.button}
        />
        <Button
          onPress={handleLogout}
          title="Logout"
          type={ButtonType.Ghost}
          style={styles.button}
        />
      </View>
    </View>
  );
}

const stylesheet = createStyleSheet((theme) => ({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    ...theme.fonts.heading.xl,
    marginBottom: theme.margins[32],
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'stretch',
  },
  button: {
    marginBottom: theme.margins[16],
  },
}));
