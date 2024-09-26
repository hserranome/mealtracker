import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import { TextInput, Button } from '../../components/common';

type ServingSizesForm = {
  unit: string;
  serving_size: string;
};

export default function ServingSizes() {
  const { styles } = useStyles(stylesheet);
  const router = useRouter();
  const methods = useForm<ServingSizesForm>();

  const onSubmit = (data: ServingSizesForm) => {
    router.navigate({
      pathname: '/food/create',
      params: {
        serving_sizes: JSON.stringify(data),
      },
    });
  };

  const { serving_size, unit } = useLocalSearchParams();
  useEffect(() => {
    methods.setValue('serving_size', serving_size as string);
    methods.setValue('unit', unit as string);
  }, [serving_size, unit]);

  return (
    <>
      <Stack.Screen options={{ title: 'Edit Serving Sizes', presentation: 'modal' }} />

      <View style={styles.container}>
        <FormProvider {...methods}>
          <TextInput
            name="serving_size"
            label="Serving Size"
            placeholder="e.g., 100"
            variant="ghost"
            direction="horizontal"
            keyboardType="numeric"
          />
          <TextInput
            name="unit"
            label="Unit"
            placeholder="e.g., g, ml, oz"
            variant="ghost"
            direction="horizontal"
            type="number"
          />
        </FormProvider>
        <View style={styles.button}>
          <Button onPress={methods.handleSubmit(onSubmit)} title="Save" />
        </View>
      </View>
    </>
  );
}

const stylesheet = createStyleSheet((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  button: {
    marginTop: theme.margins[20],
  },
}));
