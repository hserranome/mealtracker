import * as Crypto from 'expo-crypto';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { useForm, FormProvider, useFormContext } from 'react-hook-form';
import { useStyles } from 'react-native-unistyles';

import { FoodForm, FoodFormData } from '~/components/common/FoodForm';
import { FOOD_TABLE, useTinyBase } from '~/data';
import { capitalize } from '~/utils/capitalize';

export default function FoodPage() {
  const router = useRouter();
  const { theme } = useStyles();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { useSetRowCallback, useRow } = useTinyBase();

  const isNewFood = id === 'new';
  const existingFood = useRow(FOOD_TABLE, id);

  const form = useFormContext<FoodFormData>();

  useEffect(() => {
    if (!isNewFood && existingFood) {
      form.reset(existingFood);
    }
  }, [isNewFood, existingFood, form]);

  const onSubmit = useSetRowCallback(
    FOOD_TABLE,
    (data) => data.id ?? (isNewFood ? Crypto.randomUUID() : id),
    (data: FoodFormData) => ({
      ...data,
      name: capitalize(data.name.trim()),
      brands: data.brands ? capitalize(data.brands.trim()) : undefined,
    }),
    [],
    undefined,
    () => {
      router.back();
    },
    []
  );

  return (
    <FormProvider {...form}>
      <Stack.Screen
        options={{
          title: isNewFood ? 'New food' : 'Edit food',
          headerTintColor: theme.colors.foreground,
          headerStyle: {
            backgroundColor: theme.colors.base900,
          },
        }}
      />
      <FoodForm form={form} onSubmit={onSubmit} submitButtonText={isNewFood ? 'Next' : 'Save'} />
    </FormProvider>
  );
}
