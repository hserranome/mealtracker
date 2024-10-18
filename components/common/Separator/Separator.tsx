import { Text, View } from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";

type SeparatorProps = {
	title?: string;
	right?: string;
};

export const Separator = ({ title, right }: SeparatorProps) => {
	const { styles } = useStyles(stylesheet);
	return (
		<View style={styles.container}>
			<Text style={styles.title}>{title}</Text>
			<Text style={styles.right}>{right}</Text>
		</View>
	);
};

const stylesheet = createStyleSheet((theme) => ({
	container: {
		backgroundColor: theme.colors.base800,
		flexDirection: "row",
		justifyContent: "space-between",
		paddingHorizontal: theme.margins[6],
		paddingVertical: theme.margins[8],
	},
	title: {
		...theme.fonts.heading.xxs,
		color: theme.colors.background,
	},
	right: {
		...theme.fonts.heading.xxs,
		fontWeight: "400",
		color: theme.colors.background,
	},
}));
