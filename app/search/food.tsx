import { observer } from '@legendapp/state/react';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import React, { ComponentProps, useMemo } from 'react';
import { useStyles } from 'react-native-unistyles';

import { SearchScreen } from '~/components/common/SearchScreen';
import { foods$ } from '~/data';

const FoodScreen = observer(() => {
  const { theme } = useStyles();
  const router = useRouter();
  const { meal } = useLocalSearchParams<{ meal: string }>();

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
        listActionIcon={meal ? 'add-circle-outline' : undefined}
        listActionOnPress={
          meal
            ? (item) => {
                router.push({
                  pathname: '/meal/set/food',
                  params: { foodId: item.id, meal, mealItemId: item.id },
                });
              }
            : undefined
        }
        onPressItem={(item) => {
          router.push({
            pathname: '/food/[id]',
            params: { id: item.id },
          });
        }}
        accentColor={theme.colors.pink}
      />
    </>
  );
});

export default FoodScreen;
