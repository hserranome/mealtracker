import { ComponentProps } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import { BaseTextInput } from './BaseTextInput';
import { InputContainer } from '../InputContainer';

type TextInputProps = ComponentProps<typeof BaseTextInput> &
  Omit<ComponentProps<typeof InputContainer>, 'children' | 'name'> &
  Partial<Pick<ComponentProps<typeof Controller>, 'name'>>;

export const TextInput = ({ name, error, ...textInputProps }: TextInputProps) => {
  const formContext = useFormContext();
  const control = formContext?.control;

  return (
    // TODO: randomize name?
    <InputContainer name={name || ''} error={error}>
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
