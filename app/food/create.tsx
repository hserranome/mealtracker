import * as Crypto from 'expo-crypto';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { View, ScrollView } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import { TextInput, Button, Separator, InputContainer, ButtonType } from '../../components/common';

import { FOOD_TABLE, Food, useTinyBase } from '~/data';

export default function CreateFood() {
  const { styles } = useStyles(stylesheet);
  const { useSetRowCallback } = useTinyBase();

  const methods = useForm<Food>({
    defaultValues: {
      serving_size: 100,
      unit: 'g',
    },
  });
  const router = useRouter();

  const navigateToServingSizes = () => {
    router.push({
      pathname: '/food/serving-sizes',
      params: {
        serving_size: methods.getValues('serving_size'),
        unit: methods.getValues('unit'),
      },
    });
  };

  const { serving_sizes } = useLocalSearchParams();
  useEffect(() => {
    if (typeof serving_sizes === 'string') {
      const data = JSON.parse(serving_sizes);
      methods.setValue('serving_size', data.serving_size);
      methods.setValue('unit', data.unit);
    }
  }, [serving_sizes]);

  useEffect(() => {
    // TODO: get default values from params
    methods.setValue('id', Crypto.randomUUID());
  }, []);

  const onSubmit = useSetRowCallback(
    FOOD_TABLE,
    String(methods.getValues('id')),
    (data: Food) => {
      console.log('data', data);
      return data;
    },
    [],
    undefined,
    () => {
      console.log('then');
    },
    []
  );

  const serving_size = methods.getValues('serving_size');
  const unit = methods.getValues('unit');

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
          <TextInput
            label="Barcode"
            name="barcode"
            placeholder="Optional"
            variant="ghost"
            direction="horizontal"
          />
          <InputContainer name="serving_sizes" direction="horizontal" label="Serving sizes">
            <Button
              title="Edit Serving Sizes"
              icon="arrow-right"
              iconPosition="right"
              onPress={navigateToServingSizes}
              type={ButtonType.Ghost}
            />
          </InputContainer>
          <Separator title="Nutrition facts" right={`For ${serving_size} ${unit}`} />
          <TextInput
            rules={{ required: 'Calories are required' }}
            label="Calories"
            name="kcal"
            placeholder="Required"
            keyboardType="numeric"
            variant="ghost"
            direction="horizontal"
            type="number"
          />
          <TextInput
            name="fat"
            label="Fat (g)"
            placeholder="Optional"
            keyboardType="numeric"
            variant="ghost"
            direction="horizontal"
            type="number"
          />
          <TextInput
            name="proteins"
            label="Proteins (g)"
            placeholder="Optional"
            keyboardType="numeric"
            variant="ghost"
            direction="horizontal"
            type="number"
          />
          <TextInput
            name="carbohydrates"
            label="Carbohydrates (g)"
            placeholder="Optional"
            keyboardType="numeric"
            variant="ghost"
            direction="horizontal"
            type="number"
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
