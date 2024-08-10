import { useEffect, useRef, useState } from 'react';
import { View, TextInput as RNTextInput } from 'react-native';

import { TextInput, TextInputProps } from '../TextInput';

import { HeightUnit } from '~/data/types';

const ftInToCm = (feet: number | null, inches: number | null) => {
  return ((feet || 0) * 12 + (inches || 0)) * 2.54;
};

type HeightInputProps = {
  value: number;
  setValue: (value: number) => void;
  format: HeightUnit;
  onSubmitEditing: () => void;
};
export const HeightInput = ({ value, setValue, format, onSubmitEditing }: HeightInputProps) => {
  const commonProps: TextInputProps = {
    maxLength: 3,
    keyboardType: 'numeric',
    returnKeyType: 'next',
  };

  // feet inches
  const [feet, setFeet] = useState<number | null>(null);
  const [inches, setInches] = useState<number | null>(null);
  useEffect(() => {
    if (format === HeightUnit.ftIn) setValue(ftInToCm(feet, inches));
  }, [feet, inches]);

  const inchesRef = useRef<RNTextInput>(null);
  if (format === HeightUnit.ftIn) {
    const getStringValueFromNum = (num: any) =>
      typeof num === 'number' && !isNaN(num) ? String(num) : '';
    return (
      <View style={{}}>
        <TextInput
          {...commonProps}
          onSubmitEditing={() => inchesRef.current?.focus()}
          suffix="Ft"
          placeholder="Feet"
          value={getStringValueFromNum(feet)}
          onChangeText={(text) => setFeet(parseInt(text, 10))}
        />
        <TextInput
          {...commonProps}
          ref={inchesRef}
          onSubmitEditing={onSubmitEditing}
          suffix="In"
          placeholder="Inches"
          value={getStringValueFromNum(inches)}
          onChangeText={(text) => setInches(parseInt(text, 10))}
        />
      </View>
    );
  }

  // cm
  return (
    <TextInput
      {...commonProps}
      value={value ? String(value) : ''}
      onChangeText={(text) => setValue(parseInt(text, 10))}
      onSubmitEditing={onSubmitEditing}
      placeholder="Height"
      suffix="cm"
    />
  );
};
