import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { View, ScrollView, Text } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import { TextInput, Button } from '~/components/common';
import { saveWeekdayCalories, getWeekdayCalories, WeekdayCalories } from '~/utils/calorieStorage';

const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export default function SetupWeekdays() {
  const { styles } = useStyles(stylesheet);
  const methods = useForm<WeekdayCalories>();
  const router = useRouter();

  useEffect(() => {
    const loadExistingData = async () => {
      try {
        const storedData = await getWeekdayCalories();
        if (storedData) {
          Object.entries(storedData).forEach(([day, calories]) => {
            methods.setValue(day, calories);
          });
        }
      } catch (error) {
        console.error('Error loading existing data:', error);
      }
    };

    loadExistingData();
  }, [methods]);

  const onSubmit = async (data: WeekdayCalories) => {
    try {
      await saveWeekdayCalories(data);
      router.replace('/(tabs)');
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  return (
    <FormProvider {...methods}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.formContainer}>
          {weekdays.map((day, index) => (
            <View key={day} style={styles.inputContainer}>
              <Text style={styles.label}>{day}:</Text>
              <TextInput
                name={day.toLowerCase()}
                placeholder="Enter calorie intake"
                keyboardType="numeric"
                style={styles.input}
                onSubmitEditing={() => {
                  if (index < weekdays.length - 1) {
                    methods.setFocus(weekdays[index + 1].toLowerCase());
                  }
                }}
                returnKeyType={index === weekdays.length - 1 ? 'done' : 'next'}
              />
            </View>
          ))}
          <Button title="Save" onPress={methods.handleSubmit(onSubmit)} style={styles.button} />
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
