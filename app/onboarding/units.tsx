import { Link } from 'expo-router';

import { Button } from '~/components/Button';
import { OnboardingContentContainer } from '~/components/OnboardingContentContainer';
import { useOnboardingInput } from '~/components/OnboardingDataProvider';
import { OnboardingInputContainer } from '~/components/OnboardingInputContainer';
import { useSetOnboardingParams } from '~/components/OnboardingParamsProvider';
import { OnboardingStepContainer } from '~/components/OnboardingStepContainer';
import { RadioOption } from '~/components/RadioOption';
import { HeightUnit, WeightUnit } from '~/data/types';

const heightOptions = [
  {
    value: HeightUnit.cm,
    label: 'Centimeters (cm)',
  },
  {
    value: HeightUnit.ftIn,
    label: 'Feet and inches',
  },
];

const weightOptions = [
  {
    value: WeightUnit.kg,
    label: 'Kilograms (kg)',
  },
  {
    value: WeightUnit.lb,
    label: 'Pounds (lb)',
  },
];

export default function UnitsAndFormats() {
  const { currentValue: selectedHeightUnit, setValue: setSelectedHeightUnit } =
    useOnboardingInput('heightUnit');
  const { currentValue: selectedWeightUnit, setValue: setSelectedWeightUnit } =
    useOnboardingInput('weightUnit');

  useSetOnboardingParams({ title: 'Units', progress: 60 });

  const canNext = selectedHeightUnit && selectedWeightUnit;

  return (
    <OnboardingStepContainer>
      <OnboardingContentContainer>
        <OnboardingInputContainer
          title="Preferred height unit"
          subtitle="Used only for measuring your height.">
          {heightOptions.map(({ value, label }) => (
            <RadioOption
              key={value}
              subtitle={label}
              onPress={() => setSelectedHeightUnit(value)}
              selected={selectedHeightUnit === value}
            />
          ))}
        </OnboardingInputContainer>
        <OnboardingInputContainer
          title="Preferred weight unit"
          subtitle="Used only for measuring your weight and food measures.">
          {weightOptions.map(({ value, label }) => (
            <RadioOption
              key={value}
              subtitle={label}
              onPress={() => setSelectedWeightUnit(value)}
              selected={selectedWeightUnit === value}
            />
          ))}
        </OnboardingInputContainer>
      </OnboardingContentContainer>
      <Link href={{ pathname: '/onboarding/measures' }} asChild>
        <Button title="Next" disabled={!canNext} />
      </Link>
    </OnboardingStepContainer>
  );
}
