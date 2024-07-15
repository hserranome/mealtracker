import { Text, View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

type foodType = {
  name: string;
  amount: number;
  meal: string;
  quantity: number;
  measure: string;
  nutriments: {
    kcal: number;
    fat: number;
    protein: number;
    carbs: number;
  };
  full_nutriments: {
    kcal: number;
    fat: number;
    protein: number;
    carbs: number;
  };
};
const data = {
  date: '2024-07-15',
  meals: ['Breakfast', 'Lunch', 'Dinner'],
  foods: [
    {
      name: 'Apple',
      amount: 1,
      meal: 'Breakfast',
      quantity: 0.5,
      measure: 'units',
      nutriments: {
        kcal: 50,
        fat: 2.5,
        protein: 5,
        carbs: 5,
      },
      full_nutriments: {
        kcal: 100,
        fat: 5,
        protein: 10,
        carbs: 10,
      },
    },
    {
      name: 'Banana',
      amount: 1,
      meal: 'Breakfast',
      quantity: 0.5,
      measure: 'units',
      nutriments: {
        kcal: 50,
        fat: 2.5,
        protein: 5,
        carbs: 5,
      },
      full_nutriments: {
        kcal: 100,
        fat: 5,
        protein: 10,
        carbs: 10,
      },
    },
  ],
};

const getFoodsNutriments = (foods: foodType[]) => {
  return foods.reduce(
    (acc, food) => {
      return {
        kcal: acc.kcal + food.nutriments.kcal,
        fat: acc.fat + food.nutriments.fat,
        protein: acc.protein + food.nutriments.protein,
        carbs: acc.carbs + food.nutriments.carbs,
      };
    },
    { kcal: 0, fat: 0, protein: 0, carbs: 0 }
  );
};

const getMealFoods = (meal: string, foods: foodType[]) => {
  return foods.filter((food) => food.meal === meal);
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

const NutrimentsInline = ({
  nutriments,
}: {
  nutriments: { kcal: number; fat: number; protein: number; carbs: number };
}) => {
  const { styles } = useStyles(stylesheet);
  return (
    <View style={styles.nutriments}>
      <Text style={[styles.nutriment]}>{`${nutriments.kcal} kcal`}</Text>
      <Text style={[styles.nutriment]}>{`${nutriments.fat} g fat`}</Text>
      <Text style={[styles.nutriment]}>{`${nutriments.protein} g protein`}</Text>
      <Text style={[styles.nutriment]}>{`${nutriments.carbs} g carbs`}</Text>
    </View>
  );
};

export default function Dairy() {
  const dayNutriments = getFoodsNutriments(data.foods);

  const date = new Date(data.date);
  const dateName = getDateName(date);

  const { styles } = useStyles(stylesheet);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{dateName}</Text>
      </View>
      <NutrimentsInline nutriments={dayNutriments} />
      {data.meals.map((meal) => {
        const foods = getMealFoods(meal, data.foods);
        const nutriments = getFoodsNutriments(foods);
        return (
          <View key={meal} style={styles.meal}>
            <View style={styles.mealHeader}>
              <Text style={styles.mealTitle}>{meal}</Text>
            </View>
            {foods.length ? (
              <View style={styles.mealFoods}>
                {foods.map((food) => (
                  <View key={food.name} style={styles.mealFood}>
                    <Text style={styles.mealFoodName}>{food.name}</Text>
                    <Text
                      style={
                        styles.mealFoodAmount
                      }>{`${food.amount} ${food.quantity} ${food.measure}`}</Text>
                  </View>
                ))}
              </View>
            ) : null}
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
