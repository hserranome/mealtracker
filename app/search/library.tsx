import { Stack } from 'expo-router';
import React, { ComponentProps, useCallback, useState } from 'react';
import { useStyles } from 'react-native-unistyles';

import { SearchScreen } from '~/components/common/SearchScreen';
import { searchProductBySearchTerm } from '~/utils/api';

const SearchAllScreen = () => {
  const { theme } = useStyles();
  const [searchResults, setSearchResults] = useState<
    ComponentProps<typeof SearchScreen>['listItems']
  >([]);

  const handleCustomSearch = useCallback(async (query: string) => {
    try {
      const results = await searchProductBySearchTerm(query);
      setSearchResults(
        results.map((item) => ({
          id: item.id,
          name: item.name,
          brands: item.brands,
          calories: item.energy_kcal,
          weight: item.default_serving_size,
        }))
      );
    } catch (error) {
      console.error('Error searching external API:', error);
    }
  }, []);

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Library',
          headerTintColor: theme.colors.foreground,
          headerStyle: {
            backgroundColor: theme.colors.base900,
          },
        }}
      />
      <SearchScreen
        listItems={searchResults}
        accentColor={theme.colors.blue}
        onCustomSearch={handleCustomSearch}
      />
    </>
  );
};

export default SearchAllScreen;
