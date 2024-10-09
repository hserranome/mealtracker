import { Stack, useRouter } from 'expo-router';
import React from 'react';
import { useStyles } from 'react-native-unistyles';

import { SearchScreen } from '~/components/common/SearchScreen';

const SearchAllScreen = () => {
  const { theme } = useStyles();
  const router = useRouter();

  const buttons = [
    { icon: 'barcode-outline', label: 'Scan Barcode' },
    { icon: 'add-circle-outline', label: 'Quick add' },
    {
      icon: 'nutrition-outline',
      label: 'My food',
      onPress: () => router.push('/search/food'),
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
        listItems={[]}
        listTitle="History"
        accentColor={theme.colors.blue}
        showSearchMore
        searchMoreLabel="Search more in library"
        onSearchMore={() => router.push('/search/library')}
      />
    </>
  );
};

export default SearchAllScreen;
