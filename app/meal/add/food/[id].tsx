import * as Crypto from 'expo-crypto';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { View, Text } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import { Button, ButtonType } from '~/components/common/Button';
import { MacrosRow } from '~/components/common/MacrosRow/MacrosRow';
import { BaseTextInput } from '~/components/common/TextInput/BaseTextInput';
import { FOOD_TABLE, Meal, MEAL_ITEMS_TABLE, MEALS_TABLE, tbStore, useTinyBase } from '~/data';

// Custom hook
function useAddFoodToMeal() {
  const {
    id: foodId,
    meal: mealString,
    product: productString,
  } = useLocalSearchParams<{
    id: string;
    meal: string;
    product?: string;
  }>();
  const { useRow } = useTinyBase();
  const router = useRouter();

  const [quantity, setQuantity] = React.useState(100);

  const foodRow = useRow(FOOD_TABLE, foodId);
  const product = React.useMemo(
    () => (productString ? JSON.parse(productString) : null),
    [productString]
  );
  const foodItem = React.useMemo(() => {
    return foodRow && Object.keys(foodRow).length > 0 ? foodRow : product || {};
  }, [foodRow, product]);

  const [unit] = React.useState(foodItem.default_serving_unit || 'g');
  const meal: Meal = React.useMemo(() => JSON.parse(mealString), [mealString]);

  const handleAdd = () => {
    // Set meal
    const currentMeal = tbStore.getRow(MEALS_TABLE, meal.id);
    tbStore.setRow(MEALS_TABLE, meal.id, {
      ...currentMeal,
      ...meal,
    });
    // Set food item
    tbStore.setRow(FOOD_TABLE, foodId, foodItem);
    // Set meal item
    tbStore.setRow(MEAL_ITEMS_TABLE, `${meal.id}-${Crypto.randomUUID()}`, {
      ...foodItem,
      item_id: foodId,
      meal_id: meal.id,
      type: 'food',
      quantity,
      unit,
    });
    // Navigate to meal
    router.dismissAll();
    router.navigate({
      pathname: '/meal',
      params: meal,
    });
  };

  const handleEdit = () => router.push(`/food/${foodId}`);

  const macros = React.useMemo(() => {
    return {
      carbohydrate: (Number(foodItem.carbohydrates) * quantity) / 100,
      protein: (Number(foodItem.proteins) * quantity) / 100,
      fat: (Number(foodItem.fat) * quantity) / 100,
      calories: (Number(foodItem.energy_kcal) * quantity) / 100,
    };
  }, [foodItem, quantity]);

  return {
    foodItem,
    quantity,
    setQuantity,
    unit,
    macros,
    handleAdd,
    handleEdit,
  };
}

export default function AddFoodToMeal() {
  const { styles, theme } = useStyles(stylesheet);
  const { foodItem, quantity, setQuantity, unit, macros, handleAdd, handleEdit } =
    useAddFoodToMeal();

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
        <View style={styles.header}>
          <Text style={styles.foodName}>{foodItem.name}</Text>
          <Text style={styles.brandName}>{foodItem.brands}</Text>
        </View>

        <View style={styles.macrosContainer}>
          <MacrosRow {...macros} />
        </View>

        <View style={styles.quantityContainer}>
          <View style={styles.textInputContainer}>
            <BaseTextInput
              type="number"
              value={quantity.toString()}
              onChangeText={(text) => setQuantity(Number(text))}
              keyboardType="numeric"
              maxLength={6}
              style={styles.quantityInput}
            />
          </View>
          <View style={styles.unitTextContainer}>
            <Text style={styles.unitText}>{unit}</Text>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <View style={styles.button}>
            <Button
              title="Add"
              onPress={handleAdd}
              style={{ backgroundColor: theme.colors.pink }}
              textStyle={{ color: theme.colors.foreground }}
            />
          </View>
          <View style={styles.button}>
            <Button
              title="Edit"
              onPress={handleEdit}
              type={ButtonType.Ghost}
              style={{ borderColor: theme.colors.pink }}
              textStyle={{ color: theme.colors.pink }}
            />
          </View>
        </View>
        {/* TODO: implement nutrition table which shows the nutrition 
        basis (100g) nutriments, and the current quantity nutriments */}
      </View>
    </>
  );
}

const stylesheet = createStyleSheet((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    paddingTop: theme.margins[16],
    paddingHorizontal: theme.margins[16],
    marginBottom: theme.margins[16],
  },
  foodName: {
    ...theme.fonts.heading.m,
    color: theme.colors.foreground,
  },
  brandName: {
    ...theme.fonts.body.m,
    color: theme.colors.base600,
  },
  macrosContainer: {
    paddingTop: theme.margins[6],
    paddingBottom: theme.margins[8],
    marginBottom: theme.margins[16],
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: theme.colors.base400,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: theme.margins[8],
    paddingHorizontal: theme.margins[16],
    marginBottom: theme.margins[16],
  },
  textInputContainer: {
    maxWidth: '40%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityInput: {
    flex: 1,
    height: 40,
    color: theme.colors.foreground,
    borderWidth: 1,
    borderColor: theme.colors.pink,
    borderRadius: theme.radius[5],
    marginRight: theme.margins[8],
    paddingHorizontal: theme.margins[10],
    textAlign: 'right',
  },
  unitTextContainer: {
    alignItems: 'center',
  },
  unitText: {
    ...theme.fonts.body.m,
    color: theme.colors.foreground,
  },
  buttonContainer: {
    width: '100%',
    paddingHorizontal: theme.margins[16],
    gap: theme.margins[8],
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: theme.margins[24],
  },
  button: {
    flex: 1,
  },
  nutritionContainer: {
    borderTopWidth: 1,
    borderTopColor: theme.colors.base400,
    paddingTop: theme.margins[16],
  },
  nutritionTitle: {
    ...theme.fonts.heading.xs,
    color: theme.colors.foreground,
    marginBottom: theme.margins[8],
  },
  nutritionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: theme.margins[8],
  },
  nutritionLabel: {
    ...theme.fonts.body.m,
    color: theme.colors.base600,
  },
}));
