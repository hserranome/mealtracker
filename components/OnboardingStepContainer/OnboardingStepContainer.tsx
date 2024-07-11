import { View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

export const OnboardingStepContainer = ({ children }: { children: React.ReactNode }) => {
  const { styles } = useStyles(stylesheet);
  return <View style={styles.onboardingStepContainer}>{children}</View>;
};

const stylesheet = createStyleSheet((theme) => ({
  onboardingStepContainer: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: theme.margins[12],
    paddingBottom: theme.margins[64],
  },
}));
