import { useContext } from 'react';
import { Text } from 'react-native';

import { Button } from '~/components/Button';
import { OnboardingDataContext } from '~/components/OnboardingDataProvider';
import { useSetOnboardingParams } from '~/components/OnboardingParamsProvider';
import { OnboardingStepContainer } from '~/components/OnboardingStepContainer';

export default function Finish() {
  useSetOnboardingParams({ title: 'All set!', progress: null });
  const { submit, submitting } = useContext(OnboardingDataContext);

  return (
    <OnboardingStepContainer>
      <Text>Finish</Text>
      <Button onPress={submit} title="Submit" disabled={submitting} />
    </OnboardingStepContainer>
  );
}
