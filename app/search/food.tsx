import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import React, { ComponentProps, useMemo } from 'react';
import { useStyles } from 'react-native-unistyles';

import { SearchScreen } from '~/components/common/SearchScreen';
import { FOOD_TABLE, useTinyBase } from '~/data';

const FoodScreen = () => {
  const { theme } = useStyles();
  const router = useRouter();
  const { useTable } = useTinyBase();
  const { mealId } = useLocalSearchParams();

  const foodItems = useTable(FOOD_TABLE);
  const listItems = useMemo(
    () =>
      Object.entries(foodItems)
        .map(([id, item]) => {
          return {
            id,
            name: String(item.name),
            brands: item.brands ? String(item.brands) : undefined,
            calories: Number(item.energy_kcal),
            weight: Number(item.default_serving_size),
          };
        })
        .sort((a, b) => a.name.localeCompare(b.name)),
    [foodItems]
  );

  const buttons: ComponentProps<typeof SearchScreen>['buttons'] = useMemo(
    () => [
      {
        icon: 'add-circle-outline',
        label: 'Create new food',
        onPress: () => router.push('/food/new'),
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
        listItems={listItems}
        listTitle="My Food"
        listActionIcon={mealId ? 'add-circle-outline' : undefined}
        listActionOnPress={
          mealId
            ? (item) => {
                console.log('TODO: ADD OR REMOVE FROM MEAL', item);
                router.push({
                  pathname: '/meal/add/food/[id]',
                  params: { id: item.id, mealId },
                });
              }
            : undefined
        }
        onPressItem={(item) => {
          router.push({
            pathname: '/food/[id]',
            params: { id: item.id, mealId },
          });
        }}
        accentColor={theme.colors.pink}
      />
    </>
  );
};

export default FoodScreen;
