import { useIsFocused } from "@react-navigation/native";
import { useContext, useEffect } from "react";

import { OnboardingParamsContext } from "./OnboardingParamsProvider";

type setOnboardingScreenParams = {
	title: string | null;
	progress: number | null;
};
export const useSetOnboardingParams = ({
	title,
	progress,
}: setOnboardingScreenParams) => {
	const { setScreenParams } = useContext(OnboardingParamsContext);
	const isFocused = useIsFocused();

	useEffect(() => {
		if (isFocused) {
			setScreenParams({ title, progress });
		}
	}, [title, progress, isFocused, setScreenParams]);
};
