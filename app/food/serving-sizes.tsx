import { Stack, useRouter } from 'expo-router';
import { useForm, FormProvider, useFormContext } from 'react-hook-form';
import { View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import { FoodFormData } from './_layout';
import { TextInput, Button } from '../../components/common';

type ServingSizesForm = {
  default_serving_unit: string;
  default_serving_size: number;
};

export default function ServingSizes() {
  const { styles } = useStyles(stylesheet);
  const router = useRouter();
  const formContextMethods = useFormContext<FoodFormData>();

  const methods = useForm<ServingSizesForm>({
    defaultValues: {
      default_serving_size: formContextMethods.getValues('default_serving_size'),
      default_serving_unit: formContextMethods.getValues('default_serving_unit'),
    },
  });

  const submit = methods.handleSubmit((data: ServingSizesForm) => {
    formContextMethods.setValue('default_serving_size', data.default_serving_size);
    formContextMethods.setValue('default_serving_unit', data.default_serving_unit);
    router.back();
  });

  return (
    <>
      <Stack.Screen options={{ title: 'Edit Serving Sizes' }} />
      <View style={styles.container}>
        <FormProvider {...methods}>
          <TextInput
            autoFocus
            name="default_serving_size"
            label="Serving Size"
            placeholder="e.g., 100"
            variant="ghost"
            direction="horizontal"
            type="number"
            keyboardType="numeric"
            rules={{ required: 'Serving size is required' }}
            returnKeyType="next"
            onSubmitEditing={() => methods.setFocus('default_serving_unit')}
          />
          <TextInput
            name="default_serving_unit"
            label="Unit"
            placeholder="e.g., g, ml, oz"
            variant="ghost"
            direction="horizontal"
            returnKeyType="done"
            onSubmitEditing={submit}
          />
        </FormProvider>
        <View style={styles.button}>
          <Button onPress={submit} title="Save" />
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
