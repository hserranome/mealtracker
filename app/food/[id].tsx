import { Ionicons } from "@expo/vector-icons";
import { observer } from "@legendapp/state/react";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useMemo, useState } from "react";
import { FormProvider, useFormContext } from "react-hook-form";
import { TouchableOpacity } from "react-native";
import { useStyles } from "react-native-unistyles";

import { FoodForm } from "~/components/common/FoodForm";
import { type Food, library$ } from "~/data";
import { capitalize } from "~/utils/capitalize";
import { createUUID } from "~/utils/createUUID";

export default observer(function FoodPage() {
	const router = useRouter();
	const { theme } = useStyles();
	const { id, values } = useLocalSearchParams<{
		id: string;
		values?: string;
	}>();
	const form = useFormContext<Food>();
	const [initialized, setInitialized] = useState(false);

	const isNewFood = id === "new";

	const food = useMemo(() => {
		return {
			...library$.getFood(id),
			...(values ? JSON.parse(values) : {}),
		};
	}, [id, values]);

	useEffect(() => {
		if (!initialized) {
			form.reset(food);
			setInitialized(true);
		}
	}, [food, form, initialized]);

	const onSubmit = (data: Food) => {
		try {
			const foodId = data.id ?? (isNewFood ? createUUID() : id);
			library$.setFood(foodId, {
				...data,
				id: foodId,
				name: capitalize(data.name.trim()),
				brands: data.brands ? capitalize(data.brands.trim()) : undefined,
			});
			router.back();
		} catch (error) {
			console.error(error);
		}
	};

	const handleDelete = () => {
		library$.deleteFood(id);
		router.back();
	};

	return (
		<FormProvider {...form}>
			<Stack.Screen
				options={{
					title: isNewFood ? "New food" : "Edit food",
					headerTintColor: theme.colors.foreground,
					headerStyle: {
						backgroundColor: theme.colors.base900,
					},
					headerRight: isNewFood
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
			<FoodForm
				form={form}
				onSubmit={onSubmit}
				submitButtonText={isNewFood ? "Next" : "Save"}
			/>
		</FormProvider>
	);
});
