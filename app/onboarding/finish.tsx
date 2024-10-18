import { Text } from "react-native";

import { Button } from "~/components/common/Button";
import { useOnboardingData } from "~/components/onboarding/OnboardingDataProvider/OnboardingDataProvider";
import { OnboardingFormStepContainer } from "~/components/onboarding/OnboardingFormStepContainer";
import { useSetOnboardingParams } from "~/components/onboarding/OnboardingParamsProvider";

export default function Finish() {
	useSetOnboardingParams({ title: "All set!", progress: null });
	const { submit, submitting } = useOnboardingData();

	return (
		<OnboardingFormStepContainer
			content={<Text>Finish</Text>}
			footer={<Button onPress={submit} title="Submit" disabled={submitting} />}
		/>
	);
}
