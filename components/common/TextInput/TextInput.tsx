import { ComponentProps } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import { BaseTextInput } from './BaseTextInput';
import { InputContainer } from '../InputContainer';

type BaseTextInputProps = ComponentProps<typeof BaseTextInput>;
type ControllerProps = ComponentProps<typeof Controller>;
type InputContainerProps = ComponentProps<typeof InputContainer>;

type TextInputProps = {
  name?: ControllerProps['name'];
  rules?: ControllerProps['rules'];
  label?: InputContainerProps['label'];
  direction?: InputContainerProps['direction'];
} & BaseTextInputProps;

// @todo: handle inputs other than strings. for example, numbers.
export const TextInput = ({
  name,
  rules,
  variant = 'default',
  direction,
  label,
  ...baseTextInputProps
}: TextInputProps) => {
  const formContext = useFormContext();
  const control = formContext?.control;

  return (
    <>
      {name ? (
        <Controller
          control={control}
          name={name}
          rules={rules}
          render={({ field: { onChange, ...field }, fieldState: { error } }) => (
            <InputContainer name={name} label={label} direction={direction} error={error?.message}>
              <BaseTextInput
                {...baseTextInputProps}
                {...field}
                onChangeText={onChange}
                variant={variant}
              />
            </InputContainer>
          )}
        />
      ) : (
        <InputContainer name={name || ''} label={label} direction={direction}>
          <BaseTextInput {...baseTextInputProps} variant={variant} />
        </InputContainer>
      )}
    </>
  );
};
