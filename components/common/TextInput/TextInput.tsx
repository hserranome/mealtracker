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
  labelStyle?: InputContainerProps['labelStyle'];
  type?: 'string' | 'number';
} & BaseTextInputProps;

export const TextInput = ({
  name,
  rules,
  variant,
  direction,
  label,
  labelStyle,
  type = 'string',
  ...baseTextInputProps
}: TextInputProps) => {
  const formContext = useFormContext();
  const control = formContext ? formContext.control : undefined;

  const handleChange = (onChange: (value: any) => void) => (value: string) => {
    if (type === 'number') {
      const numValue = parseFloat(value);
      onChange(isNaN(numValue) ? null : numValue);
    } else {
      onChange(value);
    }
  };

  return (
    <>
      {name ? (
        <Controller
          control={control}
          name={name}
          rules={rules}
          render={({ field: { onChange, value, ...field }, fieldState: { error } }) => (
            <InputContainer
              key={name}
              label={label}
              direction={direction}
              labelStyle={labelStyle}
              error={error ? error.message : undefined}>
              <BaseTextInput
                {...baseTextInputProps}
                {...field}
                value={value ? value.toString() : ''}
                onChangeText={handleChange(onChange)}
                variant={variant}
                type={type}
              />
            </InputContainer>
          )}
        />
      ) : (
        <InputContainer label={label} direction={direction}>
          <BaseTextInput {...baseTextInputProps} variant={variant} type={type} />
        </InputContainer>
      )}
    </>
  );
};
