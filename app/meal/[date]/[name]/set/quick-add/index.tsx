import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { FormProvider, useForm } from "react-hook-form";
import { View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { createStyleSheet, useStyles } from "react-native-unistyles";

import type { MealScreenParams } from "../..";

import { Button, TextInput } from "~/components/common";
import { type MealItem, type QuickAdd, dairy$ } from "~/data";
import { useEffect, useMemo } from "react";

// Add this new type definition
type NutritionField = {
	name: "energy_kcal" | "fat" | "carbohydrates" | "proteins";
	label: string;
	color?: string;
	required?: boolean;
};

export type SetQuickAddInMealParams = MealScreenParams & {
	mealItemId?: string;
};

export default function QuickAddScreen() {
	const router = useRouter();
	const { date, name, mealItemId } =
		useLocalSearchParams<SetQuickAddInMealParams>();
	const { styles, theme } = useStyles(stylesheet);

	const form = useForm<QuickAdd>();

	const result = dairy$.getMealItem(date, name, mealItemId);
	const mealItem = result?.type === "quick_add" ? result : undefined;

	const quickAdd = useMemo(() => mealItem ? mealItem.item : {
		description: '',
		nutriments: {
			energy_kcal: 0,
			fat: 0,
			carbohydrates: 0,
			proteins: 0,
			},
		},
		[mealItem],
	);

	const editing = !!mealItemId;

	useEffect(() => {
		form.setValue("description", quickAdd.description);
		form.setValue("nutriments", quickAdd.nutriments);
	}, [quickAdd, form.setValue]);

	const submit = form.handleSubmit((data) => {
		const mealItem: MealItem = {
			type: "quick_add",
			nutriments: data.nutriments,
			item: {
				description: data.description ?? "",
				nutriments: data.nutriments,
			},
		};
		dairy$.setMealItem(date, name, mealItem, mealItemId);
		router.dismissAll();
		router.navigate({
			pathname: "/meal/[date]/[name]",
			params: { date, name },
		});
	});

	const fields: NutritionField[] = [
		{
			name: "energy_kcal",
			label: "Calories (kcal)",
			color: theme.colors.orange,
			required: true,
		},
		{ name: "fat", label: "Fat (g)", color: theme.colors.green },
		{
			name: "proteins",
			label: "Proteins (g)",
			color: theme.colors.blue,
		},
		{
			name: "carbohydrates",
			label: "Carbohydrates (g)",
			color: theme.colors.red,
		},
	];

	const hasErrors = Object.keys(form.formState.errors).length > 0;

	return (
		<>
			<Stack.Screen
				options={{
					title: "Quick Add",
					headerTintColor: theme.colors.foreground,
					headerShadowVisible: false,
					headerStyle: {
						backgroundColor: theme.colors.base900,
					},
				}}
			/>
			<KeyboardAwareScrollView style={styles.container}>
				<FormProvider {...form}>
					<TextInput
						name="description"
						label="Description"
						{...commonProps}
						{...requiredProps}
						autoFocus
						type="string"
						keyboardType="default"
						blurOnSubmit={false}
						onSubmitEditing={() => form.setFocus("nutriments.energy_kcal")}
					/>
					{fields.map((field, index) => (
						<TextInput
							key={field.name}
							name={`nutriments.${field.name}`}
							label={field.label}
							labelStyle={{
								...(field.color && { ...boldLabelStyles, color: field.color }),
							}}
							{...commonProps}
							{...(field.required ? requiredProps : {})}
							onSubmitEditing={() => {
								const nextField = fields[index + 1];
								if (nextField) form.setFocus(`nutriments.${nextField.name}`);
							}}
							returnKeyType={index === fields.length - 1 ? "done" : "next"}
							blurOnSubmit={index === fields.length - 1}
						/>
					))}
					<View style={styles.button}>
						<Button onPress={submit} title={editing ? "Update" : "Add"} disabled={hasErrors} />
					</View>
				</FormProvider>
			</KeyboardAwareScrollView>
		</>
	);
}

const stylesheet = createStyleSheet((theme) => ({
	container: {
		flex: 1,
		backgroundColor: theme.colors.background,
	},

	button: {
		paddingVertical: theme.margins[10],
		marginTop: theme.margins[20],
		paddingHorizontal: theme.margins[18],
	},
}));

const commonProps = {
	variant: "ghost" as const,
	direction: "horizontal" as const,
	expand: false,
	textAlign: "right" as const,
	returnKeyType: "next" as const,
	blurOnSubmit: false,
	keyboardType: "numeric" as const,
	type: "number" as const,
	placeholder: "Optional",
};

const requiredProps = {
	placeholder: "Required",
	rules: { required: true },
} as const;

const boldLabelStyles = {
	fontWeight: "bold",
} as const;
