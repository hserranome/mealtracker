import { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import { Button, ButtonType } from '~/components/common/Button';
import { NutrimentsRow } from '~/components/common/NutrimentsRow';
import { getCurrentDayCalories } from '~/utils/calorieStorage';
import { getDateName } from '~/utils/getDateName';

const defaultMeals = ['Breakfast', 'Lunch', 'Dinner'];

export default function Dairy() {
  const [date, setDate] = useState(new Date());
  const [currentDayCalories, setCurrentDayCalories] = useState<string | null>(null);

  useEffect(() => {
    const fetchCurrentDayCalories = async () => {
      const calories = await getCurrentDayCalories();
      setCurrentDayCalories(calories);
    };

    fetchCurrentDayCalories();
  }, [date]);

  const dateBack = () => setDate(new Date(date.setDate(date.getDate() - 1)));
  const dateForward = () => setDate(new Date(date.setDate(date.getDate() + 1)));

  const { styles } = useStyles(stylesheet);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Button type={ButtonType.Ghost} onPress={dateBack} icon="arrow-left" />
        <Text style={styles.title}>{getDateName(date)}</Text>
        <Button type={ButtonType.Ghost} onPress={dateForward} icon="arrow-right" />
      </View>
      <View style={styles.calorieInfo}>
        <Text style={styles.calorieText}>{`N/A / ${currentDayCalories ?? 'N/A'} kcal`}</Text>
      </View>
      {/* MEAL LIST GOES HERE */}
      {defaultMeals.map((name, index) => {
        return (
          <View key={`${name}-${index}`}>
            <View style={{ paddingHorizontal: 12, paddingVertical: 8, backgroundColor: '#CBD2E0' }}>
              <Text style={{ fontWeight: '800' }}>{name}</Text>
            </View>
            <View style={{ justifyContent: 'center' }}>
              <Button type={ButtonType.Ghost} title="Add food" icon="plus-circle" />
            </View>
            <NutrimentsRow />
          </View>
        );
      })}
    </View>
  );
}

const stylesheet = createStyleSheet((theme) => ({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: theme.colors.base400,
    padding: theme.margins[16],
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    ...theme.fonts.heading.xs,
    color: theme.colors.base800,
    marginHorizontal: theme.margins[18],
  },
  calorieInfo: {
    padding: theme.margins[16],
    backgroundColor: theme.colors.base200,
  },
  calorieText: {
    ...theme.fonts.body.m,
    color: theme.colors.base800,
    textAlign: 'center',
  },
}));
