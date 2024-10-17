import { observer } from '@legendapp/state/react';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { View, Text } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import { Button, ButtonType } from '~/components/common/Button';
import { MacrosRow } from '~/components/common/MacrosRow';
import { caloriesSchedule$, dairy$, Days, defaultMealNames } from '~/data';
import { capitalize } from '~/utils/capitalize';
import { getDateName } from '~/utils/getDateName';

export default observer(function DairyScreen() {
  const [date, setDate] = useState(new Date());
  const dateString = date.toISOString().split('T')[0];
  const router = useRouter();

  const dayOfWeek = new Date(date).toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();

  const caloriesSchedule = caloriesSchedule$.schedule.get();
  const estimatedCalories = caloriesSchedule[dayOfWeek as Days] ?? 'N/A';
  const consumedCalories = dairy$.getEntry(dateString).nutriments?.energy_kcal ?? 'N/A';

  const dateBack = () => setDate(new Date(date.setDate(date.getDate() - 1)));
  const dateForward = () => setDate(new Date(date.setDate(date.getDate() + 1)));

  const { styles } = useStyles(stylesheet);

  const handleGoToMeal = (name: string) => {
    router.push({
      pathname: '/meal/[date]/[name]',
      params: { name, date: dateString },
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
        <Text style={styles.calorieText}>{`${consumedCalories} / ${estimatedCalories} kcal`}</Text>
      </View>
      {defaultMealNames.map((name, index) => {
        const meal = dairy$.getDateMeal(dateString, name);
        const itemCount = Object.keys(meal?.items ?? {}).length;
        return (
          <View key={`${name}-${index}`} style={styles.meal}>
            <View style={styles.mealHeader}>
              <Text style={styles.mealHeaderTitle}>{capitalize(name)}</Text>
              <Text
                style={[
                  styles.mealHeaderCount,
                  itemCount > 0 && styles.mealHeaderCountActive,
                  itemCount < 10 && styles.mealHeaderCountSingle,
                ]}>
                {itemCount}
              </Text>
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
              <MacrosRow {...meal?.nutriments} />
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
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  meal: {
    paddingBottom: theme.margins[24],
  },
  mealHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#CBD2E0',
  },
  mealHeaderTitle: { fontWeight: '800' },
  mealHeaderCount: {
    fontWeight: '800',
    marginLeft: theme.margins[10],
    backgroundColor: theme.colors.base500,
    paddingHorizontal: theme.margins[8],
    paddingVertical: theme.margins[4],
    borderRadius: 100,
    minWidth: 18,
    height: 18,
    textAlign: 'center',
    overflow: 'hidden',
    ...theme.fonts.body.xs,
    lineHeight: 12,
  },
  mealHeaderCountSingle: {
    aspectRatio: 1,
    paddingHorizontal: 0,
  },
  mealHeaderCountActive: {
    backgroundColor: theme.colors.blue,
    color: theme.colors.foreground,
  },
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
