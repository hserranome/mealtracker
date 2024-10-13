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
const useAddFoodToMeal = () => {
  const {
    meal: mealString,
    foodId,
    mealItemId,
    product: productString,
  } = useLocalSearchParams<{
    meal: string;
    foodId?: string;
    product?: string;
    mealItemId?: string;
  }>();
  const { useRow } = useTinyBase();
  const router = useRouter();
  // Required. Otherwise we can't do anything
  const meal: Meal = React.useMemo(() => JSON.parse(mealString), [mealString]);

  // Fetch the existing meal item if mealItemId is provided
  const mealItem = useRow(MEAL_ITEMS_TABLE, mealItemId ?? 'none');

  // Use quantity from meal item, or default to 100
  const [quantity, setQuantity] = React.useState(
    mealItem?.quantity ? Number(mealItem.quantity) : 100
  );

  // Try to find food row by foodId, or by mealItem id
  const foodRow = useRow(FOOD_TABLE, foodId ?? (mealItem?.id ? String(mealItem.id) : 'none'));

  // Use found food row, or provided product object
  const foodItem = React.useMemo(() => {
    return foodRow && Object.keys(foodRow).length > 0
      ? foodRow
      : productString
        ? JSON.parse(productString)
        : null || {};
  }, [foodRow, productString]);
  const foodItemId = foodItem.id ?? foodItem.code;

  console.log('foodItem', foodItem);

  // Use unit from meal item, or use foodItem default serving unit, or default to 'g'
  const [unit] = React.useState(mealItem?.unit || foodItem.default_serving_unit || 'g');

  const handleAdd = () => {
    // Set meal
    const currentMeal = tbStore.getRow(MEALS_TABLE, meal.id);
    tbStore.setRow(MEALS_TABLE, meal.id, {
      ...currentMeal,
      ...meal,
    });
    // Set food item
    tbStore.setRow(FOOD_TABLE, foodItemId, foodItem);

    // Update or create meal item
    const mealItemRowId = mealItemId || `${meal.id}-${Crypto.randomUUID()}`;
    tbStore.setRow(MEAL_ITEMS_TABLE, mealItemRowId, {
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

  const calculateMacro = (value: number) => Math.ceil((Number(value) * quantity) / 100);
  const macros = React.useMemo(() => {
    return {
      carbohydrate: calculateMacro(foodItem.carbohydrates),
      protein: calculateMacro(foodItem.proteins),
      fat: calculateMacro(foodItem.fat),
      calories: calculateMacro(foodItem.energy_kcal),
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
    isEditing: !!mealItemId, // New property to indicate if we're editing
  };
};

export default function AddFoodToMeal() {
  const { styles, theme } = useStyles(stylesheet);
  const { foodItem, quantity, setQuantity, unit, macros, handleAdd, handleEdit, isEditing } =
    useAddFoodToMeal();

  return (
    <>
      <Stack.Screen
        options={{
          title: isEditing ? 'Edit Food' : 'Add Food',
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
              title={isEditing ? 'Update' : 'Add'}
              onPress={handleAdd}
              style={{ backgroundColor: theme.colors.pink }}
              textStyle={{ color: theme.colors.foreground }}
            />
          </View>
          <View style={styles.button}>
            <Button
              title="Edit Food"
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
