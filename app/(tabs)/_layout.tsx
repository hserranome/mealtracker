import FeatherIcon from '@expo/vector-icons/Feather';
import { Tabs } from 'expo-router';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

export default function TabLayout() {
  const { styles, theme } = useStyles(stylesheet);
  return (
    <Tabs
      sceneContainerStyle={styles.sceneContainer}
      screenOptions={{
        tabBarActiveTintColor: theme.colors.blue,
        headerStyle: styles.header,
        headerTitleStyle: styles.headerTitle,
        tabBarStyle: styles.tabBar,
      }}>
      <Tabs.Screen
        name="dashboard"
        options={{
          lazy: false,
          title: 'Dashboard',
          tabBarIcon: ({ color }) => <FeatherIcon name="home" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          lazy: false,
          title: 'Dairy',
          tabBarIcon: ({ color }) => <FeatherIcon name="book" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          lazy: false,
          title: 'Profile',
          tabBarIcon: ({ color }) => <FeatherIcon name="user" size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}

const stylesheet = createStyleSheet((theme) => ({
  sceneContainer: {
    backgroundColor: theme.colors.background,
  },
  header: {
    backgroundColor: theme.colors.background,
  },
  headerTitle: {
    color: theme.colors.base800,
  },
  tabBar: {
    backgroundColor: theme.colors.background,
  },
}));
