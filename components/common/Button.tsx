import FeatherIcon from '@expo/vector-icons/Feather';
import { ComponentProps, forwardRef } from 'react';
import { Text, TouchableNativeFeedbackProps, View } from 'react-native';
import { TouchableNativeFeedback } from 'react-native-gesture-handler';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import { useDebounce } from '~/utils/useDebounce';

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
  icon?: ComponentProps<typeof FeatherIcon>['name'];
} & TouchableNativeFeedbackProps;

export const Button = forwardRef<TouchableNativeFeedback, ButtonProps>(
  ({ title, disabled, type = ButtonType.Solid, icon, onPress, ...touchableProps }, ref) => {
    const { styles, theme } = useStyles(stylesheet, {
      disabled: disabled ? type : undefined,
      type,
      hasTitle: !!title,
    });

    const { debounce } = useDebounce();

    return (
      <View style={styles.container}>
        <TouchableNativeFeedback
          ref={ref}
          disabled={disabled}
          background={TouchableNativeFeedback.Ripple(theme.colors.base600, false)}
          {...touchableProps}
          onPress={onPress ? () => debounce(onPress) : undefined}>
          <View style={[styles.button, touchableProps.style]}>
            {icon && (
              <FeatherIcon
                name={icon}
                size={24}
                color={styles.buttonText.color}
                style={styles.icon}
              />
            )}
            {title && <Text style={styles.buttonText}>{title}</Text>}
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
    borderRadius: theme.radius[6],
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'baseline',
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
  icon: {
    variants: {
      hasTitle: {
        true: {
          marginRight: theme.margins[8],
        },
        false: {},
      },
    },
  },
}));
