import { Stack } from 'expo-router/stack';
import { FormProvider, useForm } from 'react-hook-form';
import { KeyboardAvoidingView } from 'react-native';

import { Food } from '~/data';

export type FoodFormData = Food;

export default function Layout() {
  const methods = useForm<FoodFormData>({
    defaultValues: {
      default_serving_size: 100,
      default_serving_unit: 'g',
    },
  });

  return (
    <KeyboardAvoidingView behavior="padding" enabled style={{ flex: 1 }}>
      <FormProvider {...methods}>
        <Stack />
      </FormProvider>
    </KeyboardAvoidingView>
  );
}
