import * as Crypto from 'expo-crypto';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect } from 'react';
import { FormProvider, useFormContext } from 'react-hook-form';
import { View, ScrollView } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import { FoodFormData } from './_layout';
import { TextInput, Button, Separator, InputContainer, ButtonType } from '../../components/common';

import { FOOD_TABLE, useTinyBase } from '~/data';
import { capitalize } from '~/utils/capitalize';

export default function CreateFood() {
  const router = useRouter();
  const form = useFormContext<FoodFormData>();
  const { styles, theme } = useStyles(stylesheet);
  const { useSetRowCallback } = useTinyBase();
  const { meal, product } = useLocalSearchParams<{ meal: string; product: string }>();

  useEffect(() => {
    if (product) {
      const productData = JSON.parse(product);
      form.setValue('id', productData.id);
      form.setValue('name', productData.product_name_es || productData.product_name);
      form.setValue('brands', productData.brands);
      form.setValue('code', productData.code);
      form.setValue('image_url', productData.image_url);
      form.setValue('default_serving_size', parseFloat(productData.product_quantity) || 100);
      form.setValue('default_serving_unit', 'g');
      form.setValue('energy_kcal', productData['energy-kcal_100g']);
      form.setValue('fat', productData.fat_100g);
      form.setValue('saturated_fat', productData['saturated-fat_100g']);
      form.setValue('carbohydrates', productData.carbohydrates_100g);
      form.setValue('sugars', productData.sugars_100g);
      form.setValue('proteins', productData.proteins_100g);
      form.setValue('fiber', productData.fiber_100g);
      form.setValue('salt', productData.salt_100g);
      form.setValue('sodium', productData.sodium_100g);
    }
  }, [product, form]);

  const navigateToBarcodeScanner = () => {
    router.push('/food/scanner');
  };

  const navigateToServingSizes = () => {
    router.push({ pathname: '/food/serving-sizes' });
  };

  useEffect(() => {
    const id = form.getValues('id');
    if (!id) form.setValue('id', Crypto.randomUUID());
  }, []);

  const onSubmit = useSetRowCallback(
    FOOD_TABLE,
    String(form.getValues('id')),
    (data: FoodFormData) => {
      return {
        ...data,
        name: capitalize(data.name.trim()),
        brands: capitalize(data.brands.trim()),
      };
    },
    [],
    undefined,
    () => {
      router.back();
    },
    []
  );

  const default_serving_size = form.getValues('default_serving_size');
  const default_serving_unit = form.getValues('default_serving_unit');

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

  const boldLabelStyles = {
    fontWeight: 'bold',
  } as const;

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
      <ScrollView>
        <FormProvider {...form}>
          <View style={styles.container}>
            <TextInput
              name="name"
              rules={{ required: 'Name is required' }}
              label="Name"
              placeholder="Required"
              {...commonProps}
            />
            <TextInput label="Brand" name="brands" placeholder="Optional" {...commonProps} />
            <View>
              <TextInput label="Barcode" name="code" placeholder="Optional" {...commonProps} />
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
            <Separator
              title="Nutrition facts"
              right={`For ${default_serving_size} ${default_serving_unit}`}
            />
            <TextInput
              rules={{ required: 'Calories are required' }}
              label="Calories (kcal)"
              name="energy_kcal"
              labelStyle={{ ...boldLabelStyles, color: theme.colors.orange }}
              {...commonNumericProps}
              placeholder="Required"
            />
            <TextInput
              name="fat"
              label="Fat (g)"
              labelStyle={{ ...boldLabelStyles, color: theme.colors.green }}
              {...commonNumericProps}
            />
            <TextInput name="saturated_fat" label="Saturated Fat (g)" {...commonNumericProps} />
            <TextInput
              name="proteins"
              label="Proteins (g)"
              labelStyle={{ ...boldLabelStyles, color: theme.colors.blue }}
              {...commonNumericProps}
            />
            <TextInput
              name="carbohydrates"
              label="Carbohydrates (g)"
              labelStyle={{ ...boldLabelStyles, color: theme.colors.red }}
              {...commonNumericProps}
            />
            <TextInput name="sugars" label="Sugars (g)" {...commonNumericProps} />
            <TextInput name="fiber" label="Fiber (g)" {...commonNumericProps} />
            <TextInput name="salt" label="Salt (g)" {...commonNumericProps} />
            <TextInput name="sodium" label="Sodium (g)" {...commonNumericProps} />
            <View style={styles.button}>
              <Button onPress={form.handleSubmit(onSubmit)} title="Next" />
            </View>
          </View>
        </FormProvider>
      </ScrollView>
    </>
  );
}

const stylesheet = createStyleSheet((theme) => ({
  container: {
    backgroundColor: theme.colors.background,
    paddingBottom: theme.margins[40],
  },

  button: {
    paddingVertical: theme.margins[10],
    marginTop: theme.margins[20],
    paddingHorizontal: theme.margins[18],
  },
}));
