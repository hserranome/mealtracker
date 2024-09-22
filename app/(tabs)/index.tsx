import { Link } from 'expo-router';
import { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import { Button, ButtonType } from '~/components/common/Button';
import { getCurrentDayCalories } from '~/utils/calorieStorage';
import { getDateName } from '~/utils/getDateName';
// import { Food } from '~/data/types/Food';

// const getFoodsNutriments = (foods: Food[]) => {
//   return foods.reduce(
//     (acc, food) => {
//       return {
//         kcal: acc.kcal + food.nutriments.kcal,
//         fat: acc.fat + food.nutriments.fat,
//         proteins: acc.proteins + food.nutriments.proteins,
//         carbohydrates: acc.carbohydrates + food.nutriments.carbohydrates,
//       };
//     },
//     { kcal: 0, fat: 0, proteins: 0, carbohydrates: 0 }
//   );
// };

// const getMealFoods = (meal: number, foods: Food[]) => {
//   const foodsWithIndex = foods.map((food, index) => ({ ...food, index }));
//   return foodsWithIndex.filter((food) => food.meal === meal);
// };

// const NutrimentsInline = ({ nutriments }: { nutriments: Food['nutriments'] }) => {
//   const { styles } = useStyles(stylesheet);
//   return (
//     <View style={styles.nutriments}>
//       <Text style={[styles.nutriment]}>{`${nutriments.kcal} kcal`}</Text>
//       <Text style={[styles.nutriment]}>{`${nutriments.fat} g fat`}</Text>
//       <Text style={[styles.nutriment]}>{`${nutriments.proteins} g proteins`}</Text>
//       <Text style={[styles.nutriment]}>{`${nutriments.carbohydrates} g carbs`}</Text>
//     </View>
//   );
// };

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
      {/* HEADER */}
      <View style={styles.header}>
        <Button type={ButtonType.Ghost} onPress={dateBack} icon="arrow-left" />
        <Text style={styles.title}>{getDateName(date)}</Text>
        <Button type={ButtonType.Ghost} onPress={dateForward} icon="arrow-right" />
      </View>
      <View style={styles.calorieInfo}>
        <Text style={styles.calorieText}>{`${currentDayCalories ?? 'N/A'} kcal`}</Text>
      </View>
      <Link href="/barcode-cam" asChild>
        <Button title="Scan Barcode" />
      </Link>
      {/* <NutrimentsInline nutriments={dayNutriments} /> */}
      {/* MEALS */}
      {/* {data.meals.map((meal: any, mealIndex) => {
        const foods = getMealFoods(mealIndex, data.foods);
        const nutriments = getFoodsNutriments(foods);
        return (
          <View key={meal} style={styles.meal}>
            <View style={styles.mealHeader}>
              <Text style={styles.mealTitle}>{meal}</Text>
            </View>
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
            <NutrimentsInline nutriments={nutriments} />
          </View>
        );
      })} */}
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
