import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { useStyles } from 'react-native-unistyles';

import { Button, ButtonType } from '~/components/common';
import { FoodForm, FoodFormData } from '~/components/common/FoodForm';
import { FOOD_TABLE, useTinyBase } from '~/data';
import { capitalize } from '~/utils/capitalize';

export default function EditFood() {
  const router = useRouter();
  const { theme } = useStyles();
  const form = useFormContext<FoodFormData>();
  const { useRow, useSetRowCallback, useDelRowCallback } = useTinyBase();

  const { id } = useLocalSearchParams<{ id: string }>();
  const product = useRow(FOOD_TABLE, id);

  useEffect(() => {
    if (product) {
      Object.entries(product).forEach(([key, value]) => {
        form.setValue(key as keyof FoodFormData, value as any);
      });
    }
  }, [product]);

  const onSubmit = useSetRowCallback(
    FOOD_TABLE,
    (data) => data.id,
    (data: FoodFormData) => ({
      ...data,
      name: capitalize(data.name.trim()),
      brands: capitalize(data.brands.trim()),
    }),
    undefined,
    undefined,
    () => {
      router.back();
    }
  );

  const onDelete = useDelRowCallback(FOOD_TABLE, id, undefined, () => {
    router.back();
  });

  return (
    <>
      <Stack.Screen
        options={{
          title: product?.name ? String(product?.name) : 'Edit food',
          headerTintColor: theme.colors.foreground,
          headerStyle: {
            backgroundColor: theme.colors.base900,
          },
          headerRight: () => (
            <Button onPress={onDelete} icon="trash-bin-outline" type={ButtonType.Ghost} />
          ),
        }}
      />
      <FoodForm form={form} onSubmit={onSubmit} submitButtonText="Next" />
    </>
  );
}
