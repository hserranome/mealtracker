import { Ionicons } from "@expo/vector-icons";
import { observer } from "@legendapp/state/react";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useMemo, useState } from "react";
import { FormProvider, useFormContext } from "react-hook-form";
import { TouchableOpacity, View } from "react-native";
import { useStyles } from "react-native-unistyles";

import { RecipeForm } from "~/components/recipes/RecipeForm";
import { type Recipe, recipes$ } from "~/data";
import { capitalize } from "~/utils/capitalize";
import { createUUID } from "~/utils/createUUID";

export default observer(function RecipePage() {
	const router = useRouter();
	const { theme } = useStyles();
	const { id } = useLocalSearchParams<{ id: string }>();
	const form = useFormContext<Recipe>();
	const [initialized, setInitialized] = useState(false);

	const isNewRecipe = id === "new";

	const recipe = useMemo(() => {
		return recipes$.getRecipe(id);
	}, [id]);

	useEffect(() => {
		if (!initialized && recipe) {
			form.reset(recipe);
			setInitialized(true);
		}
	}, [recipe, form, initialized]);

	const onSubmit = (data: Recipe) => {
		try {
			const recipeId = data.id ?? (isNewRecipe ? createUUID() : id);
			recipes$.setRecipe({
				...data,
				id: recipeId,
				name: capitalize(data.name.trim()),
			});
			recipes$.calculateRecipeNutriments(recipeId);
			router.back();
		} catch (error) {
			console.error(error);
		}
	};

	const handleDelete = () => {
		recipes$.deleteRecipe(id);
		router.back();
	};

	return (
		<FormProvider {...form}>
			<Stack.Screen
				options={{
					title: isNewRecipe ? "New recipe" : "Edit recipe",
					headerTintColor: theme.colors.foreground,
					headerStyle: {
						backgroundColor: theme.colors.base900,
					},
					headerRight: isNewRecipe
						? undefined
						: () => (
								<TouchableOpacity onPress={handleDelete}>
									<Ionicons
										name="trash-outline"
										size={24}
										color={theme.colors.foreground}
									/>
								</TouchableOpacity>
							),
				}}
			/>
			<View style={{ flex: 1, backgroundColor: theme.colors.background }}>
				<RecipeForm
					form={form}
					onSubmit={onSubmit}
					submitButtonText={isNewRecipe ? "Save" : "Update"}
				/>
			</View>
		</FormProvider>
	);
});
