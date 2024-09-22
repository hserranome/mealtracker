import { Link } from 'expo-router';

import { Button } from '~/components/common/Button';
import { RadioOption } from '~/components/common/RadioOption';
import { useOnboardingData } from '~/components/onboarding/OnboardingDataProvider/OnboardingDataProvider';
import { OnboardingFormStepContainer } from '~/components/onboarding/OnboardingFormStepContainer';
import { OnboardingInputContainer } from '~/components/onboarding/OnboardingInputContainer';
import { useSetOnboardingParams } from '~/components/onboarding/OnboardingParamsProvider';
import { ActivityLevel } from '~/data/types';

const options = [
  {
    value: ActivityLevel.Sedentary,
    label: 'Not very active',
    description: 'Mostly sedentary (exercise less than 1-3 times a week).',
  },
  {
    value: ActivityLevel.Light,
    label: 'Lightly active',
    description: 'Light exercise 1-3 times a week.',
  },
  {
    value: ActivityLevel.Moderate,
    label: 'Moderately active',
    description: 'Moderate exercise 3-5 times a week.',
  },
  {
    value: ActivityLevel.Active,
    label: 'Active',
    description: 'Moderate exercise 5-6 times a week.',
  },
  {
    value: ActivityLevel.Heavy,
    label: 'Very active',
    description: 'Intensive exercise 6-7 times a week.',
  },
];

export default function Goals() {
  useSetOnboardingParams({ title: 'Activity Level', progress: 30 });
  const { data, updateData } = useOnboardingData();
  const currentValue = data.activityLevel;
  const canNext = currentValue !== undefined;

  return (
    <OnboardingFormStepContainer
      content={
        <OnboardingInputContainer
          title="What's your baseline activity level?"
          subtitle="Based on your activity level, Meal Tracker can estimate the amount of energy you burn each day.">
          {options.map(({ value, label, description }) => (
            <RadioOption
              key={value}
              title={label}
              subtitle={description}
              onPress={() => updateData('activityLevel', value)}
              selected={currentValue === value}
            />
          ))}
        </OnboardingInputContainer>
      }
      footer={
        <Link href={{ pathname: '/onboarding/about' }} asChild>
          <Button title="Next" disabled={!canNext} />
        </Link>
      }
    />
  );
}
