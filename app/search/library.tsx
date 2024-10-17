import { router, Stack, useLocalSearchParams } from 'expo-router';
import React, { ComponentProps, useCallback, useState } from 'react';
import { useStyles } from 'react-native-unistyles';

import { MealScreenParams } from '../meal/[date]/[name]';
import { SetFoodInMealParams } from '../meal/[date]/[name]/set/food';

import { SearchScreen } from '~/components/common/SearchScreen';
import { fetchProductByBarcode, searchProductBySearchTerm } from '~/utils/api';

type SearchLibraryParams = MealScreenParams & {
  searchQuery?: string;
};

const SearchAllScreen = () => {
  const { theme } = useStyles();
  const [searchResults, setSearchResults] = useState<
    ComponentProps<typeof SearchScreen>['listItems']
  >([]);
  const [isLoading, setIsLoading] = useState(false);
  const { searchQuery, date, name } = useLocalSearchParams<SearchLibraryParams>();

  const handleCustomSearch = useCallback(async (query: string) => {
    try {
      setIsLoading(true);
      const results = await searchProductBySearchTerm(query);
      setSearchResults(
        results.map((item) => ({
          id: item.id,
          name: item.name,
          subtitle: item.brands,
          mainValue: item.base_nutriments.energy_kcal,
          secondaryValue: 0,
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
        initialSearchQuery={searchQuery}
        onCustomSearch={handleCustomSearch}
        isLoading={isLoading}
        listActionIcon="add-circle-outline"
        listActionOnPress={async (item) => {
          setIsLoading(true);
          const product = await fetchProductByBarcode(item.id);
          setIsLoading(false);
          router.push({
            pathname: '/meal/[date]/[name]/set/food',
            params: {
              foodId: product.code,
              defaultValues: JSON.stringify(product),
              date,
              name,
            } as SetFoodInMealParams,
          });
        }}
      />
    </>
  );
};

export default SearchAllScreen;
