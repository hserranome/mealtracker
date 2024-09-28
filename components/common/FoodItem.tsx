import React from 'react';
import { View, Text } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import { Button, ButtonType } from './Button';

type FoodItemProps = {
  name: string;
  brand: string;
  calories: number;
  weight: number;
};

export const FoodItem: React.FC<FoodItemProps> = ({ name, brand, calories, weight }) => {
  const { styles } = useStyles(stylesheet);
  return (
    <View style={styles.foodItem}>
      <View>
        <Text style={styles.foodName}>{name}</Text>
        <Text style={styles.foodBrand}>
          {brand} - {calories} kcal
        </Text>
        <Text style={styles.foodWeight}>{weight}g</Text>
      </View>
      <Button type={ButtonType.Ghost} icon="close-circle-outline" />
    </View>
  );
};

const stylesheet = createStyleSheet((theme) => ({
  foodItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: theme.margins[12],
    paddingHorizontal: theme.margins[12],
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.base200,
  },
  foodName: {
    ...theme.fonts.body.m,
    color: theme.colors.foreground,
  },
  foodBrand: {
    ...theme.fonts.body.xs,
    color: theme.colors.base600,
  },
  foodWeight: {
    ...theme.fonts.body.xs,
    color: theme.colors.base600,
  },
}));
