import { Link } from 'expo-router';
import { useRef } from 'react';
import { TextInput as RNTextInput } from 'react-native';

import { TextInput } from '~/components/elements';
import { Button } from '~/components/elements/Button';
import { useOnboardingData } from '~/components/onboarding/OnboardingDataProvider/OnboardingDataProvider';
import { OnboardingFormStepContainer } from '~/components/onboarding/OnboardingFormStepContainer';
import { OnboardingInputContainer } from '~/components/onboarding/OnboardingInputContainer';
import { useSetOnboardingParams } from '~/components/onboarding/OnboardingParamsProvider';
import { Goal } from '~/data/types';

export default function Measures() {
  useSetOnboardingParams({ title: 'Measures', progress: 75 });

  const { data, updateData } = useOnboardingData();
  const { goal, initialHeight: currentHeight, initialWeight: currentWeight } = data;
  const refWeightInput = useRef<RNTextInput>(null);

  const canNext = currentHeight && currentWeight;

  const nextRoute = goal === Goal.Maintain ? 'finish' : 'objectives';

  return (
    <OnboardingFormStepContainer
      content={
        <>
          <OnboardingInputContainer title="How tall are you?">
            <TextInput
              placeholder="Current height"
              keyboardType="numeric"
              value={currentHeight ? String(currentHeight) : ''}
              onChangeText={(value) => updateData('initialHeight', parseInt(value, 10))}
              suffix="kg"
              maxLength={3}
              onSubmitEditing={() => {
                refWeightInput.current?.focus();
              }}
            />
          </OnboardingInputContainer>
          <OnboardingInputContainer
            title="How much do you weight?"
            subtitle="It's ok to estimate, you can update this later.">
            <TextInput
              placeholder="Initial weight"
              keyboardType="numeric"
              value={currentWeight ? String(currentWeight) : ''}
              onChangeText={(value) => updateData('initialWeight', parseInt(value, 10))}
              suffix="kg"
              maxLength={3}
            />
          </OnboardingInputContainer>
        </>
      }
      footer={
        <Link href={{ pathname: `/onboarding/${nextRoute}` }} asChild>
          <Button title="Next" disabled={!canNext} />
        </Link>
      }
    />
  );
}
