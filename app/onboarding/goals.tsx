import { Link } from 'expo-router';

import { Button } from '~/components/elements/Button';
import { RadioOption } from '~/components/elements/RadioOption';
import { useOnboardingData } from '~/components/onboarding/OnboardingDataProvider/OnboardingDataProvider';
import { OnboardingFormStepContainer } from '~/components/onboarding/OnboardingFormStepContainer';
import { OnboardingInputContainer } from '~/components/onboarding/OnboardingInputContainer';
import { useSetOnboardingParams } from '~/components/onboarding/OnboardingParamsProvider';
import { Goal } from '~/data/types';

const options = [
  {
    value: Goal.Lose,
    label: 'Lose weight',
    description: 'Caloric deficit',
  },
  {
    value: Goal.Maintain,
    label: 'Maintain weight',
    description: 'Maintain calorie intake',
  },
  {
    value: Goal.Gain,
    label: 'Gain weight',
    description: 'Caloric surplus',
  },
];

export default function Goals() {
  useSetOnboardingParams({ title: 'Goals', progress: 15 });
  const { data, updateData } = useOnboardingData();
  const currentValue = data.goal;
  const canNext = currentValue !== undefined;

  return (
    <OnboardingFormStepContainer
      content={
        <OnboardingInputContainer
          title="Let's start with goals."
          subtitle="Do you want to lose, maintain, or gain weight?">
          {options.map(({ value, label, description }) => (
            <RadioOption
              key={value}
              title={label}
              subtitle={description}
              onPress={() => updateData('goal', value)}
              selected={currentValue === value}
            />
          ))}
        </OnboardingInputContainer>
      }
      footer={
        <Link href={{ pathname: '/onboarding/activity' }} asChild>
          <Button title="Next" disabled={!canNext} />
        </Link>
      }
    />
  );
}
