import { Stack } from "expo-router/stack";
import { FormProvider, useForm } from "react-hook-form";

import type { Recipe } from "~/data";

export type RecipeFormData = Recipe;

export default function Layout() {
	const methods = useForm<RecipeFormData>({
		defaultValues: {
			serving_size: 1,
			serving_unit: "serving",
			items: {},
			nutriments: {
				energy_kcal: 0,
				fat: 0,
				carbohydrates: 0,
				proteins: 0,
			},
		},
	});

	return (
		<FormProvider {...methods}>
			<Stack />
		</FormProvider>
	);
}
