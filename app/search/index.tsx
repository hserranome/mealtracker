import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import React, { ComponentProps, useMemo } from 'react';
import { useStyles } from 'react-native-unistyles';

import { ListItemType } from '~/components/common/ListItem';
import { SearchScreen } from '~/components/common/SearchScreen';
import { MEAL_ITEMS_TABLE, useTinyBase } from '~/data';

const SearchAllScreen = () => {
  const { theme } = useStyles();
  const router = useRouter();
  const { meal } = useLocalSearchParams<{ meal: string }>();
  const { useTable } = useTinyBase();
  const recentMealItems = useTable(MEAL_ITEMS_TABLE);

  const listItems: ListItemType[] = useMemo(() => {
    return Object.entries(recentMealItems ?? {}).map(([id, item]) => ({ id, ...item }));
  }, [recentMealItems]);

  console.log('listItems', listItems);

  const buttons: ComponentProps<typeof SearchScreen>['buttons'] = [
    { icon: 'barcode-outline', label: 'Scan Barcode' },
    { icon: 'add-circle-outline', label: 'Quick add' },
    {
      icon: 'nutrition-outline',
      label: 'My food',
      onPress: () =>
        router.push({
          pathname: '/search/food',
          params: { meal },
        }),
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
        listItems={listItems}
        listTitle="History"
        accentColor={theme.colors.blue}
        showSearchMore
        searchMoreLabel="Search more in library"
        onSearchMore={() =>
          router.push({
            pathname: '/search/library',
            params: { meal },
          })
        }
      />
    </>
  );
};

export default SearchAllScreen;
