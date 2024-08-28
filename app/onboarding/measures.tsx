import { Link } from 'expo-router';
import { useContext, useRef } from 'react';
import { TextInput as RNTextInput } from 'react-native';

import { Button } from '~/components/elements/Button';
import { HeightInput } from '~/components/elements/HeightInput';
import { WeightInput } from '~/components/elements/WeightInput';
import { useOnboardingData } from '~/components/onboarding/OnboardingDataProvider/OnboardingDataProvider';
import { OnboardingFormStepContainer } from '~/components/onboarding/OnboardingFormStepContainer';
import { OnboardingInputContainer } from '~/components/onboarding/OnboardingInputContainer';
import { useSetOnboardingParams } from '~/components/onboarding/OnboardingParamsProvider';
import { Goal, LengthUnit, WeightUnit } from '~/data/types';

export default function Measures() {
  useSetOnboardingParams({ title: 'Measures', progress: 75 });

  const { data, updateData } = useOnboardingData();
  const { weightUnit, heightUnit, goal, initialHeight: currentHeight, initialWeight: currentWeight } = data;
  const refWeightInput = useRef<RNTextInput>(null);

  const canNext = currentHeight && currentWeight;

  const nextRoute = goal === Goal.Maintain ? 'finish' : 'objectives';

  return (
    <OnboardingFormStepContainer
      content={
        <>
          <OnboardingInputContainer title="How tall are you?">
            <HeightInput
              value={currentHeight || 0}
              setValue={(value) => updateData('initialHeight', value)}
              format={heightUnit || LengthUnit.cm}
              onSubmitEditing={() => {
                refWeightInput.current?.focus();
              }}
            />
          </OnboardingInputContainer>
          <OnboardingInputContainer
            title="How much do you weight?"
            subtitle="It's ok to estimate, you can update this later.">
            <WeightInput
              value={currentWeight || 0}
              setValue={(value) => updateData('initialWeight', value)}
              format={weightUnit || WeightUnit.kg}
              ref={refWeightInput}
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
