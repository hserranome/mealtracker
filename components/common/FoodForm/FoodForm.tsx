import { useRouter } from 'expo-router';
import { FormProvider, UseFormReturn } from 'react-hook-form';
import { View, ScrollView, KeyboardAvoidingView } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import { TextInput, Button, Separator, InputContainer, ButtonType } from '../';

export interface FoodFormData {
  id: string;
  name: string;
  brands: string;
  code: string;
  image_url: string;
  default_serving_size: number;
  default_serving_unit: string;
  energy_kcal: number;
  fat: number;
  saturated_fat: number;
  carbohydrates: number;
  sugars: number;
  proteins: number;
  fiber: number;
  salt: number;
  sodium: number;
}

interface FoodFormProps {
  form: UseFormReturn<FoodFormData>;
  onSubmit: (data: FoodFormData) => void;
  submitButtonText?: string;
}

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

  return (
    <ScrollView>
      <FormProvider {...form}>
        <KeyboardAvoidingView>
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
                onSubmitEditing={() => form.setFocus('energy_kcal')}
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
              right={`For ${form.getValues('default_serving_size')} ${form.getValues('default_serving_unit')}`}
            />
            <TextInput
              label="Calories (kcal)"
              name="energy_kcal"
              labelStyle={{ ...boldLabelStyles, color: theme.colors.orange }}
              {...commonNumericProps}
              {...requiredProps}
              onSubmitEditing={() => form.setFocus('fat')}
            />
            <TextInput
              name="fat"
              label="Fat (g)"
              labelStyle={{ ...boldLabelStyles, color: theme.colors.green }}
              {...commonNumericProps}
              {...requiredProps}
              onSubmitEditing={() => form.setFocus('saturated_fat')}
            />
            <TextInput
              name="saturated_fat"
              label="Saturated Fat (g)"
              {...commonNumericProps}
              onSubmitEditing={() => form.setFocus('proteins')}
            />
            <TextInput
              name="proteins"
              label="Proteins (g)"
              labelStyle={{ ...boldLabelStyles, color: theme.colors.blue }}
              {...commonNumericProps}
              {...requiredProps}
              onSubmitEditing={() => form.setFocus('carbohydrates')}
            />
            <TextInput
              name="carbohydrates"
              label="Carbohydrates (g)"
              labelStyle={{ ...boldLabelStyles, color: theme.colors.red }}
              {...commonNumericProps}
              {...requiredProps}
              onSubmitEditing={() => form.setFocus('sugars')}
            />
            <TextInput
              name="sugars"
              label="Sugars (g)"
              {...commonNumericProps}
              onSubmitEditing={() => form.setFocus('fiber')}
            />
            <TextInput
              name="fiber"
              label="Fiber (g)"
              {...commonNumericProps}
              onSubmitEditing={() => form.setFocus('salt')}
            />
            <TextInput
              name="salt"
              label="Salt (g)"
              {...commonNumericProps}
              onSubmitEditing={() => form.setFocus('sodium')}
            />
            <TextInput
              name="sodium"
              label="Sodium (mg)"
              {...commonNumericProps}
              returnKeyType="done"
              onSubmitEditing={submit}
            />
            <View style={styles.button}>
              <Button onPress={submit} title={submitButtonText} />
            </View>
          </View>
        </KeyboardAvoidingView>
      </FormProvider>
    </ScrollView>
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
