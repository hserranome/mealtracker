import { Text, View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

export const NutrimentsRow = () => {
  const { styles } = useStyles(stylesheet);
  return (
    <View style={styles.container}>
      <View style={styles.item}>
        <Text style={styles.value}>0g</Text>
        <Text style={styles.name}>Carbohydrate</Text>
      </View>
      <View style={styles.item}>
        <Text style={styles.value}>0g</Text>
        <Text style={styles.name}>Protein</Text>
      </View>
      <View style={styles.item}>
        <Text style={styles.value}>0g</Text>
        <Text style={styles.name}>Fat</Text>
      </View>
      <View style={styles.item}>
        <Text style={styles.value}>0kcal</Text>
        <Text style={styles.name}>Calories</Text>
      </View>
    </View>
  );
};

const stylesheet = createStyleSheet((theme) => ({
  container: {
    paddingVertical: theme.margins[16],
    paddingHorizontal: theme.margins[16],
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  item: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.margins[4],
  },
  value: {
    ...theme.fonts.heading.xxs,
  },
  name: {
    ...theme.fonts.body.xs,
  },
}));
