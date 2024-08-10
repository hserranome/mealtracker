import { Link, Stack } from 'expo-router';
import { Text } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import { Container } from '~/components/elements/Container';

export default function NotFoundScreen() {
  const { styles } = useStyles(stylesheet);

  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <Container>
        <Text style={styles.title}>This screen doesn't exist.</Text>
        <Link href="/" style={styles.link}>
          <Text style={styles.linkText}>Go to home screen!</Text>
        </Link>
      </Container>
    </>
  );
}

const stylesheet = createStyleSheet((theme) => ({
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.colors.base800,
  },
  link: {
    marginTop: theme.margins[16],
    paddingVertical: theme.margins[16],
  },
  linkText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: theme.colors.blue,
  },
}));
