import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import { Button, ButtonType } from '~/components/common/Button';
import { CalorieCircle } from '~/components/common/CalorieCircle';
import { FoodItem } from '~/components/common/FoodItem';
import { MacroItem } from '~/components/common/MacroItem';

const mockFoodItems = [
  { name: 'Arroz Basmati', brand: 'Hacendado', calories: 130, weight: 150 },
  { name: 'Arroz Basmati', brand: 'Hacendado', calories: 130, weight: 150 },
  { name: 'Arroz Basmati', brand: 'Hacendado', calories: 130, weight: 150 },
  { name: 'Arroz Basmati', brand: 'Hacendado', calories: 130, weight: 150 },
  { name: 'Arroz Basmati', brand: 'Hacendado', calories: 130, weight: 150 },
];

const totalCalories = 667;
const calorieGoal = 2000;

export default function MealScreen() {
  const { meal } = useLocalSearchParams<{ meal: string }>();
  const router = useRouter();
  const { styles, theme } = useStyles(stylesheet);

  const handleAddFood = () => {
    router.push({ pathname: '/meal/search', params: { meal } });
  };

  const handleScanFood = () => {
    // Implement scanner functionality
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: '',
          headerTintColor: theme.colors.foreground,
          headerStyle: {
            backgroundColor: theme.colors.base900,
          },
        }}
      />
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <CalorieCircle totalCalories={totalCalories} calorieGoal={calorieGoal} />
          <View style={styles.header}>
            <Text style={styles.title}>{meal}</Text>
            <Text style={styles.date}>10 JULY, 2024</Text>
          </View>
        </View>
        <View style={styles.macroContainer}>
          <MacroItem label="Carbohydrate" value="120g" color={theme.colors.red} />
          <MacroItem label="Protein" value="78g" color={theme.colors.blue} />
          <MacroItem label="Fat" value="0g" color={theme.colors.base600} />
          <MacroItem label="Calories" value="420cal" color={theme.colors.base800} />
        </View>
        <ScrollView style={styles.foodList}>
          {mockFoodItems.map((item, index) => (
            <FoodItem key={index} {...item} />
          ))}
        </ScrollView>
        <View style={styles.buttonContainer}>
          <Button
            title="Search for food"
            icon="search"
            onPress={handleAddFood}
            style={styles.button}
          />
          <Button
            icon="camera"
            type={ButtonType.Outline}
            onPress={handleScanFood}
            style={[styles.button, styles.scanButton]}
          />
        </View>
      </View>
    </>
  );
}

const stylesheet = createStyleSheet((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  headerContainer: {
    paddingTop: theme.margins[8],
    backgroundColor: theme.colors.base900,
  },
  header: {
    paddingHorizontal: theme.margins[24],
    marginBottom: theme.margins[24],
  },
  title: {
    ...theme.fonts.heading.m,
    color: theme.colors.foreground,
  },
  date: {
    ...theme.fonts.body.xs,
    color: theme.colors.base600,
  },
  macroContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: theme.margins[24],
    paddingBottom: theme.margins[24],
    backgroundColor: theme.colors.base900,
  },
  foodList: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: theme.margins[12],
    paddingBottom: theme.margins[32],
    paddingHorizontal: theme.margins[18],
    gap: theme.margins[8],
  },
  button: {
    flex: 1,
  },
  scanButton: { flex: 0, width: '15%' },
}));
