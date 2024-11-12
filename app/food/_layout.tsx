import { Stack } from "expo-router/stack";
import { FormProvider, useForm } from "react-hook-form";

import type { Food } from "~/data";

export type FoodFormData = Food;

export default function Layout() {
	const methods = useForm<FoodFormData>({
		defaultValues: {
			base_serving_size: 100,
			base_serving_unit: "g",
		},
	});

	return (
		<FormProvider {...methods}>
			<Stack />
		</FormProvider>
	);
}
