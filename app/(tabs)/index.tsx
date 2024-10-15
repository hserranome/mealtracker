import { observer } from '@legendapp/state/react';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { View, Text } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import { createQueries } from 'tinybase/with-schemas';

import { Button, ButtonType } from '~/components/common/Button';
import { MacrosRow } from '~/components/common/MacrosRow';
import { caloriesSchedule$, Days, MEAL_ITEMS_TABLE, MEALS_TABLE, useTinyBase } from '~/data';
import { getDateName } from '~/utils/getDateName';

const defaultMeals = ['Breakfast', 'Lunch', 'Dinner'];

const useDateMeals = (date: Date) => {
  const dateString = date.toISOString().split('T')[0];
  const { useCreateQueries, useStore, useResultTable } = useTinyBase();

  const queries = useCreateQueries(
    useStore(),
    (store) => {
      return createQueries(store)
        .setQueryDefinition('dateMeals', MEALS_TABLE, ({ select, where }) => {
          select('id');
          select('name');
          select('order');
          select('date');
          where('date', dateString);
        })
        .setQueryDefinition('dateItems', MEAL_ITEMS_TABLE, ({ select, where, join }) => {
          select('name');
          select('brands');
          select('energy_kcal');
          select('fat');
          select('carbohydrates');
          select('proteins');
          select('meal_id');
          join(MEALS_TABLE, 'meal_id').as('meal');
          where('meal', 'date', dateString);
        });
    },
    [date]
  );

  const mealsTable = useResultTable('dateMeals', queries);
  const meals = Object.keys(mealsTable).map((key) => mealsTable[key]);

  const items = useResultTable('dateItems', queries);

  const mealWithItems = meals.map((meal) => {
    const mealItems = Object.values(items).filter((item) => item.meal_id === meal.id);
    // TODO: calculate macros
    return {
      ...meal,
      macros: {
        calories: 0,
        fat: 0,
        carbohydrates: 0,
        protein: 0,
      },
      items: mealItems,
    };
  });

  console.log(
    'items',
    JSON.stringify(
      {
        mealWithItems,
      },
      null,
      2
    )
  );

  /* TODO: we need to generate the following object:
    result = {
      macros: {
        carbohydrate: number;
        fat: number;
        protein: number;
        calories: number;
      }, // total amount of macros of all items of all meals in this date
      meals: {
        [mealName: string]: {
          macros: {
            carbohydrate: number;
            fat: number;
            protein: number;
            calories: number;
          }; // total amount of macros of all items of this meal
          items: {
            name: string;
            brands: string;
            energy_kcal: number;
            fat: number;
            carbohydrates: number;
            proteins: number;
            quantity: number;
            unit: string;
          }[];
      }
      }
    }
  */

  return {};
};

export default observer(function Dairy() {
  const [date, setDate] = useState(new Date());
  const dateMeals = useDateMeals(date);
  const router = useRouter();
  const caloriesSchedule = caloriesSchedule$.schedule.get();
  const dayOfWeek = new Date(date).toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
  const calories = caloriesSchedule[dayOfWeek as Days] ?? 'N/A';

  const dateBack = () => setDate(new Date(date.setDate(date.getDate() - 1)));
  const dateForward = () => setDate(new Date(date.setDate(date.getDate() + 1)));

  const { styles } = useStyles(stylesheet);

  const handleGoToMeal = (name: string) => {
    router.push({
      pathname: '/meal',
      params: { name, date: date.toISOString().split('T')[0] },
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Button type={ButtonType.Ghost} onPress={dateBack} icon="caret-back" debounceRate={0} />
        <Text style={styles.title}>{getDateName(date)}</Text>
        <Button
          type={ButtonType.Ghost}
          onPress={dateForward}
          icon="caret-forward"
          debounceRate={0}
        />
      </View>
      <View style={styles.calorieInfo}>
        <Text style={styles.calorieText}>{`N/A / ${calories} kcal`}</Text>
      </View>
      {/* MEAL LIST GOES HERE */}
      {defaultMeals.map((name, index) => {
        return (
          <View key={`${name}-${index}`} style={styles.meal}>
            <View style={styles.mealHeader}>
              <Text style={styles.mealHeaderTitle}>{name}</Text>
            </View>
            <View style={styles.addFood}>
              <Button
                type={ButtonType.Ghost}
                title="Add food"
                icon="add-circle-outline"
                onPress={() => handleGoToMeal(name)}
              />
            </View>
            <View style={styles.macros}>
              <MacrosRow carbohydrate={0} calories={0} fat={0} protein={0} />
            </View>
          </View>
        );
      })}
    </View>
  );
});

const stylesheet = createStyleSheet((theme) => ({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: theme.margins[16],
    paddingVertical: theme.margins[16],
    flexDirection: 'row',
    alignItems: 'center',
  },
  meal: {
    paddingBottom: theme.margins[24],
  },
  mealHeader: { paddingHorizontal: 12, paddingVertical: 8, backgroundColor: '#CBD2E0' },
  mealHeaderTitle: { fontWeight: '800' },
  addFood: { justifyContent: 'center' },
  title: {
    ...theme.fonts.heading.xs,
    color: theme.colors.base800,
    marginHorizontal: theme.margins[18],
  },
  calorieInfo: {
    padding: theme.margins[16],
  },
  calorieText: {
    ...theme.fonts.body.m,
    color: theme.colors.base800,
    textAlign: 'center',
  },
  macros: {},
}));
