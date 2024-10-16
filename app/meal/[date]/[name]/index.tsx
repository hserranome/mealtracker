import { observer } from '@legendapp/state/react';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import React, { useMemo } from 'react';
import { View, Text, FlatList } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import { createQueries } from 'tinybase/with-schemas';

import { Button, ButtonType } from '~/components/common/Button';
import { ListItem, ListItemType } from '~/components/common/ListItem';
import { MacrosRow } from '~/components/common/MacrosRow';
import { dairy$, Meal, MEAL_ITEMS_TABLE, MEALS_TABLE, useTinyBase } from '~/data';
import { capitalize } from '~/utils/capitalize';
import { formatDate } from '~/utils/formatDate';

export type MealScreenParams = {
  date: string;
  name: string;
};

export default observer(function MealScreen() {
  const router = useRouter();
  const { styles, theme } = useStyles(stylesheet);
  const { date, name } = useLocalSearchParams<MealScreenParams>();

  const meal = dairy$.getDateMeal(date, name);

  const handleGoToSearch = () => {
    router.push({ pathname: '/search', params: { date, name } });
  };

  const handleScanFood = () => {
    router.push({
      pathname: '/meal/[date]/[name]/scanner',
      params: { date, name },
    });
  };

  const deleteMealItem = (id: string) => {};

  // const mealItems = [] as const;
  // const listItems: ListItemType[] = useMemo(
  //   () =>
  //     Object.entries(mealItems ?? {})
  //       .map(([id, item]) => ({
  //         id,
  //         name: String(item.name),
  //         subtitle: `${item?.brands ? String(item.brands) : undefined} - ${(Number(item.energy_kcal) * Number(item.quantity)) / 100} kcal`,
  //         mainValue: Number(item.quantity),
  //         unit: String(item.default_serving_unit),
  //       }))
  //       .filter((item) => item.name),
  //   [mealItems]
  // );

  const renderListItem = ({ item }: { item: ListItemType }) => (
    <ListItem
      item={item}
      accentColor={theme.colors.blue}
      listActionIcon="close-circle-outline"
      listActionOnPress={() => deleteMealItem(item.id)}
      onPressItem={() =>
        router.push({
          pathname: '/meal/set/food',
          params: { mealItemId: item.id, date, name },
        })
      }
    />
  );

  return (
    <>
      <Stack.Screen
        options={{
          title: '',
          headerTintColor: theme.colors.foreground,
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: theme.colors.base900,
          },
        }}
      />
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <View style={styles.header}>
            <Text style={styles.title}>{capitalize(name)}</Text>
            <Text style={styles.date}>{formatDate(new Date(date))}</Text>
          </View>
        </View>
        <View style={styles.macrosContainer}>
          <MacrosRow fat={0} calories={0} carbohydrate={0} protein={0} />
        </View>
        <FlatList
          style={styles.foodList}
          data={[]}
          renderItem={renderListItem}
          keyExtractor={(item) => item.id}
        />
        <View style={styles.buttonContainer}>
          <View style={styles.searchButtonContainer}>
            <Button title="Search for food" icon="search" onPress={handleGoToSearch} />
          </View>
          <Button icon="barcode-outline" type={ButtonType.Outline} onPress={handleScanFood} />
        </View>
      </View>
    </>
  );
});

const stylesheet = createStyleSheet((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  headerContainer: {
    paddingTop: theme.margins[8],
    backgroundColor: theme.colors.base900,
  },
  header: {
    paddingHorizontal: theme.margins[24],
    marginBottom: theme.margins[24],
  },
  title: {
    ...theme.fonts.heading.m,
    color: theme.colors.foreground,
  },
  date: {
    ...theme.fonts.body.xs,
    color: theme.colors.base600,
  },
  macrosContainer: {
    paddingVertical: theme.margins[12],
    borderBottomColor: theme.colors.base200,
    borderBottomWidth: 3,
  },
  foodList: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  buttonContainer: {
    width: '100%',
    flexDirection: 'row',
    paddingTop: theme.margins[12],
    paddingBottom: theme.margins[32],
    paddingHorizontal: theme.margins[18],
    gap: theme.margins[8],
  },
  searchButtonContainer: {
    flex: 1,
  },
}));
