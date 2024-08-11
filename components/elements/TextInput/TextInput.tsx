import { ComponentProps } from 'react';
import { Controller, ControllerRenderProps, useFormContext } from 'react-hook-form';
import { TextInput as RNTextInput, Text, View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

export type TextInputProps = {
  suffix?: string | null;
  containerStyle?: ComponentProps<typeof View>['style'];
  name?: string;
} & ComponentProps<typeof RNTextInput>;

export const TextInput = ({ suffix, containerStyle, name, ...props }: TextInputProps) => {
  const { control } = useFormContext();
  const { styles, theme } = useStyles(stylesheet);

  const renderInput = (field: ControllerRenderProps | RNTextInput['props']) => (
    <View style={[styles.container, containerStyle]} key={name}>
      <RNTextInput
        placeholderTextColor={theme.colors.base600}
        style={[styles.input, props.style]}
        {...props}
        {...field}
      />
      {suffix && <Text style={styles.suffix}>{suffix}</Text>}
    </View>
  );

  return name ? (
    <Controller control={control} name={name} render={({ field }) => renderInput(field)} />
  ) : (
    renderInput(props)
  );
};

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
