import { Link } from 'expo-router';
import { useCallback, useMemo } from 'react';

import { Button } from '~/components/common/Button';
import { RadioOption } from '~/components/common/RadioOption';
import { TextInput } from '~/components/common/TextInput';
import { useOnboardingData } from '~/components/onboarding/OnboardingDataProvider/OnboardingDataProvider';
import { OnboardingFormStepContainer } from '~/components/onboarding/OnboardingFormStepContainer';
import { OnboardingInputContainer } from '~/components/onboarding/OnboardingInputContainer';
import { useSetOnboardingParams } from '~/components/onboarding/OnboardingParamsProvider';
import { Sex } from '~/data/types';

const sexOptions = [
  {
    value: Sex.Male,
    label: 'Male',
  },
  {
    value: Sex.Female,
    label: 'Female',
  },
];

export default function Goals() {
  const { data, updateData } = useOnboardingData();
  const selectedGender = data.sex;
  const birthYear = data.birthYear;

  useSetOnboardingParams({ title: 'About you', progress: 45 });

  const currentYear = new Date().getFullYear();

  const handleChangeAge = useCallback(
    (text: string) => {
      const valuesAsNumber = Number(text.replace(/[^0-9]/g, ''));
      if (isNaN(valuesAsNumber)) return;
      const valueWithConstrains = Math.min(Math.max(valuesAsNumber, 0), 99);
      const birthYearFromAge = currentYear - valueWithConstrains;
      updateData('birthYear', birthYearFromAge);
    },
    [currentYear, updateData]
  );

  const ageFromBirthYear = useMemo(
    () => (birthYear ? currentYear - birthYear : null),
    [birthYear, currentYear]
  );
  const safeAgeString = ageFromBirthYear ? String(ageFromBirthYear) : '';

  const canNext = selectedGender !== undefined && ageFromBirthYear;

  return (
    <OnboardingFormStepContainer
      content={
        <>
          <OnboardingInputContainer
            title="What sex should we use?"
            subtitle="Please select which sex we should use to calculate your calorie needs.">
            {sexOptions.map(({ value, label }) => (
              <RadioOption
                key={value}
                subtitle={label}
                onPress={() => updateData('sex', value)}
                selected={selectedGender === value}
              />
            ))}
          </OnboardingInputContainer>
          <OnboardingInputContainer
            title="How old are you?"
            subtitle="We use this to calculate an accurate calorie goal.">
            <TextInput
              placeholder="Age"
              keyboardType="numeric"
              value={safeAgeString}
              onChangeText={handleChangeAge}
            />
          </OnboardingInputContainer>
        </>
      }
      footer={
        <Link href={{ pathname: '/onboarding/measures' }} asChild>
          <Button title="Next" disabled={!canNext} />
        </Link>
      }
    />
  );
}
