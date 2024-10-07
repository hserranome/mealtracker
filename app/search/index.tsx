import { Stack, useRouter } from 'expo-router';
import React from 'react';
import { useStyles } from 'react-native-unistyles';

import { SearchScreen } from '~/components/common/SearchScreen';

const historyItems = [
  { name: 'Arroz Basmati', brand: 'Hacendado', calories: 130, weight: 150 },
  { name: 'Arroz Basmati', brand: 'Hacendado', calories: 130, weight: 150 },
  { name: 'Arroz Basmati', brand: 'Hacendado', calories: 130, weight: 150 },
  { name: 'Arroz Basmati', brand: 'Hacendado', calories: 130, weight: 150 },
  { name: 'Arroz Basmati', brand: 'Hacendado', calories: 130, weight: 150 },
  { name: 'Arroz Basmati', brand: 'Hacendado', calories: 130, weight: 150 },
  { name: 'Arroz Basmati', brand: 'Hacendado', calories: 130, weight: 150 },
];

const SearchAllScreen = () => {
  const { theme } = useStyles();
  const router = useRouter();

  // TODO: fix type
  const handleNavigate = (route: string) => {
    router.push({ pathname: route as any });
  };

  const buttons = [
    { icon: 'barcode-outline', label: 'Scan Barcode' },
    { icon: 'add-circle-outline', label: 'Quick add' },
    {
      icon: 'nutrition-outline',
      label: 'My food',
      onPress: () => handleNavigate('/search/food'),
    },
    {
      icon: 'restaurant-outline',
      label: 'My Recipe',
    },
  ];

  return (
    <>
      <Stack.Screen
        options={{
          title: '',
          headerTintColor: theme.colors.foreground,
          headerStyle: {
            backgroundColor: theme.colors.base900,
          },
        }}
      />
      <SearchScreen
        buttons={buttons}
        listItems={historyItems}
        listTitle="History"
        accentColor={theme.colors.blue}
      />
    </>
  );
};

export default SearchAllScreen;
