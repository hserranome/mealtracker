import { ComponentProps, forwardRef } from 'react';
import { TextInput as RNTextInput, Text, View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

export type TextInputProps = {
  suffix?: string | null;
} & ComponentProps<typeof RNTextInput>;

export const TextInput = forwardRef<RNTextInput, TextInputProps>(({ suffix, ...props }, ref) => {
  const { styles } = useStyles(stylesheet);
  return (
    <View style={styles.container}>
      <RNTextInput ref={ref} style={[styles.input, props.style]} {...props} />
      {suffix && <Text style={styles.suffix}>{suffix}</Text>}
    </View>
  );
});

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
    borderColor: theme.colors.base400,
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
