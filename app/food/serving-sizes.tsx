import { Stack, useRouter } from "expo-router";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { View } from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";

import { Button, TextInput } from "../../components/common";
import type { FoodFormData } from "./_layout";

import type { Food } from "~/data";

type ServingSizesForm = {
	base_serving_size: Food["base_serving_size"];
	base_serving_unit: Food["base_serving_unit"];
	extra_serving_sizes: Food["extra_serving_sizes"];
};

export default function ServingSizes() {
	const { styles, theme } = useStyles(stylesheet);
	const router = useRouter();
	const formContextMethods = useFormContext<FoodFormData>();

	const methods = useForm<ServingSizesForm>({
		defaultValues: {
			base_serving_size: formContextMethods.getValues("base_serving_size"),
			base_serving_unit: formContextMethods.getValues("base_serving_unit"),
			extra_serving_sizes: formContextMethods.getValues("extra_serving_sizes"),
		},
	});

	const submit = methods.handleSubmit((data: ServingSizesForm) => {
		formContextMethods.setValue("base_serving_size", data.base_serving_size);
		formContextMethods.setValue("base_serving_unit", data.base_serving_unit);
		formContextMethods.setValue(
			"extra_serving_sizes",
			data.extra_serving_sizes,
		);
		router.back();
	});

	return (
		<>
			<Stack.Screen
				options={{
					title: "Edit Serving Sizes",
					headerTintColor: theme.colors.foreground,
					headerStyle: {
						backgroundColor: theme.colors.base900,
					},
				}}
			/>
			<View style={styles.container}>
				<FormProvider {...methods}>
					<TextInput
						autoFocus
						name="base_serving_size"
						label="Serving Size"
						placeholder="e.g., 100"
						variant="ghost"
						direction="horizontal"
						type="number"
						keyboardType="numeric"
						rules={{ required: "Serving size is required" }}
						returnKeyType="next"
						onSubmitEditing={() => methods.setFocus("base_serving_unit")}
					/>
					<TextInput
						name="base_serving_unit"
						label="Unit"
						placeholder="e.g., g, ml, oz"
						variant="ghost"
						direction="horizontal"
						returnKeyType="done"
						onSubmitEditing={submit}
					/>
				</FormProvider>
				<View style={styles.button}>
					<Button onPress={submit} title="Save" />
				</View>
			</View>
		</>
	);
}

const stylesheet = createStyleSheet((theme) => ({
	container: {
		flex: 1,
		backgroundColor: theme.colors.background,
	},
	button: {
		marginTop: theme.margins[20],
	},
}));
