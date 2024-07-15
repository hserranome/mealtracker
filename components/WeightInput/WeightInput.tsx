import { forwardRef } from 'react';
import { TextInput as RNTextInput } from 'react-native';

import { TextInput } from '../TextInput';

import { WeightUnit } from '~/data/types';

type WeightInputProps = {
  value: number;
  setValue: (value: number) => void;
  format: WeightUnit;
};
export const WeightInput = forwardRef<RNTextInput, WeightInputProps>(
  ({ value, setValue, format }, ref) => {
    const handleSetValueInKg = (value: number) => {
      return setValue(format === WeightUnit.lb ? value / 2.205 : value);
    };
    const formattedValue = format === WeightUnit.lb ? value * 2.205 : value;
    return (
      <TextInput
        ref={ref}
        placeholder="Weight"
        value={value ? String(formattedValue) : ''}
        onChangeText={(text) => handleSetValueInKg(parseInt(text, 10))}
        maxLength={3}
        keyboardType="numeric"
        suffix={String(format)}
      />
    );
  }
);
