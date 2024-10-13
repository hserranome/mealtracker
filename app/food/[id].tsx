import { Ionicons } from '@expo/vector-icons';
import * as Crypto from 'expo-crypto';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { FormProvider, useFormContext } from 'react-hook-form';
import { TouchableOpacity } from 'react-native';
import { useStyles } from 'react-native-unistyles';

import { FoodForm, FoodFormData } from '~/components/common/FoodForm';
import { FOOD_TABLE, useTinyBase } from '~/data';
import { capitalize } from '~/utils/capitalize';

export default function FoodPage() {
  const [initialized, setInitialized] = useState(false);
  const router = useRouter();
  const { theme } = useStyles();
  const { id, values } = useLocalSearchParams<{ id: string; values?: string }>();
  const { useSetRowCallback, useRow, useDelRowCallback } = useTinyBase();

  const isNewFood = id === 'new';
  const rowFood = useRow(FOOD_TABLE, id);
  const food = { ...rowFood, ...(values ? JSON.parse(values) : {}) };

  const form = useFormContext<FoodFormData>();

  useEffect(() => {
    if (!initialized) {
      form.reset(food);
      setInitialized(true);
    }
  }, [food, form, initialized]);

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

  const handleDelete = useDelRowCallback(FOOD_TABLE, id, undefined, () => {
    router.back();
  });

  return (
    <FormProvider {...form}>
      <Stack.Screen
        options={{
          title: isNewFood ? 'New food' : 'Edit food',
          headerTintColor: theme.colors.foreground,
          headerStyle: {
            backgroundColor: theme.colors.base900,
          },
          headerRight: isNewFood
            ? undefined
            : () => (
                <TouchableOpacity onPress={handleDelete}>
                  <Ionicons name="trash-outline" size={24} color={theme.colors.foreground} />
                </TouchableOpacity>
              ),
        }}
      />
      <FoodForm form={form} onSubmit={onSubmit} submitButtonText={isNewFood ? 'Next' : 'Save'} />
    </FormProvider>
  );
}
