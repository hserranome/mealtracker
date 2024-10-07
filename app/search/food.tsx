import { Stack, useRouter } from 'expo-router';
import React, { useMemo } from 'react';
import { useStyles } from 'react-native-unistyles';

import { SearchScreen } from '~/components/common/SearchScreen';

const recipeItems = [
  { name: 'Chicken Stir Fry', brand: 'Homemade', calories: 350, weight: 300 },
  { name: 'Vegetable Soup', brand: 'Homemade', calories: 200, weight: 250 },
  { name: 'Pasta Carbonara', brand: 'Homemade', calories: 450, weight: 350 },
  { name: 'Greek Salad', brand: 'Homemade', calories: 180, weight: 200 },
  { name: 'Beef Tacos', brand: 'Homemade', calories: 400, weight: 280 },
];

const FoodScreen = () => {
  const { theme } = useStyles();
  const router = useRouter();

  const handleNavigate = (route: string) => {
    router.push(route as any);
  };

  const buttons = useMemo(
    () => [
      {
        icon: 'add-circle-outline',
        label: 'Create new food',
        onPress: () => handleNavigate('/food/create'),
      },
      { icon: 'barcode-outline', label: 'Create from barcode' },
    ],
    []
  );

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
        listItems={recipeItems}
        listTitle="My Food"
        accentColor={theme.colors.pink}
      />
    </>
  );
};

export default FoodScreen;
