import {
	type FC,
	type PropsWithChildren,
	createContext,
	useCallback,
	useContext,
	useReducer,
	useState,
} from "react";

import type { ActivityLevel, Goal, Sex } from "~/data";

export type OnboardingData = {
	goal?: Goal;
	activityLevel?: ActivityLevel;
	sex?: Sex;
	birthYear?: number;
	initialHeight?: number;
	initialWeight?: number;
	goalWeight?: number;
	weightVarianceRate?: number;
};

type OnboardingAction =
	| {
			type: "UPDATE_DATA";
			key: keyof OnboardingData;
			value: OnboardingData[keyof OnboardingData];
	  }
	| { type: "RESET" };

const onboardingDataReducer = (
	state: OnboardingData,
	action: OnboardingAction,
): OnboardingData => {
	switch (action.type) {
		case "UPDATE_DATA":
			return { ...state, [action.key]: action.value };
		case "RESET":
			return {};
		default:
			return state;
	}
};

type OnboardingDataProviderValue = {
	data: OnboardingData;
	updateData: <K extends keyof OnboardingData>(
		key: K,
		value: OnboardingData[K],
	) => void;
	submit: () => void;
	submitting: boolean;
	reset: () => void;
};

export const OnboardingDataContext = createContext<OnboardingDataProviderValue>(
	{
		data: {},
		updateData: () => {},
		submit: async () => {
			return undefined;
		},
		submitting: false,
		reset: () => {},
	},
);

export const OnboardingDataProvider: FC<PropsWithChildren> = ({ children }) => {
	const [data, dispatch] = useReducer(onboardingDataReducer, {});
	const [submitting, setSubmitting] = useState(false);

	const updateData = useCallback(
		<K extends keyof OnboardingData>(key: K, value: OnboardingData[K]) => {
			dispatch({ type: "UPDATE_DATA", key, value });
		},
		[],
	);

	const reset = useCallback(() => {
		dispatch({ type: "RESET" });
	}, []);

	const submit = useCallback(async () => {
		setSubmitting(true);
		try {
		} finally {
			setSubmitting(false);
		}
	}, []);

	return (
		<OnboardingDataContext.Provider
			value={{
				data,
				updateData,
				submit,
				submitting,
				reset,
			}}
		>
			{children}
		</OnboardingDataContext.Provider>
	);
};

export const useOnboardingData = () => {
	const context = useContext(OnboardingDataContext);
	if (context === undefined) {
		throw new Error(
			"useOnboardingData must be used within an OnboardingDataProvider",
		);
	}
	return context;
};
