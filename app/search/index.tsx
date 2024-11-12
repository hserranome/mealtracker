import { observer } from "@legendapp/state/react";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import React, { type ComponentProps, useMemo } from "react";
import { useStyles } from "react-native-unistyles";

import type { MealScreenParams } from "../meal/[date]/[name]";

import type { ListItemType } from "~/components/common/ListItem";
import { SearchScreen } from "~/components/common/SearchScreen";
import { food$ } from "~/data";

const SearchAllScreen = observer(() => {
	const { theme } = useStyles();
	const router = useRouter();

	// Meal
	const { date, name } = useLocalSearchParams<MealScreenParams>();
	const hasMeal = !!date && !!name;

	// List items
	const recentFoodItems = food$.foods.get();
	const listItems: ListItemType[] = Object.values(recentFoodItems ?? {})
		.map((item) => ({
			id: String(item.id),
			name: String(item.name),
			subtitle: item.brands ? String(item.brands) : undefined,
			mainValue: Number(item.base_nutriments.energy_kcal),
			secondaryValue: Number(item.base_serving_size),
			unit: String(item.base_serving_unit),
		}))
		.reverse();

	// Buttons
	const buttons: ComponentProps<typeof SearchScreen>["buttons"] = [
		{
			icon: "barcode-outline",
			label: "Scan barcode",
			onPress: () => {
				router.push({
					pathname: "/meal/[date]/[name]/scanner",
					params: { date, name },
				});
			},
		},
		{
			icon: "add-circle-outline",
			label: "Quick add",
			onPress: () =>
				router.push({
					pathname: "/meal/[date]/[name]/set/quick-add",
					params: { date, name },
				}),
		},
		{
			icon: "nutrition-outline",
			label: "My food",
			onPress: () =>
				router.push({
					pathname: "/search/food",
					params: { date, name },
				}),
		},
		{
			icon: "restaurant-outline",
			label: "My recipes",
			onPress: () =>
				router.push({
					pathname: "/search/recipe",
					params: { date, name },
				}),
		},
	];

	// Actions
	const handleGoToSetFood: ComponentProps<
		typeof SearchScreen
	>["listActionOnPress"] = hasMeal
		? (item) => {
				router.push({
					pathname: "/meal/[date]/[name]/set/food",
					params: { date, name, foodId: item.id },
				});
			}
		: undefined;

	const handleGoToEditItem: ComponentProps<typeof SearchScreen>["onPressItem"] =
		(item) => {
			router.push({
				pathname: "/food/[id]",
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
				listTitle="Recent Foods"
				listActionIcon={hasMeal ? "add-circle-outline" : undefined}
				listActionOnPress={handleGoToSetFood}
				onPressItem={handleGoToEditItem}
				accentColor={theme.colors.pink}
			/>
		</>
	);
});

export default SearchAllScreen;
