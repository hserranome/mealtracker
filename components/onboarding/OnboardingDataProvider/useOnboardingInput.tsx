import { useContext } from "react";

import {
	type OnboardingData,
	OnboardingDataContext,
} from "./OnboardingDataProvider";

export function useOnboardingInput<Key extends keyof OnboardingData>(key: Key) {
	const { data, setData } = useContext(OnboardingDataContext);

	type Value = OnboardingData[Key] | undefined;

	const currentValue: Value = data?.[key];
	const setValue = (newValue: Value) => setData({ ...data, [key]: newValue });

	return {
		currentValue,
		setValue,
	} as const;
}
