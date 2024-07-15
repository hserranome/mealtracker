import { ComponentProps, forwardRef } from 'react';
import { TextInput as RNTextInput, Text, View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

export type TextInputProps = {
  suffix?: string | null;
  containerStyle?: ComponentProps<typeof View>['style'];
} & ComponentProps<typeof RNTextInput>;

export const TextInput = forwardRef<RNTextInput, TextInputProps>(
  ({ suffix, containerStyle, ...props }, ref) => {
    const { styles, theme } = useStyles(stylesheet);
    return (
      <View style={[styles.container, containerStyle]}>
        <RNTextInput
          placeholderTextColor={theme.colors.base600}
          ref={ref}
          style={[styles.input, props.style]}
          {...props}
        />
        {suffix && <Text style={styles.suffix}>{suffix}</Text>}
      </View>
    );
  }
);

const stylesheet = createStyleSheet((theme) => ({
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
