import { observer } from '@legendapp/state/react';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import React, { ComponentProps, useMemo } from 'react';
import { useStyles } from 'react-native-unistyles';

import { MealScreenParams } from '../meal/[date]/[name]';

import { SearchScreen } from '~/components/common/SearchScreen';
import { foods$ } from '~/data';

const FoodScreen = observer(() => {
  const { theme } = useStyles();
  const router = useRouter();
  const { date, name } = useLocalSearchParams<MealScreenParams>();
  const hasMeal = !!date && !!name;

  // List items
  const foods = foods$.foods.get();
  const listItems = Object.entries(foods)
    .map(([id, item]) => {
      return {
        id,
        name: String(item.name),
        subtitle: item.brands ? String(item.brands) : undefined,
        mainValue: Number(item.base_nutriments.energy_kcal),
        secondaryValue: Number(item.base_serving_size),
        unit: 'kcal',
      };
    })
    .sort((a, b) => a.name.localeCompare(b.name));

  // Buttons
  const buttons: ComponentProps<typeof SearchScreen>['buttons'] = useMemo(
    () => [
      {
        icon: 'add-circle-outline',
        label: 'Create new food',
        onPress: () => router.push('/food/new'),
      },
      {
        icon: 'barcode-outline',
        label: 'Create from barcode',
        onPress: () => {
          // TODO: implement create from barcode
        },
      },
    ],
    []
  );

  // Actions
  const handleGoToSetFood: ComponentProps<typeof SearchScreen>['listActionOnPress'] = hasMeal
    ? (item) => {
        router.push({
          pathname: '/meal/[date]/[name]/set/food',
          params: { date, name, foodId: item.id, mealItemId: item.id },
        });
      }
    : undefined;

  const handleGoToEditFood: ComponentProps<typeof SearchScreen>['listActionOnPress'] = (item) => {
    router.push({
      pathname: '/food/[id]',
      params: { id: item.id },
    });
  };

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
        listItems={listItems}
        listTitle="My Food"
        listActionIcon={hasMeal ? 'add-circle-outline' : undefined}
        listActionOnPress={handleGoToSetFood}
        onPressItem={handleGoToEditFood}
        accentColor={theme.colors.pink}
      />
    </>
  );
});

export default FoodScreen;
