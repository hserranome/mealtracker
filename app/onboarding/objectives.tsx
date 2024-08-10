import { Link } from 'expo-router';

import { Button } from '~/components/Button';
import { OnboardingContentContainer } from '~/components/OnboardingContentContainer';
import { useOnboardingInput } from '~/components/OnboardingDataProvider';
import { OnboardingInputContainer } from '~/components/OnboardingInputContainer';
import { useSetOnboardingParams } from '~/components/OnboardingParamsProvider';
import { OnboardingStepContainer } from '~/components/OnboardingStepContainer';
import { RadioOption } from '~/components/RadioOption';
import { TextInput } from '~/components/TextInput';

// @todo lose/gain label, and kg/lb units
// could be manual, or use enums
const options = [
  {
    value: 0.25,
    label: 'Lose 0.25 kg per week',
  },
  {
    value: 0.5,
    label: 'Lose 0.5 kg per week',
  },
  {
    value: 0.75,
    label: 'Lose 0.75 kg per week (recommended)',
  },
  {
    value: 1,
    label: 'Lose 1 kg per week',
  },
];

export default function Objectives() {
  useSetOnboardingParams({ title: 'Weekly goal', progress: 90 });

  const { currentValue: goalWeight, setValue: setGoalWeight } = useOnboardingInput('goalWeight');
  const { currentValue: weightVarianceRate, setValue: setWeightVarianceRate } =
    useOnboardingInput('weightVarianceRate');

  return (
    <OnboardingFormStepContainer
      content={
        <>
          <OnboardingInputContainer
            title="What's your goal weight? "
            subtitle="Don't worry. This doesn't affect your daily calorie goal and you can always change it later. ">
            <TextInput
              placeholder="Goal weight"
              keyboardType="numeric"
              value={goalWeight ? String(goalWeight) : ''}
              onChangeText={(text) => setGoalWeight(parseInt(text, 10))}
              suffix="kg"
              maxLength={3}
            />
          </OnboardingInputContainer>
          <OnboardingInputContainer title="What's your weekly goal?">
            {options.map(({ value, label }) => (
              <RadioOption
                key={value}
                subtitle={label}
                onPress={() => setWeightVarianceRate(value)}
                selected={weightVarianceRate === value}
              />
            ))}
          </OnboardingInputContainer>
        </>
      }
      footer={
        <Link href={{ pathname: '/onboarding/finish' }} asChild>
          <Button title="Next" />
        </Link>
      }
    />
  );
}
