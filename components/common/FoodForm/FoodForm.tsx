import { useRouter } from 'expo-router';
import { FormProvider, UseFormReturn } from 'react-hook-form';
import { View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import { TextInput, Button, Separator, InputContainer, ButtonType } from '../';

import { Food } from '~/data';

interface FoodFormProps {
  form: UseFormReturn<Food>;
  onSubmit: (data: Food) => void;
  submitButtonText?: string;
}

// Add this new type definition
type NutritionField = {
  name: keyof Food['base_nutriments'];
  label: string;
  color?: string;
  required?: boolean;
};

export const FoodForm: React.FC<FoodFormProps> = ({
  form,
  onSubmit,
  submitButtonText = 'Next',
}) => {
  const router = useRouter();
  const { styles, theme } = useStyles(stylesheet);

  const navigateToBarcodeScanner = () => router.push('/food/scanner');
  const navigateToServingSizes = () => router.push('/food/serving-sizes');

  const submit = form.handleSubmit(onSubmit);

  const nutritionFields: NutritionField[] = [
    {
      name: 'energy_kcal',
      label: 'Calories (kcal)',
      color: theme.colors.orange,
      required: true,
    },
    { name: 'fat', label: 'Fat (g)', color: theme.colors.green, required: true },
    { name: 'saturated_fat', label: 'Saturated Fat (g)' },
    {
      name: 'proteins',
      label: 'Proteins (g)',
      color: theme.colors.blue,
      required: true,
    },
    {
      name: 'carbohydrates',
      label: 'Carbohydrates (g)',
      color: theme.colors.red,
      required: true,
    },
    { name: 'sugars', label: 'Sugars (g)' },
    { name: 'fiber', label: 'Fiber (g)' },
    { name: 'salt', label: 'Salt (g)' },
    { name: 'sodium', label: 'Sodium (mg)' },
  ];

  return (
    <KeyboardAwareScrollView>
      <FormProvider {...form}>
        <View style={styles.container}>
          <TextInput
            name="name"
            label="Name"
            {...commonProps}
            autoFocus
            onSubmitEditing={() => form.setFocus('brands')}
          />
          <TextInput
            label="Brand"
            name="brands"
            placeholder="Optional"
            {...commonProps}
            onSubmitEditing={() => form.setFocus('code')}
          />
          <View>
            <TextInput
              label="Barcode"
              name="code"
              placeholder="Optional"
              {...commonProps}
              onSubmitEditing={() => form.setFocus('base_nutriments.energy_kcal')}
            />
            <Button
              title="Scan barcode"
              icon="camera"
              iconPosition="right"
              onPress={navigateToBarcodeScanner}
              type={ButtonType.Ghost}
            />
          </View>
          <InputContainer direction="horizontal" label="Serving sizes">
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
            right={`For ${form.getValues('base_serving_size')} ${form.getValues('base_serving_unit')}`}
          />
          {nutritionFields.map((field, index) => (
            <TextInput
              key={field.name}
              name={`base_nutriments.${field.name}`}
              label={field.label}
              labelStyle={{
                ...(field.color && { ...boldLabelStyles, color: field.color }),
              }}
              {...commonNumericProps}
              {...(field.required && requiredProps)}
              onSubmitEditing={() => {
                const nextField = nutritionFields[index + 1];
                if (nextField) form.setFocus(`base_nutriments.${nextField.name}`);
              }}
              returnKeyType={index === nutritionFields.length - 1 ? 'done' : 'next'}
              blurOnSubmit={index === nutritionFields.length - 1}
            />
          ))}
          <View style={styles.button}>
            <Button onPress={submit} title={submitButtonText} />
          </View>
        </View>
      </FormProvider>
    </KeyboardAwareScrollView>
  );
};

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

const commonProps = {
  variant: 'ghost' as const,
  direction: 'horizontal' as const,
  expand: false,
  textAlign: 'right' as const,
  returnKeyType: 'next' as const,
  blurOnSubmit: false,
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

const requiredProps = {
  rules: { required: '' },
  placeholder: 'Required',
} as const;
