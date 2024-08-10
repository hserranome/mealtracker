import { Link } from 'expo-router';

import { Button } from '~/components/Button';
import { OnboardingContentContainer } from '~/components/OnboardingContentContainer';
import { useOnboardingInput } from '~/components/OnboardingDataProvider';
import { OnboardingInputContainer } from '~/components/OnboardingInputContainer';
import { useSetOnboardingParams } from '~/components/OnboardingParamsProvider';
import { OnboardingStepContainer } from '~/components/OnboardingStepContainer';
import { RadioOption } from '~/components/RadioOption';
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
  const { currentValue, setValue } = useOnboardingInput('goal');
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
              onPress={() => setValue(value)}
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
