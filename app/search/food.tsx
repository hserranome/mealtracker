import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import React, { useMemo } from 'react';
import { useStyles } from 'react-native-unistyles';

import { SearchScreen } from '~/components/common/SearchScreen';
import { FOOD_TABLE, tbStore, useTinyBase } from '~/data';

const FoodScreen = () => {
  const { theme } = useStyles();
  const router = useRouter();
  const { useSortedRowIds } = useTinyBase();
  const { meal } = useLocalSearchParams();

  const foodItemsId = useSortedRowIds(FOOD_TABLE, 'name', false);
  const foodItems = useMemo(() => {
    return foodItemsId.map((id) => tbStore.getRow(FOOD_TABLE, id));
  }, [foodItemsId]);

  const buttons = useMemo(
    () => [
      {
        icon: 'add-circle-outline',
        label: 'Create new food',
        onPress: () => router.push('/food/create'),
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
        listItems={foodItems.map((item) => ({
          id: item.id as string,
          name: item.name as string,
          brands: item.brands as string,
          calories: item.energy_kcal as number,
          weight: item.default_serving_size as number,
        }))}
        listTitle="My Food"
        listActionIcon={meal ? 'add-circle-outline' : undefined}
        listActionOnPress={
          meal
            ? (item) => {
                router.push({
                  pathname: '/food/create',
                  params: {
                    product: JSON.stringify(item),
                  },
                });
              }
            : undefined
        }
        onPressItem={(item) => {
          router.push({
            pathname: '/food/create',
            params: {
              product: JSON.stringify(item),
            },
          });
        }}
        accentColor={theme.colors.pink}
      />
    </>
  );
};

export default FoodScreen;
