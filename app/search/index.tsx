import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import React, { ComponentProps, useMemo } from 'react';
import { useStyles } from 'react-native-unistyles';

import { MealScreenParams } from '../meal/[date]/[name]';

import { ListItemType } from '~/components/common/ListItem';
import { SearchScreen } from '~/components/common/SearchScreen';

const SearchAllScreen = () => {
  const { theme } = useStyles();
  const router = useRouter();

  // Meal
  const { date, name } = useLocalSearchParams<MealScreenParams>();
  const hasMeal = !!date && !!name;

  // List items
  // const recentFoodItems = []
  // const listItems: ListItemType[] = [useMemo(() => {
  //   return Object.values(recentFoodItems ?? {}).map((item) => ({
  //     id: String(item.id),
  //     name: String(item.name),
  //     subtitle: item.brands ? String(item.brands) : undefined,
  //     mainValue: Number(item.energy_kcal),
  //     secondaryValue: Number(item.default_serving_size),
  //     unit: String(item.default_serving_unit),
  //   }));
  // }, [foodItems]);]

  // Buttons
  const buttons: ComponentProps<typeof SearchScreen>['buttons'] = [
    {
      icon: 'barcode-outline',
      label: 'Scan Barcode',
      onPress: () => {
        router.push({
          pathname: '/meal/[date]/[name]/scanner',
          params: { date, name },
        });
      },
    },
    { icon: 'add-circle-outline', label: 'Quick add' },
    {
      icon: 'nutrition-outline',
      label: 'My food',
      onPress: () =>
        router.push({
          pathname: '/search/food',
          params: { date, name },
        }),
    },
    {
      icon: 'restaurant-outline',
      label: 'My Recipe',
    },
  ];

  // Actions
  const handleGoToSetFood: ComponentProps<typeof SearchScreen>['listActionOnPress'] = hasMeal
    ? (item) => {
        router.push({
          pathname: '/meal/[date]/[name]/set/food',
          params: { date, name, foodId: item.id },
        });
      }
    : undefined;

  const handleGoToEditItem: ComponentProps<typeof SearchScreen>['onPressItem'] = (item) => {
    router.push({
      pathname: '/food/[id]',
      params: { id: item.id },
    });
  };

  const handleGoToSearchMore = (searchQuery: string) => {
    router.push({
      pathname: '/search/library',
      params: { date, name, searchQuery },
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
        listItems={[]}
        listTitle="History"
        accentColor={theme.colors.blue}
        showSearchMore
        searchMoreLabel="Search more in library"
        listActionIcon={hasMeal ? 'add-circle-outline' : undefined}
        listActionOnPress={handleGoToSetFood}
        onPressItem={handleGoToEditItem}
        onSearchMore={handleGoToSearchMore}
      />
    </>
  );
};

export default SearchAllScreen;
