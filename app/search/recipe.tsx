import { observer } from "@legendapp/state/react";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import React, { type ComponentProps, useMemo } from "react";
import { useStyles } from "react-native-unistyles";

import type { MealScreenParams } from "../meal/[date]/[name]";

import { SearchScreen } from "~/components/common/SearchScreen";
import { recipes$ } from "~/data";

const RecipeScreen = observer(() => {
	const { theme } = useStyles();
	const router = useRouter();
	const { date, name } = useLocalSearchParams<MealScreenParams>();
	const hasMeal = !!date && !!name;

	// List items
	const recipesList = recipes$.recipes.get();
	const listItems = Object.entries(recipesList)
		.map(([id, item]) => ({
			id,
			name: String(item.name),
			subtitle: `${item.serving_size} ${item.serving_unit}`,
			mainValue: Number(item.nutriments.energy_kcal),
			secondaryValue: Object.keys(item.items).length,
			unit: "ingredients",
		}))
		.sort((a, b) => a.name.localeCompare(b.name));

	// Buttons
	const buttons: ComponentProps<typeof SearchScreen>["buttons"] = useMemo(
		() => [
			{
				icon: "add-circle-outline",
				label: "Create new recipe",
				onPress: () => router.push("/recipe/new"),
			},
		],
		[router],
	);

	// Actions
	const handleGoToSetRecipe: ComponentProps<
		typeof SearchScreen
	>["listActionOnPress"] = hasMeal
		? (item) => {
				router.push({
					pathname: "/meal/[date]/[name]/set/recipe",
					params: { date, name, recipeId: item.id, mealItemId: item.id },
				});
			}
		: undefined;

	const handleGoToEditRecipe: ComponentProps<
		typeof SearchScreen
	>["listActionOnPress"] = (item) => {
		router.push({
			pathname: "/recipe/[id]",
			params: { id: item.id },
		});
	};

	return (
		<>
			<Stack.Screen
				options={{
					title: "",
					headerTintColor: theme.colors.foreground,
					headerStyle: {
						backgroundColor: theme.colors.base900,
					},
				}}
			/>
			<SearchScreen
				buttons={buttons}
				listItems={listItems}
				listTitle="My Recipes"
				listActionIcon={hasMeal ? "add-circle-outline" : undefined}
				listActionOnPress={handleGoToSetRecipe}
				onPressItem={handleGoToEditRecipe}
				accentColor={theme.colors.blue}
			/>
		</>
	);
});

export default RecipeScreen;
