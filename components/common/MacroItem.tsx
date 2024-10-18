import type React from "react";
import { Text, View } from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";

type MacroItemProps = {
	label: string;
	value: string;
	color: string;
};

export const MacroItem: React.FC<MacroItemProps> = ({
	label,
	value,
	color,
}) => {
	const { styles } = useStyles(stylesheet);
	return (
		<View style={styles.macroItem}>
			<Text style={[styles.macroValue, { color }]}>{value}</Text>
			<Text style={styles.macroLabel}>{label}</Text>
		</View>
	);
};

const stylesheet = createStyleSheet((theme) => ({
	macroItem: {
		alignItems: "center",
	},
	macroValue: {
		...theme.fonts.body.m,
		fontWeight: "bold",
	},
	macroLabel: {
		...theme.fonts.body.xs,
		color: theme.colors.base600,
	},
}));
