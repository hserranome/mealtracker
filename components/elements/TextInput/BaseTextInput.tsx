import React, { ComponentProps, forwardRef } from 'react';
import { TextInput as RNTextInput, Text, View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

type BaseTextInputProps = ComponentProps<typeof RNTextInput> & {
  suffix?: string | null;
};
export const BaseTextInput = forwardRef<RNTextInput>(
  ({ suffix, ...textInputProps }: BaseTextInputProps, ref) => {
    const { styles, theme } = useStyles(baseInputStyleSheet);
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
    borderWidth: 2,
    borderColor: theme.colors.base800,
    backgroundColor: theme.colors.background,
    color: theme.colors.base800,
    variants: {
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
