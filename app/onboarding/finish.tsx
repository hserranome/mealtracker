import { useContext } from 'react';
import { Text } from 'react-native';

import { Button } from '~/components/elements/Button';
import { OnboardingDataContext } from '~/components/onboarding/OnboardingDataProvider';
import { OnboardingFormStepContainer } from '~/components/onboarding/OnboardingFormStepContainer';
import { useSetOnboardingParams } from '~/components/onboarding/OnboardingParamsProvider';

export default function Finish() {
  useSetOnboardingParams({ title: 'All set!', progress: null });
  const { submit, submitting } = useContext(OnboardingDataContext);

  return (
    <OnboardingFormStepContainer
      content={<Text>Finish</Text>}
      footer={<Button onPress={submit} title="Submit" disabled={submitting} />}
    />
  );
}
