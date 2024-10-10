import { ComponentProps, forwardRef } from 'react';
import { StyleProp, Text, TextStyle } from 'react-native';
import { TouchableNativeFeedback } from 'react-native-gesture-handler';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

type RadioOptionProps = {
  title?: string;
  subtitle?: string;
  selected?: boolean;
  subtitleStyle?: StyleProp<TextStyle>;
} & ComponentProps<typeof TouchableNativeFeedback>;

export const RadioOption = forwardRef<TouchableNativeFeedback, RadioOptionProps>(
  ({ title, subtitle, selected = false, subtitleStyle, ...touchableProps }, ref) => {
    const { theme, styles } = useStyles(stylesheet, {
      selected,
    });

    return (
      <TouchableNativeFeedback
        ref={ref}
        {...touchableProps}
        style={[styles.touchable, touchableProps.style]}>
        {title && <Text style={[theme.fonts.heading.xxs, styles.text]}>{title}</Text>}
        {subtitle && (
          <Text style={[theme.fonts.body.m, styles.text, subtitleStyle]}>{subtitle}</Text>
        )}
      </TouchableNativeFeedback>
    );
  }
);

const stylesheet = createStyleSheet((theme) => ({
  touchable: {
    padding: theme.margins[10],
    borderRadius: theme.radius[5],
    borderWidth: 2,
    borderColor: theme.colors.base400,
    variants: {
      selected: {
        true: {
          borderColor: theme.colors.blue,
        },
      },
    },
  },
  text: {
    color: theme.colors.base800,
    variants: {
      selected: {
        true: {
          color: theme.colors.blue,
        },
      },
    },
  },
}));
