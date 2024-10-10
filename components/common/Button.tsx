import { Ionicons } from '@expo/vector-icons';
import { ComponentProps, forwardRef } from 'react';
import { StyleProp, Text, View, ViewStyle } from 'react-native';
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
  icon?: ComponentProps<typeof Ionicons>['name'];
  iconPosition?: 'left' | 'right';
  debounceRate?: number;
  justify?: 'center' | 'left' | 'right';
  style?: StyleProp<ViewStyle>;
} & ComponentProps<typeof TouchableNativeFeedback>;

export const Button = forwardRef<TouchableNativeFeedback, ButtonProps>(
  (
    {
      title,
      disabled,
      type = ButtonType.Solid,
      icon,
      iconPosition = 'left',
      onPress,
      style,
      debounceRate,
      justify = 'center',
      ...touchableProps
    },
    ref
  ) => {
    const { styles, theme } = useStyles(stylesheet, {
      disabled: disabled ? type : undefined,
      type,
      hasTitle: !!title,
      iconPosition,
      justify,
    });

    const iconElement = icon && (
      <Ionicons name={icon} size={24} color={styles.buttonText.color} style={styles.icon} />
    );

    return (
      <View style={styles.wrapper}>
        <TouchableNativeFeedback
          ref={ref}
          disabled={disabled}
          background={TouchableNativeFeedback.Ripple(theme.colors.base600, false)}
          {...touchableProps}
          style={[styles.container, style]}
          onPress={onPress ? onPress : undefined}>
          <View style={styles.buttonContent}>
            {iconPosition === 'left' && iconElement}
            {title && <Text style={styles.buttonText}>{title}</Text>}
            {iconPosition === 'right' && iconElement}
          </View>
        </TouchableNativeFeedback>
      </View>
    );
  }
);

const stylesheet = createStyleSheet((theme) => ({
  wrapper: {
    overflow: 'hidden',
    borderRadius: theme.radius[6],
  },
  container: {
    borderRadius: theme.radius[6],
    paddingVertical: theme.margins[12],
    paddingHorizontal: theme.margins[12],
    flexDirection: 'row',
    overflow: 'hidden',
    alignItems: 'center',
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
      justify: {
        center: {
          justifyContent: 'center',
        },
        left: {
          justifyContent: 'flex-start',
        },
        right: {
          justifyContent: 'flex-end',
        },
      },
    },
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: theme.colors.background,
    fontSize: 16,
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
      justify: {
        center: {
          textAlign: 'center',
        },
        left: {
          textAlign: 'left',
        },
        right: {
          textAlign: 'right',
        },
      },
    },
  },
  icon: {
    variants: {
      iconPosition: {
        left: {
          marginRight: theme.margins[8],
        },
        right: {
          marginLeft: theme.margins[8],
        },
      },
      hasTitle: {
        false: {
          marginRight: 0,
          marginLeft: 0,
        },
      },
    },
  },
}));
