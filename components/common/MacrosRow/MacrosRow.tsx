import { View } from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";

import { MacroItem } from "../MacroItem";

import type { Nutriments } from "~/data";

type MacrosRowProps = {
	carbohydrates: Nutriments["carbohydrates"];
	proteins: Nutriments["proteins"];
	fat: Nutriments["fat"];
	energy_kcal: Nutriments["energy_kcal"];
};
export const MacrosRow = ({
	carbohydrates = 0,
	proteins = 0,
	fat = 0,
	energy_kcal = 0,
}: MacrosRowProps) => {
	const { styles, theme } = useStyles(stylesheet);
	return (
		<View style={styles.macroContainer}>
			<MacroItem
				label="Carbohydrate"
				value={`${carbohydrates}g`}
				color={theme.colors.red}
			/>
			<MacroItem
				label="Protein"
				value={`${proteins}g`}
				color={theme.colors.blue}
			/>
			<MacroItem label="Fat" value={`${fat}g`} color={theme.colors.green} />
			<MacroItem
				label="Calories"
				value={`${energy_kcal}cal`}
				color={theme.colors.orange}
			/>
		</View>
	);
};

const stylesheet = createStyleSheet((theme) => ({
	macroContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		paddingHorizontal: theme.margins[24],
		paddingVertical: theme.margins[4],
	},
	item: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		gap: theme.margins[4],
	},
}));
