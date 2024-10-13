import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import React, { useMemo } from 'react';
import { View, Text, FlatList } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import { createQueries } from 'tinybase/with-schemas';

import { Button, ButtonType } from '~/components/common/Button';
import { ListItem, ListItemType } from '~/components/common/ListItem';
import { MacrosRow } from '~/components/common/MacrosRow';
import { Meal, MEAL_ITEMS_TABLE, MEALS_TABLE, useTinyBase } from '~/data';
import { formatDate } from '~/utils/formatDate';

type MealScreenSearchParams = { name: string; date: string; id: string };

export default function MealScreen() {
  const router = useRouter();
  const { styles, theme } = useStyles(stylesheet);
  const { useCreateQueries, useResultTable, useStore, useRow, useDelRowCallback } = useTinyBase();
  const params = useLocalSearchParams<MealScreenSearchParams>();

  const meal: Meal = useMemo(getMealObject(useRow(MEALS_TABLE, params.id) as Meal, params), [
    params,
  ]);
  const mealString = JSON.stringify(meal);

  const queries = useCreateQueries(
    useStore(),
    (store) => {
      return createQueries(store).setQueryDefinition(
        'mealItems',
        MEAL_ITEMS_TABLE,
        ({ select, where }) => {
          select('name');
          select('brands');
          select('energy_kcal');
          select('fat');
          select('carbohydrates');
          select('proteins');
          select('quantity');
          where('meal_id', meal.id ?? 'none');
        }
      );
    },
    [meal.id]
  );

  const handleAddFood = () => {
    router.push({ pathname: '/search', params: { meal: mealString } });
  };

  const handleScanFood = () => {
    router.push({
      pathname: '/meal/scanner',
      params: { meal: mealString },
    });
  };

  const deleteMealItem = useDelRowCallback(MEAL_ITEMS_TABLE, (id: string) => id);

  const mealItems = useResultTable('mealItems', queries);
  const listItems: ListItemType[] = useMemo(
    () =>
      Object.entries(mealItems ?? {})
        .map(([id, item]) => ({
          id,
          name: String(item.name),
          brands: item?.brands ? String(item.brands) : undefined,
          calories: Number(item.energy_kcal),
          weight: Number(item.quantity),
        }))
        .filter((item) => item.name),
    [mealItems]
  );

  const renderListItem = ({ item }: { item: ListItemType }) => (
    <ListItem
      item={item}
      accentColor={theme.colors.blue}
      listActionIcon="close-circle-outline"
      listActionOnPress={() => deleteMealItem(item.id)}
    />
  );

  const jsDate = useMemo(() => new Date(meal.date), [meal.date]);

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
            <Text style={styles.title}>{meal.name}</Text>
            <Text style={styles.date}>{formatDate(jsDate)}</Text>
          </View>
        </View>
        <View style={styles.macrosContainer}>
          <MacrosRow fat={0} calories={0} carbohydrate={0} protein={0} />
        </View>
        <FlatList
          style={styles.foodList}
          data={listItems}
          renderItem={renderListItem}
          keyExtractor={(item) => item.id}
        />
        <View style={styles.buttonContainer}>
          <View style={styles.searchButtonContainer}>
            <Button title="Search for food" icon="search" onPress={handleAddFood} />
          </View>
          <Button icon="barcode-outline" type={ButtonType.Outline} onPress={handleScanFood} />
        </View>
      </View>
    </>
  );
}

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

const getMealObject = (mealItem: Meal, params: MealScreenSearchParams): (() => Meal) => {
  return () => {
    if (mealItem && Object.keys(mealItem).length > 0) {
      // Use existing meal data if available and not empty
      return {
        id: String(mealItem.id),
        name: String(mealItem.name),
        date: String(mealItem.date),
      };
    }

    // If no meal found or it's an empty object, use params and construct mealId
    const paramDate = params.date?.split('T')[0];
    const paramMealName = params.name?.toLowerCase();
    return {
      id: paramDate && paramMealName ? `${paramDate}-${paramMealName}` : '',
      name: params.name || '',
      date: paramDate || '',
    };
  };
};
