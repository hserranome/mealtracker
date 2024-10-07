import { Stack, useRouter } from 'expo-router';
import { useForm, FormProvider, useFormContext } from 'react-hook-form';
import { View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import { FoodFormData } from './_layout';
import { TextInput, Button } from '../../components/common';

type ServingSizesForm = {
  unit: string;
  serving_size: number;
};

export default function ServingSizes() {
  const { styles } = useStyles(stylesheet);
  const router = useRouter();
  const formContextMethods = useFormContext<FoodFormData>();

  const methods = useForm<ServingSizesForm>({
    defaultValues: {
      serving_size: formContextMethods.getValues('serving_size'),
      unit: formContextMethods.getValues('unit'),
    },
  });

  const onSubmit = (data: ServingSizesForm) => {
    formContextMethods.setValue('serving_size', data.serving_size);
    formContextMethods.setValue('unit', data.unit);
    router.navigate({
      pathname: '/food/create',
    });
  };

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
