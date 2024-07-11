import { Text, View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

type OnboardingInputContainerProps = {
  title?: string;
  subtitle?: string;
  children?: React.ReactNode;
};

export const OnboardingInputContainer = ({
  title,
  subtitle,
  children,
}: OnboardingInputContainerProps) => {
  const { styles, theme } = useStyles(stylesheet);
  return (
    <View>
      {title && <Text style={[theme.fonts.heading.xs, styles.title]}>{title}</Text>}
      {subtitle && <Text style={[theme.fonts.body.m, styles.subtitle]}>{subtitle}</Text>}
      {children && (
        <View style={{ gap: theme.margins[10], paddingVertical: theme.margins[12] }}>
          {children}
        </View>
      )}
    </View>
  );
};

const stylesheet = createStyleSheet((theme) => ({
  title: {
    color: theme.colors.base800,
  },
  subtitle: {
    color: theme.colors.base800,
  },
}));
