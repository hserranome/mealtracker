import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { View, ScrollView } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import { TextInput, Button } from '~/components/common';
import { CALORIES_SCHEDULE_TABLE, useTinyBase } from '~/data';

export type WeekdayCalories = Record<string, string>;

const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export default function SetupWeekdays() {
  const { styles } = useStyles(stylesheet);
  const methods = useForm<WeekdayCalories>();
  const router = useRouter();
  const { useTable, useSetTableCallback } = useTinyBase();
  const storedData = useTable(CALORIES_SCHEDULE_TABLE);

  useEffect(() => {
    Object.keys(storedData).forEach((key) => {
      const value = storedData[key].calories;
      methods.setValue(key, String(value));
    });
  }, [storedData]);

  const onSubmit = useSetTableCallback(
    CALORIES_SCHEDULE_TABLE,
    (data: WeekdayCalories) => {
      const table = Object.keys(data).reduce(
        (acc, key) => ({
          ...acc,
          [key]: { calories: data[key] },
        }),
        {}
      );
      return table;
    },
    [],
    undefined,
    () => router.replace('/(tabs)')
  );

  return (
    <FormProvider {...methods}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.formContainer}>
          {weekdays.map((day, index) => (
            <View key={day} style={styles.inputContainer}>
              <TextInput
                label={day}
                direction="horizontal"
                name={day.toLowerCase()}
                placeholder="Enter calorie intake"
                keyboardType="numeric"
                style={styles.input}
                type="number"
                onSubmitEditing={() => {
                  if (index < weekdays.length - 1) {
                    methods.setFocus(weekdays[index + 1].toLowerCase());
                  }
                }}
                returnKeyType={index === weekdays.length - 1 ? 'done' : 'next'}
              />
            </View>
          ))}
          <View style={styles.button}>
            <Button title="Save" onPress={methods.handleSubmit(onSubmit)} />
          </View>
        </View>
      </ScrollView>
    </FormProvider>
  );
}

const stylesheet = createStyleSheet((theme) => ({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  formContainer: {
    marginHorizontal: theme.margins[24],
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.margins[16],
  },
  label: {
    ...theme.fonts.body.m,
    marginRight: theme.margins[8],
  },
  input: {
    flex: 1,
  },
  button: {
    marginTop: theme.margins[24],
  },
}));
