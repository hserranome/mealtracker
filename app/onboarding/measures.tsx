import { useContext, useRef } from 'react';
import { TextInput as RNTextInput } from 'react-native';

import { Button } from '~/components/elements/Button';
import { HeightInput } from '~/components/elements/HeightInput';
import { OnboardingDataContext, useOnboardingInput } from '~/components/onboarding/OnboardingDataProvider';
import { OnboardingInputContainer } from '~/components/onboarding/OnboardingInputContainer';
import { useSetOnboardingParams } from '~/components/onboarding/OnboardingParamsProvider';
import { OnboardingFormStepContainer } from '~/components/onboarding/OnboardingFormStepContainer';
import { WeightInput } from '~/components/elements/WeightInput';
import { Goal, HeightUnit, WeightUnit } from '~/data/types';

export default function Measures() {
  useSetOnboardingParams({ title: 'Measures', progress: 75 });

  const {
    data: { weightUnit, heightUnit, goal },
  } = useContext(OnboardingDataContext);
  const { currentValue: currentHeight, setValue: setHeight } = useOnboardingInput('initialHeight');
  const { currentValue: currentWeight, setValue: setWeight } = useOnboardingInput('initialWeight');
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
              setValue={setHeight}
              format={heightUnit || HeightUnit.cm}
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
              setValue={setWeight}
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
