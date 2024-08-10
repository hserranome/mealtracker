import { View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

type OnboardingFormStepContainerProps = {
  content: React.ReactNode;
  footer: React.ReactNode;
};

export const OnboardingFormStepContainer = ({ content, footer }: OnboardingFormStepContainerProps) => {
  const { styles } = useStyles(stylesheet);
  return (
    <View style={styles.container}>
      <View style={styles.content}>{content}</View>
      <View style={styles.footer}>{footer}</View>
    </View>
  );
};

const stylesheet = createStyleSheet((theme) => ({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: theme.margins[12],
    paddingBottom: theme.margins[64],
  },
  content: {
    flex: 1,
  },
  footer: {
    paddingTop: theme.margins[20],
  },
}));
