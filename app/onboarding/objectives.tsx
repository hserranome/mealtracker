import { Link } from 'expo-router';

import { Button } from '~/components/common/Button';
import { RadioOption } from '~/components/common/RadioOption';
import { TextInput } from '~/components/common/TextInput';
import { useOnboardingData } from '~/components/onboarding/OnboardingDataProvider/OnboardingDataProvider';
import { OnboardingFormStepContainer } from '~/components/onboarding/OnboardingFormStepContainer';
import { OnboardingInputContainer } from '~/components/onboarding/OnboardingInputContainer';
import { useSetOnboardingParams } from '~/components/onboarding/OnboardingParamsProvider';

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

  const { data, updateData } = useOnboardingData();
  const { goalWeight, weightVarianceRate } = data;

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
              onChangeText={(text) => updateData('goalWeight', parseInt(text, 10))}
              suffix="kg"
              maxLength={3}
            />
          </OnboardingInputContainer>
          <OnboardingInputContainer title="What's your weekly goal?">
            {options.map(({ value, label }) => (
              <RadioOption
                key={value}
                subtitle={label}
                onPress={() => updateData('weightVarianceRate', value)}
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
