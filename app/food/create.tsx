import { Stack } from 'expo-router';
import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { View, ScrollView } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import { TextInput, Button, Separator } from '../../components/common';
import { NewFood } from '../../data/schemas/foods';

export default function CreateFood() {
  const { styles } = useStyles(stylesheet);
  const { control, handleSubmit } = useForm<NewFood>();

  const onSubmit = (data: NewFood) => {
    console.log(data);
    // TODO: Implement food creation logic
  };

  return (
    <>
      <Stack.Screen options={{ title: 'Create Food' }} />
      <ScrollView style={styles.container}>
        <View style={styles.form}>
          <Controller
            control={control}
            name="name"
            rules={{ required: 'Name is required' }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextInput
                value={value}
                label="Name"
                error={error?.message}
                onChangeText={onChange}
                placeholder="Required"
                variant="ghost"
                direction="horizontal"
              />
            )}
          />

          <Controller
            control={control}
            name="brand"
            rules={{}}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextInput
                value={value}
                label="Brand"
                error={error?.message}
                onChangeText={onChange}
                placeholder="Optional"
                variant="ghost"
                direction="horizontal"
              />
            )}
          />

          <Controller
            control={control}
            name="quantity"
            rules={{}}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextInput
                value={value}
                label="Quantity"
                error={error?.message}
                onChangeText={onChange}
                placeholder="Optional"
                keyboardType="numeric"
                variant="ghost"
                direction="horizontal"
              />
            )}
          />

          <Controller
            control={control}
            name="unit"
            rules={{}}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextInput
                value={value}
                label="Unit"
                error={error?.message}
                onChangeText={onChange}
                placeholder="Optional"
                variant="ghost"
                direction="horizontal"
              />
            )}
          />

          <Separator title="Nutrition facts" right="For 100g" />

          <Controller
            control={control}
            name="kcal"
            rules={{ required: 'Calories are required' }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextInput
                value={value?.toString()}
                label="Calories"
                error={error?.message}
                onChangeText={(text) => onChange(parseInt(text, 10))}
                placeholder="Required"
                keyboardType="numeric"
                variant="ghost"
                direction="horizontal"
              />
            )}
          />

          <Controller
            control={control}
            name="fat"
            rules={{}}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextInput
                value={value?.toString()}
                label="Fat (g)"
                error={error?.message}
                onChangeText={(text) => onChange(parseInt(text, 10))}
                placeholder="Optional"
                keyboardType="numeric"
                variant="ghost"
                direction="horizontal"
              />
            )}
          />

          <Controller
            control={control}
            name="proteins"
            rules={{}}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextInput
                value={value?.toString()}
                label="Proteins (g)"
                error={error?.message}
                onChangeText={(text) => onChange(parseInt(text, 10))}
                placeholder="Optional"
                keyboardType="numeric"
                variant="ghost"
                direction="horizontal"
              />
            )}
          />

          <Controller
            control={control}
            name="carbohydrates"
            rules={{}}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextInput
                value={value?.toString()}
                label="Carbohydrates (g)"
                error={error?.message}
                onChangeText={(text) => onChange(parseInt(text, 10))}
                placeholder="Optional"
                keyboardType="numeric"
                variant="ghost"
                direction="horizontal"
              />
            )}
          />

          <View style={styles.button}>
            <Button onPress={handleSubmit(onSubmit)} title="Next" />
          </View>
        </View>
      </ScrollView>
    </>
  );
}

const stylesheet = createStyleSheet((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  form: {
    // padding: theme.margins[24],
  },
  button: {
    paddingVertical: theme.margins[10],
    paddingHorizontal: theme.margins[18],
  },
}));
