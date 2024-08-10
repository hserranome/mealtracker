import { Link } from 'expo-router';

import { Button } from '~/components/Button';
import { useOnboardingInput } from '~/components/onboarding/OnboardingDataProvider';
import { OnboardingInputContainer } from '~/components/onboarding/OnboardingInputContainer';
import { useSetOnboardingParams } from '~/components/onboarding/OnboardingParamsProvider';
import { OnboardingFormStepContainer } from '~/components/onboarding/OnboardingFormStepContainer';
import { RadioOption } from '~/components/RadioOption';
import { TextInput } from '~/components/TextInput';
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
  const { currentValue: selectedGender, setValue: setSelectedGender } = useOnboardingInput('sex');
  const { currentValue: birthYear, setValue: setBirthYear } = useOnboardingInput('birthYear');

  useSetOnboardingParams({ title: 'About you', progress: 45 });

  const currentYear = new Date().getFullYear();

  const handleChangeAge = (text: string) => {
    const valuesAsNumber = Number(text.replace(/[^0-9]/g, ''));
    if (isNaN(valuesAsNumber)) return;
    const valueWithConstrains = Math.min(Math.max(valuesAsNumber, 0), 99);
    const birthYearFromAge = currentYear - valueWithConstrains;
    setBirthYear(birthYearFromAge);
  };

  const ageFromBirthYear = birthYear ? currentYear - birthYear : null;
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
                onPress={() => setSelectedGender(value)}
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
        <Link href={{ pathname: '/onboarding/units' }} asChild>
          <Button title="Next" disabled={!canNext} />
        </Link>
      }
    />
  );
}
