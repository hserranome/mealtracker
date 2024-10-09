import * as Crypto from 'expo-crypto';
import { Stack, useRouter } from 'expo-router';
import { useFormContext } from 'react-hook-form';
import { useStyles } from 'react-native-unistyles';

import { FoodForm, FoodFormData } from '~/components/common/FoodForm';
import { FOOD_TABLE, useTinyBase } from '~/data';
import { capitalize } from '~/utils/capitalize';

export default function CreateFood() {
  const router = useRouter();
  const { theme } = useStyles();
  const { useSetRowCallback } = useTinyBase();
  const form = useFormContext<FoodFormData>();

  const onSubmit = useSetRowCallback(
    FOOD_TABLE,
    (data) => data.id ?? Crypto.randomUUID(),
    (data: FoodFormData) => ({
      ...data,
      name: capitalize(data.name.trim()),
      brands: capitalize(data.brands.trim()),
    }),
    [],
    undefined,
    () => {
      router.back();
    },
    []
  );

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
      <FoodForm form={form} onSubmit={onSubmit} submitButtonText="Next" />
    </>
  );
}
