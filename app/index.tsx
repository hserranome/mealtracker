import { Text, View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

export default function Start() {
  const { styles, theme } = useStyles(stylesheet);

  return (
    <View style={styles.container}>
      <Text style={[theme.fonts.heading.xl, styles.title]}>Hello</Text>
    </View>
  );
}

const stylesheet = createStyleSheet((theme) => ({
  container: {
    flex: 1,
  },
  title: {
    marginTop: '40%',
    textAlign: 'center',
    color: theme.colors.base800,
  },
}));
