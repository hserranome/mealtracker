import { useRouter } from "expo-router";
import { View, Text, TouchableOpacity } from "react-native";
import { useFieldArray, useFormContext } from "react-hook-form";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import { Ionicons } from "@expo/vector-icons";

import { Button, ButtonType } from "~/components/common";
import type { Recipe } from "~/data";

export const RecipeIngredientsList: React.FC = () => {
	const router = useRouter();
	const { styles, theme } = useStyles(stylesheet);
	const { control } = useFormContext<Recipe>();
	// TODO: We can't do this because items is a record, not an array
	const { fields, remove } = useFieldArray({
		name: "items",
		control,
	});

	const handleAddIngredient = () => {
		// TODO: Fix bad pattern
		router.push("/search/food?for=recipe");
	};

	return (
		<View>
			{fields.map((field, index) => (
				<View key={field.id} style={styles.ingredientItem}>
					<Text style={styles.ingredientName}>{field.item.name}</Text>
					<Text style={styles.ingredientQuantity}>
						{field.quantity} {field.serving.unit}
					</Text>
					<TouchableOpacity onPress={() => remove(index)}>
						<Ionicons
							name="close-circle-outline"
							size={24}
							color={theme.colors.red}
						/>
					</TouchableOpacity>
				</View>
			))}
			<Button
				title="Add Ingredient"
				icon="add-circle-outline"
				type={ButtonType.Ghost}
				onPress={handleAddIngredient}
			/>
		</View>
	);
};

const stylesheet = createStyleSheet((theme) => ({
	ingredientItem: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingVertical: theme.margins[8],
		borderBottomWidth: 1,
		borderBottomColor: theme.colors.base200,
	},
	ingredientName: {
		...theme.fonts.body.m,
	},
	ingredientQuantity: {
		...theme.fonts.body.s,
		flex: 1,
		textAlign: "right",
	},
}));
