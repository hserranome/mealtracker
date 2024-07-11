import { Text, View } from 'react-native';
import { useStyles } from 'react-native-unistyles';

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
  const { theme } = useStyles();
  return (
    <View>
      {title && <Text style={theme.fonts.heading.xs}>{title}</Text>}
      {subtitle && <Text style={theme.fonts.body.m}>{subtitle}</Text>}
      {children && (
        <View style={{ gap: theme.margins[10], paddingVertical: theme.margins[12] }}>
          {children}
        </View>
      )}
    </View>
  );
};
