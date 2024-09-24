import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { View, Text } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import { Button, ButtonType } from '~/components/common/Button';

export default function MealScreen() {
  const { meal } = useLocalSearchParams<{ meal: string }>();
  const router = useRouter();
  const { styles } = useStyles(stylesheet);

  const handleAddFood = () => {
    router.push({ pathname: '/food/create', params: { meal } });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{meal}</Text>
      <Button type={ButtonType.Solid} title="Add Food" onPress={handleAddFood} icon="plus-circle" />
    </View>
  );
}

const stylesheet = createStyleSheet((theme) => ({
  container: {
    ...theme.components.container,
  },
  title: {
    ...theme.fonts.heading.m,
    marginBottom: theme.margins[32],
  },
}));
