import * as Crypto from 'expo-crypto';
import { Stack, useRouter } from 'expo-router';
import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { View, ScrollView } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import { FoodFormData } from './_layout';
import { TextInput, Button, Separator, InputContainer, ButtonType } from '../../components/common';

import { FOOD_TABLE, useTinyBase } from '~/data';

export default function CreateFood() {
  const form = useFormContext<FoodFormData>();
  const { styles, theme } = useStyles(stylesheet);
  const { useSetRowCallback } = useTinyBase();

  const router = useRouter();

  const navigateToServingSizes = () => {
    router.push({ pathname: '/food/serving-sizes' });
  };

  useEffect(() => {
    // TODO: get default values from params
    form.setValue('id', Crypto.randomUUID());
  }, []);

  const onSubmit = useSetRowCallback(
    FOOD_TABLE,
    String(form.getValues('id')),
    (data: FoodFormData) => {
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

  const serving_size = form.getValues('serving_size');
  const unit = form.getValues('unit');

  return (
    <>
      <Stack.Screen
        options={{
          title: 'New food',
          headerTintColor: theme.colors.foreground,
          headerStyle: {
            backgroundColor: theme.colors.base900,
          },
        }}
      />
      <ScrollView style={styles.container}>
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
        <InputContainer name="barcode" direction="horizontal" label="Barcode">
          <Button
            title="Scan barcode"
            icon="camera"
            iconPosition="right"
            onPress={navigateToServingSizes}
            type={ButtonType.Ghost}
          />
        </InputContainer>
        <InputContainer name="serving_sizes" direction="horizontal" label="Serving sizes">
          <Button
            title="Edit Serving Sizes"
            icon="caret-forward"
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
        <View style={styles.button}>
          <Button onPress={form.handleSubmit(onSubmit)} title="Next" />
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
