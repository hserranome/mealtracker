import { forwardRef } from 'react';
import { Text, TouchableNativeFeedbackProps, View } from 'react-native';
import { TouchableNativeFeedback } from 'react-native-gesture-handler';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

export enum ButtonType {
  Solid = 'solid',
  Outline = 'outline',
  Light = 'light',
  Ghost = 'ghost',
}

type ButtonProps = {
  title?: string;
  disabled?: boolean;
  type?: ButtonType;
} & TouchableNativeFeedbackProps;

export const Button = forwardRef<TouchableNativeFeedback, ButtonProps>(
  ({ title, disabled, type = ButtonType.Solid, ...touchableProps }, ref) => {
    const { styles, theme } = useStyles(stylesheet, {
      disabled: disabled ? type : undefined,
      type,
    });

    return (
      <View style={styles.container}>
        <TouchableNativeFeedback
          ref={ref}
          disabled={disabled}
          background={TouchableNativeFeedback.Ripple(theme.colors.base600, false)}
          {...touchableProps}>
          <View style={[styles.button, touchableProps.style]}>
            <Text style={styles.buttonText}>{title}</Text>
          </View>
        </TouchableNativeFeedback>
      </View>
    );
  }
);

const stylesheet = createStyleSheet((theme) => ({
  container: {
    borderRadius: theme.radius[6],
    overflow: 'hidden',
    variants: {
      type: {
        [ButtonType.Solid]: {},
        [ButtonType.Outline]: {},
        [ButtonType.Light]: {},
        [ButtonType.Ghost]: {},
      },
      disabled: {
        [ButtonType.Solid]: {},
        [ButtonType.Outline]: {
          borderColor: theme.colors.base400,
        },
        [ButtonType.Light]: {},
        [ButtonType.Ghost]: {},
      },
    },
  },
  button: {
    paddingVertical: theme.margins[12],
    backgroundColor: theme.colors.base800,
    variants: {
      type: {
        [ButtonType.Solid]: {
          backgroundColor: theme.colors.base800,
        },
        [ButtonType.Outline]: {
          backgroundColor: theme.colors.background,
          borderWidth: 2,
          borderColor: theme.colors.base800,
          borderStyle: 'solid',
          paddingVertical: theme.margins[12] - 2,
        },
        [ButtonType.Light]: {
          backgroundColor: theme.colors.background,
        },
        [ButtonType.Ghost]: {
          backgroundColor: 'transparent',
        },
      },
      disabled: {
        [ButtonType.Solid]: {
          backgroundColor: theme.colors.base600,
        },
        [ButtonType.Outline]: {
          backgroundColor: theme.colors.base200,
        },
        [ButtonType.Light]: {
          backgroundColor: theme.colors.base200,
        },
        [ButtonType.Ghost]: {
          backgroundColor: 'transparent',
        },
      },
    },
  },
  buttonText: {
    textAlign: 'center',
    color: theme.colors.background,
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '800',
    variants: {
      type: {
        [ButtonType.Solid]: {
          color: theme.colors.background,
        },
        [ButtonType.Outline]: {
          color: theme.colors.base800,
        },
        [ButtonType.Light]: {
          color: theme.colors.base800,
        },
        [ButtonType.Ghost]: {
          color: theme.colors.base800,
        },
      },
      disabled: {
        [ButtonType.Solid]: {
          color: theme.colors.base200,
        },
        [ButtonType.Outline]: {
          color: theme.colors.base400,
        },
        [ButtonType.Light]: {
          color: theme.colors.base400,
        },
        [ButtonType.Ghost]: {
          color: theme.colors.base400,
        },
      },
    },
  },
}));