import { observer } from "@legendapp/state/react";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useMemo, useState } from "react";
import { ScrollView, View } from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";

import { Button, InputContainer, TextInput } from "~/components/common";
import { MacrosRow } from "~/components/common/MacrosRow";
import { dairy$, recipes$, type Recipe } from "~/data";
import { calculateNutriments } from "~/utils/calculateNutriments";

type SetRecipeInMealParams = {
	date: string;
	name: string;
	recipeId: string;
	mealItemId?: string;
};

export default observer(function SetRecipeInMeal() {
	const router = useRouter();
	const { styles, theme } = useStyles(stylesheet);
	const { date, name, recipeId, mealItemId } =
		useLocalSearchParams<SetRecipeInMealParams>();

	const [quantity, setQuantity] = useState("1");
	const [servingSize, setServingSize] = useState("");
	const [servingUnit, setServingUnit] = useState("");

	const recipe = useMemo(() => recipes$.getRecipe(recipeId), [recipeId]);
	const mealItem = useMemo(
		() => (mealItemId ? dairy$.getMealItem(date, name, mealItemId) : undefined),
		[date, mealItemId, name],
	);

	useEffect(() => {
		if (recipe) {
			setServingSize(String(recipe.serving_size));
			setServingUnit(recipe.serving_unit);
		}
		if (mealItem && mealItem.type === "recipe") {
			setQuantity(String(mealItem.quantity));
		}
	}, [mealItem, recipe]);

	const calculatedNutriments = useMemo(() => {
		if (!recipe)
			return {
				carbohydrates: 0,
				proteins: 0,
				fat: 0,
				energy_kcal: 0,
			};
		return calculateNutriments(recipe.nutriments, Number(quantity));
	}, [quantity, recipe]);

	const handleSave = () => {
		if (!recipe) return;

		const newMealItem = {
			type: "recipe" as const,
			item: recipe,
			quantity: Number(quantity),
			serving: {
				size: Number(servingSize),
				unit: servingUnit,
			},
			nutriments: calculatedNutriments,
		};

		dairy$.setMealItem(date, name, newMealItem, mealItemId);
		router.back();
	};

	if (!recipe) return null;

	return (
		<>
			<Stack.Screen
				options={{
					title: recipe.name,
					headerTintColor: theme.colors.foreground,
					headerStyle: {
						backgroundColor: theme.colors.base900,
					},
				}}
			/>
			<ScrollView style={styles.container}>
				<InputContainer direction="horizontal" label="Quantity">
					<TextInput
						value={quantity}
						onChangeText={setQuantity}
						keyboardType="numeric"
						style={styles.quantityInput}
					/>
					<TextInput
						value={servingUnit}
						onChangeText={setServingUnit}
						style={styles.unitInput}
					/>
				</InputContainer>
				<InputContainer label="Nutrition Facts">
					<MacrosRow {...calculatedNutriments} />
				</InputContainer>
				<View style={styles.buttonContainer}>
					<Button onPress={handleSave} title="Save" />
				</View>
			</ScrollView>
		</>
	);
});

const stylesheet = createStyleSheet((theme) => ({
	container: {
		flex: 1,
		backgroundColor: theme.colors.background,
	},
	quantityInput: {
		flex: 1,
		marginRight: theme.margins[8],
	},
	unitInput: {
		flex: 2,
	},
	buttonContainer: {
		marginTop: theme.margins[24],
		paddingHorizontal: theme.margins[16],
	},
}));
