import { Link } from 'expo-router';
import { useContext, useRef } from 'react';
import { TextInput as RNTextInput } from 'react-native';

import { Button } from '~/components/Button';
import { OnboardingContentContainer } from '~/components/OnboardingContentContainer';
import { OnboardingDataContext, useOnboardingInput } from '~/components/OnboardingDataProvider';
import { OnboardingInputContainer } from '~/components/OnboardingInputContainer';
import { useSetOnboardingParams } from '~/components/OnboardingParamsProvider';
import { OnboardingStepContainer } from '~/components/OnboardingStepContainer';
import { TextInput } from '~/components/TextInput';
import { Goal } from '~/data/types';

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
    <OnboardingStepContainer>
      <OnboardingContentContainer>
        <OnboardingInputContainer title="How tall are you?">
          <TextInput
            placeholder="Height"
            value={currentHeight ? String(currentHeight) : ''}
            onChangeText={(text) => setHeight(parseInt(text, 10))}
            maxLength={3}
            keyboardType="numeric"
            suffix={heightUnit ? String(heightUnit) : null}
            returnKeyType="next"
            onSubmitEditing={() => {
              refWeightInput.current?.focus();
            }}
          />
        </OnboardingInputContainer>
        <OnboardingInputContainer
          title="How much do you weight?"
          subtitle="It's ok to estimate, you can update this later.">
          <TextInput
            ref={refWeightInput}
            placeholder="Weight"
            value={currentWeight ? String(currentWeight) : ''}
            onChangeText={(text) => setWeight(parseInt(text, 10))}
            maxLength={3}
            keyboardType="numeric"
            suffix={weightUnit ? String(weightUnit) : null}
          />
        </OnboardingInputContainer>
      </OnboardingContentContainer>
      <Link href={{ pathname: `/onboarding/${nextRoute}` }} asChild>
        <Button title="Next" disabled={!canNext} />
      </Link>
    </OnboardingStepContainer>
  );
}
