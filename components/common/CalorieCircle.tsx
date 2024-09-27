import React from 'react';
import { View, Text } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

type CalorieCircleProps = {
  totalCalories: number;
  calorieGoal: number;
};

const RADIUS = 84;
const STROKE = 12;
const SIZE = RADIUS * 2 + STROKE;
const POSITION = SIZE / 2;

export const CalorieCircle: React.FC<CalorieCircleProps> = ({ totalCalories, calorieGoal }) => {
  const { styles, theme } = useStyles(stylesheet);
  const percentageFilled = (totalCalories / calorieGoal) * 100;

  return (
    <View style={styles.calorieCircleContainer}>
      <Svg height={SIZE} width={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`}>
        <Circle
          cx={POSITION}
          cy={POSITION}
          r={RADIUS}
          stroke={theme.colors.base200}
          strokeWidth={STROKE}
          fill="none"
        />
        <Circle
          cx={POSITION}
          cy={POSITION}
          r={RADIUS}
          stroke={theme.colors.blue}
          strokeWidth={STROKE}
          fill="none"
          strokeDasharray={`${2 * Math.PI * RADIUS}`}
          strokeDashoffset={`${2 * Math.PI * RADIUS * (1 - percentageFilled / 100)}`}
          strokeLinecap="round"
        />
      </Svg>
      <View style={styles.calorieTextContainer}>
        <Text style={styles.calorieText}>{totalCalories}</Text>
        <Text style={styles.kcalText}>kcal</Text>
      </View>
    </View>
  );
};

const stylesheet = createStyleSheet((theme) => ({
  calorieCircleContainer: {
    width: SIZE,
    height: SIZE,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: theme.margins[24],
  },
  calorieTextContainer: {
    position: 'absolute',
    alignItems: 'center',
  },
  calorieText: {
    ...theme.fonts.heading.m,
    color: theme.colors.foreground,
  },
  kcalText: {
    ...theme.fonts.heading.xs,
    color: theme.colors.foreground,
  },
}));
