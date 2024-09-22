import { Text, View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import { Button } from '~/components/common';

export default function Start() {
  const { styles } = useStyles(stylesheet);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hello</Text>
      <Text style={styles.subtitle}>Let's set up your calorie intake.</Text>
      <Button style={styles.button} title="Ok :3" />
    </View>
  );
}

const stylesheet = createStyleSheet((theme) => ({
  container: {
    flex: 1,
  },
  title: {
    ...theme.fonts.heading.xl,
    marginTop: '50%',
    textAlign: 'center',
    color: theme.colors.base800,
  },
  subtitle: {
    ...theme.fonts.heading.xs,
    marginTop: theme.margins[24],
    textAlign: 'center',
  },
  button: {
    marginTop: theme.margins[8],
    marginHorizontal: '10%',
    alignSelf: 'center',
    paddingHorizontal: '10%',
  },
}));
