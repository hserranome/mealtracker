import { Link } from 'expo-router';
import { useState } from 'react';
import { Text, View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import { Button } from '~/components/elements/Button';
import { Food } from '~/data/types/Food';
import { useDairy } from '~/hooks/useDairy';

const getFoodsNutriments = (foods: Food[]) => {
  return foods.reduce(
    (acc, food) => {
      return {
        kcal: acc.kcal + food.nutriments.kcal,
        fat: acc.fat + food.nutriments.fat,
        proteins: acc.proteins + food.nutriments.proteins,
        carbohydrates: acc.carbohydrates + food.nutriments.carbohydrates,
      };
    },
    { kcal: 0, fat: 0, proteins: 0, carbohydrates: 0 }
  );
};

const getMealFoods = (meal: number, foods: Food[]) => {
  const foodsWithIndex = foods.map((food, index) => ({ ...food, index }));
  return foodsWithIndex.filter((food) => food.meal === meal);
};

const getDateName = (date: Date) => {
  const dateString = date.toDateString();
  if (dateString === new Date().toDateString()) {
    return 'Today';
  } else if (dateString === new Date(new Date().setDate(new Date().getDate() - 1)).toDateString()) {
    return 'Yesterday';
  } else if (dateString === new Date(new Date().setDate(new Date().getDate() + 1)).toDateString()) {
    return 'Tomorrow';
  }
  return dateString;
};

const NutrimentsInline = ({ nutriments }: { nutriments: Food['nutriments'] }) => {
  const { styles } = useStyles(stylesheet);
  return (
    <View style={styles.nutriments}>
      <Text style={[styles.nutriment]}>{`${nutriments.kcal} kcal`}</Text>
      <Text style={[styles.nutriment]}>{`${nutriments.fat} g fat`}</Text>
      <Text style={[styles.nutriment]}>{`${nutriments.proteins} g proteins`}</Text>
      <Text style={[styles.nutriment]}>{`${nutriments.carbohydrates} g carbs`}</Text>
    </View>
  );
};

export default function Dairy() {
  const [date, setDate] = useState(new Date());

  const { data, removeFoodFromDairy } = useDairy(date);

  const dayNutriments = getFoodsNutriments(data.foods);

  const dateName = getDateName(new Date(data.date));
  const dateBack = () => setDate(new Date(date.setDate(date.getDate() - 1)));
  const dateForward = () => setDate(new Date(date.setDate(date.getDate() + 1)));

  const { styles } = useStyles(stylesheet);
  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <Button onPress={dateBack} title="Back" />
        <Text style={styles.title}>{dateName}</Text>
        <Button onPress={dateForward} title="Forward" />
      </View>
      <Link href="/barcode-cam" asChild>
        <Button title="Scan Barcode" />
      </Link>
      <NutrimentsInline nutriments={dayNutriments} />
      {/* MEALS */}
      {data.meals.map((meal: any, mealIndex) => {
        const foods = getMealFoods(mealIndex, data.foods);
        const nutriments = getFoodsNutriments(foods);
        return (
          <View key={meal} style={styles.meal}>
            <View style={styles.mealHeader}>
              <Text style={styles.mealTitle}>{meal}</Text>
            </View>
            {/* FOODS */}
            {foods.length ? (
              <View style={styles.mealFoods}>
                {foods.map((food, index) => (
                  <View key={`${food.name}-${index}`} style={styles.mealFood}>
                    <Text style={styles.mealFoodName}>{food.name}</Text>
                    <Button onPress={() => removeFoodFromDairy(food.index)} title="Remove" />
                  </View>
                ))}
              </View>
            ) : null}
            {/* NUTRIMENTS */}
            <NutrimentsInline nutriments={nutriments} />
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
    gap: theme.margins[16],
  },
  title: {
    ...theme.fonts.heading.xs,
    color: theme.colors.base800,
  },
  nutriments: {
    paddingVertical: theme.margins[16],
    paddingHorizontal: theme.margins[16],
    flexDirection: 'row',
    justifyContent: 'center',
    gap: theme.margins[8],
  },
  nutriment: {
    color: theme.colors.base800,
  },
  meal: {},
  mealHeader: {
    padding: theme.margins[16],
    backgroundColor: theme.colors.base400,
  },
  mealTitle: {
    ...theme.fonts.heading.xxs,
    color: theme.colors.base800,
  },
  mealFoods: {
    padding: theme.margins[16],
    gap: theme.margins[8],
  },
  mealFood: {
    flexDirection: 'column',
    gap: theme.margins[8],
  },
  mealFoodName: {
    color: theme.colors.base800,
  },
  mealFoodAmount: {
    color: theme.colors.base800,
  },
}));
