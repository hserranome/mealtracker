import { View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

export const OnboardingContentContainer = ({ children }: { children: React.ReactNode }) => {
  const { styles } = useStyles(stylesheet);
  return <View style={styles.container}>{children}</View>;
};

const stylesheet = createStyleSheet((theme) => ({
  container: {
    marginTop: theme.margins[48],
    flexDirection: 'column',
    gap: theme.margins[20],
  },
}));
