import FeatherIcon from '@expo/vector-icons/Feather';
import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: 'blue' }}>
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
