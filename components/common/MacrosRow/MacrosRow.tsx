import { View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import { MacroItem } from '../MacroItem';

type MacrosRowProps = {
  carbohydrate: number;
  protein: number;
  fat: number;
  calories: number;
};
export const MacrosRow = ({ carbohydrate, protein, fat, calories }: MacrosRowProps) => {
  const { styles, theme } = useStyles(stylesheet);
  return (
    <View style={styles.macroContainer}>
      <MacroItem label="Carbohydrate" value={`${carbohydrate}g`} color={theme.colors.red} />
      <MacroItem label="Protein" value={`${protein}g`} color={theme.colors.blue} />
      <MacroItem label="Fat" value={`${fat}g`} color={theme.colors.green} />
      <MacroItem label="Calories" value={`${calories}cal`} color={theme.colors.orange} />
    </View>
  );
};

const stylesheet = createStyleSheet((theme) => ({
  macroContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: theme.margins[24],
    paddingVertical: theme.margins[4],
  },
  item: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.margins[4],
  },
}));
