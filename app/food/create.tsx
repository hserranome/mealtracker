import { Stack } from 'expo-router';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { View, ScrollView } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import { TextInput, Button, Separator } from '../../components/common';
import { NewFood } from '../../data/schemas/foods';

export default function CreateFood() {
  const { styles } = useStyles(stylesheet);
  const methods = useForm<NewFood>();

  const onSubmit = (data: NewFood) => {
    console.log(data);
  };

  return (
    <>
      <Stack.Screen options={{ title: 'Create Food' }} />
      <ScrollView style={styles.container}>
        <FormProvider {...methods}>
          <TextInput
            name="name"
            rules={{ required: 'Name is required' }}
            label="Name"
            placeholder="Required"
            variant="ghost"
            direction="horizontal"
          />
          <TextInput
            label="Brand"
            name="brand"
            placeholder="Optional"
            variant="ghost"
            direction="horizontal"
          />
          <Separator title="Nutrition facts" right="For 100g" />
          <TextInput
            rules={{ required: 'Calories are required' }}
            label="Calories"
            name="kcal"
            placeholder="Required"
            keyboardType="numeric"
            variant="ghost"
            direction="horizontal"
          />
          <TextInput
            name="fat"
            label="Fat (g)"
            placeholder="Optional"
            keyboardType="numeric"
            variant="ghost"
            direction="horizontal"
          />
          <TextInput
            name="proteins"
            label="Proteins (g)"
            placeholder="Optional"
            keyboardType="numeric"
            variant="ghost"
            direction="horizontal"
          />
          <TextInput
            name="carbohydrates"
            label="Carbohydrates (g)"
            placeholder="Optional"
            keyboardType="numeric"
            variant="ghost"
            direction="horizontal"
          />
        </FormProvider>
        <View style={styles.button}>
          <Button onPress={methods.handleSubmit(onSubmit)} title="Next" />
        </View>
      </ScrollView>
    </>
  );
}

const stylesheet = createStyleSheet((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },

  button: {
    paddingVertical: theme.margins[10],
    paddingHorizontal: theme.margins[18],
  },
}));
