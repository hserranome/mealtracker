import React, { ComponentProps, forwardRef } from 'react';
import { TextInput as RNTextInput, Text, View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

type BaseTextInputProps = {
  suffix?: string | null;
  variant?: 'default' | 'ghost';
} & ComponentProps<typeof RNTextInput>;

export const BaseTextInput = forwardRef<RNTextInput, BaseTextInputProps>(
  // TODO: fix as any on variant
  ({ suffix, variant = 'default' as any, ...textInputProps }, ref) => {
    const { styles, theme } = useStyles(baseInputStyleSheet, { variant });
    return (
      <View style={styles.container}>
        <RNTextInput
          placeholderTextColor={theme.colors.base600}
          style={styles.input}
          {...textInputProps}
          ref={ref}
        />
        {suffix && <Text style={styles.suffix}>{suffix}</Text>}
      </View>
    );
  }
);

const baseInputStyleSheet = createStyleSheet((theme) => ({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    padding: theme.margins[10],
    borderRadius: theme.radius[5],
    backgroundColor: theme.colors.background,
    color: theme.colors.base800,
    variants: {
      variant: {
        default: {
          borderWidth: 2,
          borderColor: theme.colors.base800,
        },
        ghost: {
          borderWidth: 0,
        },
      },
      selected: {
        true: {
          borderColor: theme.colors.blue,
        },
      },
    },
  },
  suffix: {
    position: 'absolute',
    right: theme.margins[10],
    color: theme.colors.base600,
  },
}));
