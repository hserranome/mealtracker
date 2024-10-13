import * as Crypto from 'expo-crypto';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import React, { useMemo } from 'react';
import { View, Text } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import { Button, ButtonType } from '~/components/common/Button';
import { MacrosRow } from '~/components/common/MacrosRow/MacrosRow';
import { BaseTextInput } from '~/components/common/TextInput/BaseTextInput';
import { FOOD_TABLE, Meal, MEAL_ITEMS_TABLE, MEALS_TABLE, tbStore, useTinyBase } from '~/data';

export default function AddFoodToMeal() {
  const { styles, theme } = useStyles(stylesheet);
  const { foodItem, foodItemId, mealItem } = useFoodData();
  const { quantity, setQuantity, unit } = useQuantityAndUnit(
    mealItem?.quantity ? Number(mealItem.quantity) : 100,
    mealItem?.unit || foodItem.default_serving_unit
  );
  const { handleAdd, handleEdit, isEditing } = useAddEditFood(foodItem, foodItemId, quantity, unit);

  const macros = useQuantityMacros(foodItem, quantity);

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

// Hook to fetch and manage food data
const useFoodData = () => {
  const {
    foodId,
    mealItemId,
    product: productString,
  } = useLocalSearchParams<{
    foodId?: string;
    mealItemId?: string;
    product?: string;
    productId?: string;
  }>();
  const { useRow } = useTinyBase();

  const mealItem = useRow(MEAL_ITEMS_TABLE, mealItemId ?? 'none');
  const foodRow = useRow(FOOD_TABLE, foodId ?? (mealItem?.id ? String(mealItem.id) : 'none'));

  const foodItem = useMemo(() => {
    if (foodRow && Object.keys(foodRow).length > 0) return foodRow;
    if (productString) return JSON.parse(productString);
    return {};
  }, [foodRow, productString]);

  const foodItemId = foodItem.id ?? foodItem.code;

  return { foodItem, foodItemId, mealItem };
};

const useQuantityAndUnit = (defaultQuantity: number, defaultUnit: string = 'g') => {
  const [quantity, setQuantity] = React.useState(defaultQuantity);
  const [unit, setUnit] = React.useState(defaultUnit);
  return { quantity, setQuantity, unit, setUnit };
};

const useQuantityMacros = (
  foodItem: { carbohydrates: number; proteins: number; fat: number; energy_kcal: number },
  quantity: number
) => {
  const calculateMacro = (value: number) => Math.ceil((Number(value) * quantity) / 100);
  return React.useMemo(
    () => ({
      carbohydrate: calculateMacro(foodItem.carbohydrates),
      protein: calculateMacro(foodItem.proteins),
      fat: calculateMacro(foodItem.fat),
      calories: calculateMacro(foodItem.energy_kcal),
    }),
    [foodItem, quantity]
  );
};

const useAddEditFood = (foodItem: any, foodItemId: string, quantity: number, unit: string) => {
  const { meal: mealString, mealItemId } = useLocalSearchParams<{
    meal: string;
    mealItemId?: string;
  }>();
  const router = useRouter();
  const meal: Meal = React.useMemo(() => JSON.parse(mealString), [mealString]);

  const handleAdd = () => {
    const currentMeal = tbStore.getRow(MEALS_TABLE, meal.id);
    tbStore.setRow(MEALS_TABLE, meal.id, { ...currentMeal, ...meal });
    tbStore.setRow(FOOD_TABLE, foodItemId, foodItem);

    const mealItemRowId = mealItemId || `${meal.id}-${Crypto.randomUUID()}`;
    tbStore.setRow(MEAL_ITEMS_TABLE, mealItemRowId, {
      ...foodItem,
      item_id: foodItemId,
      meal_id: meal.id,
      type: 'food',
      quantity,
      unit,
    });

    router.dismissAll();
    router.navigate({ pathname: '/meal', params: meal });
  };

  const handleEdit = () =>
    router.push({
      pathname: '/food/[id]',
      params: { id: foodItemId, values: JSON.stringify(foodItem) },
    });

  return { handleAdd, handleEdit, isEditing: !!mealItemId };
};

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
