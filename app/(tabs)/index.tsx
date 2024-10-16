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
  const caloriesSchedule = caloriesSchedule$.schedule.get();
  const dayOfWeek = new Date(date).toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
  const calories = caloriesSchedule[dayOfWeek as Days] ?? 'N/A';

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
        <Text style={styles.calorieText}>{`N/A / ${calories} kcal`}</Text>
      </View>
      {defaultMealNames.map((name, index) => {
        const meal = dairy$.getDateMeal(dateString, name);
        return (
          <View key={`${name}-${index}`} style={styles.meal}>
            <View style={styles.mealHeader}>
              <Text style={styles.mealHeaderTitle}>{capitalize(name)}</Text>
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
