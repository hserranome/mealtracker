import { useLocalSearchParams, Stack, useRouter } from 'expo-router';
import { FormProvider, useForm } from 'react-hook-form';
import { View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import { MealScreenParams } from '../..';

import { TextInput, Button } from '~/components/common';
import { dairy$, MealItem, QuickAdd } from '~/data';

// Add this new type definition
type NutritionField = {
  name: 'energy_kcal' | 'fat' | 'carbohydrates' | 'proteins';
  label: string;
  color?: string;
  required?: boolean;
};

export type SetQuickAddInMealParams = MealScreenParams & {
  mealItemId?: string;
};

export default function QuickAddScreen() {
  const router = useRouter();
  const { date, name, mealItemId } = useLocalSearchParams<SetQuickAddInMealParams>();
  const { styles, theme } = useStyles(stylesheet);

  const form = useForm<QuickAdd>();

  const submit = form.handleSubmit((data) => {
    // TODO: Add to meal
    const mealItem: MealItem = {
      type: 'quick_add',
      nutriments: data.nutriments,
      item: {
        description: data.description ?? '',
        nutriments: data.nutriments,
      },
    };
    dairy$.setMealItem(date, name, mealItemId ?? `${date}-${name}-${Date.now()}`, mealItem);
    router.dismissAll();
    router.navigate({ pathname: '/meal/[date]/[name]', params: { date, name } });
  });

  const fields: NutritionField[] = [
    {
      name: 'energy_kcal',
      label: 'Calories (kcal)',
      color: theme.colors.orange,
    },
    { name: 'fat', label: 'Fat (g)', color: theme.colors.green },
    {
      name: 'proteins',
      label: 'Proteins (g)',
      color: theme.colors.blue,
    },
    {
      name: 'carbohydrates',
      label: 'Carbohydrates (g)',
      color: theme.colors.red,
    },
  ];

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Quick Add',
          headerTintColor: theme.colors.foreground,
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: theme.colors.base900,
          },
        }}
      />
      <KeyboardAwareScrollView style={styles.container}>
        <FormProvider {...form}>
          <TextInput
            name="description"
            label="Description"
            {...commonProps}
            rules={undefined}
            placeholder="Optional"
            type="string"
            keyboardType="default"
            blurOnSubmit={false}
            onSubmitEditing={() => form.setFocus('nutriments.energy_kcal')}
          />
          {fields.map((field, index) => (
            <TextInput
              key={field.name}
              name={`nutriments.${field.name}`}
              label={field.label}
              labelStyle={{
                ...(field.color && { ...boldLabelStyles, color: field.color }),
              }}
              {...commonProps}
              onSubmitEditing={() => {
                const nextField = fields[index + 1];
                if (nextField) form.setFocus(`nutriments.${nextField.name}`);
              }}
              returnKeyType={index === fields.length - 1 ? 'done' : 'next'}
              blurOnSubmit={index === fields.length - 1}
            />
          ))}
          <View style={styles.button}>
            <Button onPress={submit} title="Add" />
          </View>
        </FormProvider>
      </KeyboardAwareScrollView>
    </>
  );
}

const stylesheet = createStyleSheet((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
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
  rules: { required: '' },
  keyboardType: 'numeric' as const,
  type: 'number' as const,
  placeholder: 'Required',
};

const boldLabelStyles = {
  fontWeight: 'bold',
} as const;
