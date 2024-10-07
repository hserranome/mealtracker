import { Stack } from 'expo-router/stack';
import { FormProvider, useForm } from 'react-hook-form';

import { Food, Macros } from '~/data';

export type FoodFormData = Food & Macros;

export default function Layout() {
  const methods = useForm<FoodFormData>({
    defaultValues: {
      serving_size: 100,
      unit: 'g',
    },
  });

  return (
    <FormProvider {...methods}>
      <Stack />
    </FormProvider>
  );
}
