import * as Crypto from 'expo-crypto';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { View, ScrollView } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import { FoodFormData } from './_layout';
import { TextInput, Button, Separator, InputContainer, ButtonType } from '../../components/common';

import { FOOD_TABLE, useTinyBase } from '~/data';

export default function CreateFood() {
  const router = useRouter();
  const form = useFormContext<FoodFormData>();
  const { styles, theme } = useStyles(stylesheet);
  const { useSetRowCallback } = useTinyBase();
  const { meal, product } = useLocalSearchParams<{ meal: string; product: string }>();

  useEffect(() => {
    if (product) {
      const productData = JSON.parse(product);
      form.setValue('name', productData.product_name_es || productData.product_name);
      form.setValue('brand', productData.brands);
      form.setValue('barcode', productData.code);
      form.setValue('image_url', productData.image_url);
      form.setValue('default_serving_size', parseFloat(productData.product_quantity) || 100);
      form.setValue('default_serving_unit', 'g');
      form.setValue('energy_kcal', productData.nutriments['energy-kcal_100g']);
      form.setValue('fat', productData.nutriments.fat_100g);
      form.setValue('saturated_fat', productData.nutriments['saturated-fat_100g']);
      form.setValue('carbohydrates', productData.nutriments.carbohydrates_100g);
      form.setValue('sugars', productData.nutriments.sugars_100g);
      form.setValue('proteins', productData.nutriments.proteins_100g);
      form.setValue('fiber', productData.nutriments.fiber_100g);
      form.setValue('salt', productData.nutriments.salt_100g);
      form.setValue('sodium', productData.nutriments.sodium_100g);
    }
  }, [product, form]);

  const navigateToBarcodeScanner = () => {
    router.push('/food/scanner');
  };

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

  const commonProps = {
    variant: 'ghost' as const,
    direction: 'horizontal' as const,
    expand: false,
    textAlign: 'right' as const,
  };

  const commonNumericProps = {
    ...commonProps,
    keyboardType: 'numeric' as const,
    type: 'number' as const,
    placeholder: 'Optional',
  };

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
          {...commonProps}
        />
        <TextInput label="Brand" name="brand" placeholder="Optional" {...commonProps} />
        <View>
          <TextInput label="Barcode" name="barcode" placeholder="Optional" {...commonProps} />
          <Button
            title="Scan barcode"
            icon="camera"
            iconPosition="right"
            onPress={navigateToBarcodeScanner}
            type={ButtonType.Ghost}
          />
        </View>
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
          name="energy_kcal"
          {...commonNumericProps}
          placeholder="Required"
        />
        <TextInput name="fat" label="Fat (g)" {...commonNumericProps} />
        <TextInput name="saturated_fat" label="Saturated Fat (g)" {...commonNumericProps} />
        <TextInput name="proteins" label="Proteins (g)" {...commonNumericProps} />
        <TextInput name="carbohydrates" label="Carbohydrates (g)" {...commonNumericProps} />
        <TextInput name="sugars" label="Sugars (g)" {...commonNumericProps} />
        <TextInput name="fiber" label="Fiber (g)" {...commonNumericProps} />
        <TextInput name="salt" label="Salt (g)" {...commonNumericProps} />
        <TextInput name="sodium" label="Sodium (g)" {...commonNumericProps} />
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
