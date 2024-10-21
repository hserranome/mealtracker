import { Stack, useRouter } from "expo-router";
import {
	FormProvider,
	useForm,
	useFormContext,
	useFieldArray,
} from "react-hook-form";
import { View, TouchableOpacity, Text } from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";

import { Button, ButtonType, TextInput } from "../../components/common";
import type { FoodFormData } from "./_layout";

import type { Food } from "~/data";
import { createUUID } from "~/utils/createUUID";

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
			extra_serving_sizes:
				formContextMethods.getValues("extra_serving_sizes") || [],
		},
	});

	const { fields, append, remove } = useFieldArray({
		control: methods.control,
		name: "extra_serving_sizes",
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

	const addExtraServingSize = () => {
		if (fields.length < 10) append({ id: createUUID(), name: "", quantity: 0 });
	};

	const commonProps = {
		variant: "ghost" as const,
		direction: "horizontal" as const,
		textAlign: "right" as const,
	};

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
			<View style={styles.wrapper}>
				<FormProvider {...methods}>
					<View style={styles.container}>
						<TextInput
							{...commonProps}
							autoFocus
							name="base_serving_size"
							label="Base Serving Size"
							placeholder="e.g., 100"
							type="number"
							keyboardType="numeric"
							rules={{ required: "Serving size is required" }}
							returnKeyType="next"
							onSubmitEditing={() => methods.setFocus("base_serving_unit")}
						/>
						<TextInput
							{...commonProps}
							name="base_serving_unit"
							label="Base Unit"
							placeholder="e.g., g, ml, oz"
							returnKeyType="done"
						/>
					</View>

					<Text style={styles.sectionTitle}>Other serving sizes</Text>

					<View style={styles.container}>
						{fields.map((field, index) => (
							<View key={field.id} style={styles.extraServingSize}>
								<TextInput
									{...commonProps}
									name={`extra_serving_sizes.${index}.name`}
									label="Name"
									placeholder="e.g., Tablespoon"
									returnKeyType="next"
									onSubmitEditing={() =>
										methods.setFocus(`extra_serving_sizes.${index}.quantity`)
									}
								/>
								<TextInput
									{...commonProps}
									name={`extra_serving_sizes.${index}.quantity`}
									label="Quantity"
									placeholder="e.g., 30"
									type="number"
									keyboardType="numeric"
									suffix={formContextMethods.getValues("base_serving_unit")}
								/>
								<TouchableOpacity
									onPress={() => remove(index)}
									style={styles.removeButton}
								>
									<Text style={styles.removeButtonText}>Remove</Text>
								</TouchableOpacity>
							</View>
						))}
						{fields.length < 10 && (
							<View style={styles.addButtonContainer}>
								<Button
									type={ButtonType.Ghost}
									title="Add serving size"
									icon="add-circle-outline"
									textStyle={styles.addButtonText}
									onPress={addExtraServingSize}
								/>
							</View>
						)}
						<View style={styles.button}>
							<Button onPress={submit} title="Save" />
						</View>
					</View>
				</FormProvider>
			</View>
		</>
	);
}

const stylesheet = createStyleSheet((theme) => ({
	wrapper: {
		flex: 1,
		backgroundColor: theme.colors.background,
	},
	container: {
		paddingHorizontal: theme.margins[8],
	},
	sectionTitle: {
		...theme.fonts.heading.xxs,
		backgroundColor: theme.colors.base900,
		color: theme.colors.foreground,
		paddingHorizontal: theme.margins[8],
		paddingVertical: theme.margins[6],
	},
	extraServingSize: {
		marginBottom: theme.margins[16],
	},
	removeButton: {
		alignSelf: "flex-end",
		marginTop: theme.margins[4],
	},
	removeButtonText: {
		color: theme.colors.red,
		...theme.fonts.body.m,
	},
	addButtonContainer: {
		justifyContent: "center",
	},
	addButtonText: {
		color: theme.colors.pink,
		...theme.fonts.body.m,
		fontWeight: "bold",
	},
	button: {
		marginTop: theme.margins[20],
	},
}));
