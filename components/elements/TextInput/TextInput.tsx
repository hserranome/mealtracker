import { ComponentProps } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import { BaseTextInput } from './BaseTextInput';
import { InputContainer } from '../InputContainer';

type TextInputProps = ComponentProps<typeof BaseTextInput> &
  Omit<ComponentProps<typeof InputContainer>, 'children'> &
  Pick<ComponentProps<typeof Controller>, 'name'>;

export const TextInput = ({ name, error, ...textInputProps }: TextInputProps) => {
  const { control } = useFormContext();

  return (
    <InputContainer name={name} error={error}>
      {name ? (
        <Controller
          control={control}
          name={name}
          render={({ field: { onChange, ...field } }) => (
            <BaseTextInput {...textInputProps} {...field} onChangeText={onChange} />
          )}
        />
      ) : (
        <BaseTextInput {...textInputProps} />
      )}
    </InputContainer>
  );
};
