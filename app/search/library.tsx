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
  const [isLoading, setIsLoading] = useState(false);

  const handleCustomSearch = useCallback(async (query: string) => {
    try {
      setIsLoading(true);
      const results = await searchProductBySearchTerm(query);
      setSearchResults(
        results.map((item) => ({
          id: item.id,
          name: item.name,
          subtitle: item.brands,
          mainValue: item.energy_kcal,
          secondaryValue: item.default_serving_size,
          unit: 'kcal',
        }))
      );
    } catch (error) {
      console.error('Error searching external API:', error);
    } finally {
      setIsLoading(false);
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
        isLoading={isLoading}
      />
    </>
  );
};

export default SearchAllScreen;
