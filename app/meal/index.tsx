import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import React, { useMemo } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import { Button, ButtonType } from '~/components/common/Button';
import { MacrosRow } from '~/components/common/MacrosRow';
import { formatDate } from '~/utils/formatDate';

type MealScreenSearchParams = { mealName: string; date: string };

export default function MealScreen() {
  const router = useRouter();
  const { styles, theme } = useStyles(stylesheet);

  const { mealName, date } = useLocalSearchParams<MealScreenSearchParams>();
  const mealId = mealName && date ? `${date.split('T')[0]}-${mealName.toLowerCase()}` : undefined;

  const jsDate = useMemo(() => new Date(date), [date]);

  const handleAddFood = () => {
    router.push({ pathname: '/search', params: { mealId } });
  };

  const handleScanFood = () => {
    router.push({
      pathname: '/meal/scanner',
      params: { mealId },
    });
  };

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
        <View style={styles.headerContainer}>
          <View style={styles.header}>
            <Text style={styles.title}>{mealName}</Text>
            <Text style={styles.date}>{formatDate(jsDate)}</Text>
          </View>
        </View>
        <View style={styles.macrosContainer}>
          <MacrosRow fat={0} calories={0} carbohydrate={0} protein={0} />
        </View>
        <ScrollView style={styles.foodList}>{/* IDK */}</ScrollView>
        <View style={styles.buttonContainer}>
          <View style={styles.searchButtonContainer}>
            <Button title="Search for food" icon="search" onPress={handleAddFood} />
          </View>
          <Button icon="barcode-outline" type={ButtonType.Outline} onPress={handleScanFood} />
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
  macrosContainer: {
    paddingVertical: theme.margins[12],
    borderBottomColor: theme.colors.base200,
    borderBottomWidth: 3,
  },
  foodList: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  buttonContainer: {
    width: '100%',
    flexDirection: 'row',
    paddingTop: theme.margins[12],
    paddingBottom: theme.margins[32],
    paddingHorizontal: theme.margins[18],
    gap: theme.margins[8],
  },
  searchButtonContainer: {
    flex: 1,
  },
}));
