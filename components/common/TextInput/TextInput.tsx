import { ComponentProps } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import { BaseTextInput } from './BaseTextInput';
import { InputContainer } from '../InputContainer';

type BaseTextInputProps = ComponentProps<typeof BaseTextInput>;
type ControllerProps = ComponentProps<typeof Controller>;
type InputContainerProps = ComponentProps<typeof InputContainer>;

type TextInputProps = {
  name?: ControllerProps['name'];
  label?: InputContainerProps['label'];
  error?: InputContainerProps['error'];
  direction?: InputContainerProps['direction'];
} & BaseTextInputProps;

// @todo: handle inputs other than strings. for example, numbers.
export const TextInput = ({
  name,
  error,
  variant = 'default',
  direction,
  label,
  ...baseTextInputProps
}: TextInputProps) => {
  const formContext = useFormContext();
  const control = formContext?.control;

  return (
    // TODO: randomize name?
    <InputContainer name={name || ''} label={label} direction={direction} error={error}>
      {name ? (
        <Controller
          control={control}
          name={name}
          render={({ field: { onChange, ...field } }) => (
            <BaseTextInput
              {...baseTextInputProps}
              {...field}
              onChangeText={onChange}
              variant={variant}
            />
          )}
        />
      ) : (
        <BaseTextInput {...baseTextInputProps} variant={variant} />
      )}
    </InputContainer>
  );
};
