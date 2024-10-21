import { observer } from "@legendapp/state/react";
import { Stack, router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { Text, View } from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import { Picker } from "@react-native-picker/picker";

import type { MealScreenParams } from "../..";

import { Button, ButtonType } from "~/components/common/Button";
import { MacrosRow } from "~/components/common/MacrosRow/MacrosRow";
import { BaseTextInput } from "~/components/common/TextInput/BaseTextInput";
import { type MealItem, dairy$, library$ } from "~/data";
import { calculateNutrientValue } from "~/utils/calculateProportionalNutrientValue";

export type SetFoodInMealParams = MealScreenParams & {
	foodId?: string;
	mealItemId?: string;
	defaultValues?: string;
};

export default observer(function AddFoodToMeal() {
	const { styles, theme } = useStyles(stylesheet);

	const { foodId, mealItemId, defaultValues, date, name } =
		useLocalSearchParams<SetFoodInMealParams>();

	const result = dairy$.getMealItem(date, name, mealItemId);
	const mealItem = result?.type === "food" ? result : undefined;

	const food = {
		...library$.getFood(foodId),
		...(mealItem ? mealItem.item : {}),
		...(defaultValues ? JSON.parse(defaultValues) : {}),
	};

	const [quantity, setQuantity] = useState(mealItem?.quantity ?? 100);
	const [servingId, setServingId] = useState(mealItem?.serving?.id ?? "base");

	const handleServingChange = (itemValue: string) => {
		setQuantity(itemValue === "base" ? 100 : 1);
		setServingId(itemValue);
	};

	const servingSizes = [
		{
			id: "base",
			name: food.base_serving_unit,
			quantity: 1,
		},
		...(food.extra_serving_sizes || []),
	];

	const selectedServing =
		servingSizes.find((s) => s.id === servingId) || servingSizes[0];

	const quantityToUse = quantity * selectedServing.quantity;

	const macros = {
		carbohydrates: calculateNutrientValue(
			food.base_nutriments?.carbohydrates,
			quantityToUse,
		),
		proteins: calculateNutrientValue(
			food.base_nutriments?.proteins,
			quantityToUse,
		),
		fat: calculateNutrientValue(food.base_nutriments?.fat, quantityToUse),
		energy_kcal: calculateNutrientValue(
			food.base_nutriments?.energy_kcal,
			quantityToUse,
		),
	};

	const editing = !!mealItemId;

	// Actions
	const handleAdd = () => {
		const mealItem: MealItem = {
			type: "food",
			quantity,
			serving: {
				id: servingId,
				unit: selectedServing.name,
				size: selectedServing.quantity,
			},
			item: food,
		};
		dairy$.setMealItem(date, name, mealItem, mealItemId);
		library$.setFood(food.id, food);
		router.dismissAll();
		router.navigate({
			pathname: "/meal/[date]/[name]",
			params: { date, name },
		});
	};

	const handleEdit = () =>
		router.push({
			pathname: "/food/[id]",
			params: { id: food.id, defaultValues: JSON.stringify(food) },
		});

	return (
		<>
			<Stack.Screen
				options={{
					title: editing ? "Edit Food" : "Add Food",
					headerTintColor: theme.colors.foreground,
					headerShadowVisible: false,
					headerStyle: {
						backgroundColor: theme.colors.base900,
					},
				}}
			/>
			<View style={styles.container}>
				<View style={styles.header}>
					<Text style={styles.foodName}>{food.name}</Text>
					<Text style={styles.brandName}>{food.brands}</Text>
				</View>

				<View style={styles.macrosContainer}>
					<MacrosRow {...macros} />
				</View>

				<View style={styles.quantityContainer}>
					<View style={styles.textInputContainer}>
						<BaseTextInput
							type="number"
							value={quantity.toString()}
							onChangeText={(text) => setQuantity(Number(text))}
							keyboardType="numeric"
							maxLength={6}
							style={styles.quantityInput}
						/>
					</View>
					<View style={styles.pickerContainer}>
						<Picker
							selectedValue={servingId}
							onValueChange={handleServingChange}
							style={styles.picker}
							mode="dropdown"
						>
							{servingSizes.map((serving) => (
								<Picker.Item
									key={serving.id}
									label={
										serving.id === "base"
											? serving.name
											: `${serving.name} (${serving.quantity}${food.base_serving_unit})`
									}
									value={serving.id}
								/>
							))}
						</Picker>
					</View>
				</View>

				<View style={styles.buttonContainer}>
					<View style={styles.button}>
						<Button
							title={editing ? "Update" : "Add"}
							onPress={handleAdd}
							style={{ backgroundColor: theme.colors.pink }}
							textStyle={{ color: theme.colors.foreground }}
						/>
					</View>
					<View style={styles.button}>
						<Button
							title="Edit Food"
							onPress={handleEdit}
							type={ButtonType.Ghost}
							style={{ borderColor: theme.colors.pink }}
							textStyle={{ color: theme.colors.pink }}
						/>
					</View>
				</View>
				{/* TODO: implement nutrition table which shows the nutrition 
        basis (100g) nutriments, and the current quantity nutriments */}
			</View>
		</>
	);
});

const stylesheet = createStyleSheet((theme) => ({
	container: {
		flex: 1,
		backgroundColor: theme.colors.background,
	},
	header: {
		paddingTop: theme.margins[16],
		paddingHorizontal: theme.margins[16],
		marginBottom: theme.margins[16],
	},
	foodName: {
		...theme.fonts.heading.m,
		color: theme.colors.foreground,
	},
	brandName: {
		...theme.fonts.body.m,
		color: theme.colors.base600,
	},
	macrosContainer: {
		paddingTop: theme.margins[6],
		paddingBottom: theme.margins[8],
		marginBottom: theme.margins[16],
		borderTopWidth: 1,
		borderBottomWidth: 1,
		borderColor: theme.colors.base400,
	},
	quantityContainer: {
		flexDirection: "row",
		alignItems: "center",
		marginTop: theme.margins[8],
		paddingHorizontal: theme.margins[16],
		marginBottom: theme.margins[16],
	},
	textInputContainer: {
		maxWidth: "40%",
		flexDirection: "row",
		alignItems: "center",
	},
	quantityInput: {
		flex: 1,
		height: 40,
		color: theme.colors.foreground,
		borderWidth: 1,
		borderColor: theme.colors.pink,
		borderRadius: theme.radius[5],
		marginRight: theme.margins[8],
		paddingHorizontal: theme.margins[10],
		textAlign: "right",
	},
	unitTextContainer: {
		alignItems: "center",
	},
	unitText: {
		...theme.fonts.body.m,
		color: theme.colors.foreground,
	},
	buttonContainer: {
		width: "100%",
		paddingHorizontal: theme.margins[16],
		gap: theme.margins[8],
		flexDirection: "row",
		justifyContent: "space-between",
		marginBottom: theme.margins[24],
	},
	button: {
		flex: 1,
	},
	nutritionContainer: {
		borderTopWidth: 1,
		borderTopColor: theme.colors.base400,
		paddingTop: theme.margins[16],
	},
	nutritionTitle: {
		...theme.fonts.heading.xs,
		color: theme.colors.foreground,
		marginBottom: theme.margins[8],
	},
	nutritionRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginBottom: theme.margins[8],
	},
	nutritionLabel: {
		...theme.fonts.body.m,
		color: theme.colors.base600,
	},
	pickerContainer: {
		flex: 1,
		marginLeft: theme.margins[8],
	},
	picker: {
		color: theme.colors.foreground,
	},
}));
