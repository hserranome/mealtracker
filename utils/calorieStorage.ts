import AsyncStorage from '@react-native-async-storage/async-storage';

const WEEKDAY_CALORIES_KEY = 'weekdayCalories';

export type WeekdayCalories = Record<string, string>;

export const saveWeekdayCalories = async (data: WeekdayCalories): Promise<void> => {
  try {
    await AsyncStorage.setItem(WEEKDAY_CALORIES_KEY, JSON.stringify(data));
    console.log('Weekday calories data saved successfully');
  } catch (error) {
    console.error('Error saving weekday calories data:', error);
    throw error;
  }
};

export const getWeekdayCalories = async (): Promise<WeekdayCalories | null> => {
  try {
    const storedData = await AsyncStorage.getItem(WEEKDAY_CALORIES_KEY);
    if (storedData) {
      return JSON.parse(storedData);
    }
    return null;
  } catch (error) {
    console.error('Error loading weekday calories data:', error);
    throw error;
  }
};

export const getCurrentDayCalories = async (): Promise<string | null> => {
  const weekdayCalories = await getWeekdayCalories();
  if (weekdayCalories) {
    const currentDay = new Date().toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
    return weekdayCalories[currentDay] || null;
  }
  return null;
};
