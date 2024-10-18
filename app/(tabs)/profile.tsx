import { useRouter } from "expo-router";
import { Text, View } from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";

import { Button, ButtonType } from "~/components/common/Button";
import { usePocketbase } from "~/components/contexts/PocketbaseContext";
import { dairy$ } from "~/data";

export default function Profile() {
	const router = useRouter();
	const { logout } = usePocketbase();
	const { styles, theme } = useStyles(stylesheet);

	const handleLogout = async () => {
		try {
			await logout?.();
		} finally {
			router.replace("/");
		}
	};

	const navigateToSetupWeekdays = () => {
		router.push("/setup-weekdays");
	};

	return (
		<View style={styles.container}>
			<Text style={[styles.title, { color: theme.colors.foreground }]}>
				Profile
			</Text>
			<View style={styles.buttonContainer}>
				<Button
					onPress={navigateToSetupWeekdays}
					title="Edit Calorie Intake"
					type={ButtonType.Solid}
					style={styles.button}
				/>
				<Button
					onPress={() => router.push("/search/food")}
					title="Search food"
					type={ButtonType.Outline}
					style={styles.button}
				/>
				<Button
					onPress={handleLogout}
					title="Logout"
					type={ButtonType.Ghost}
					style={styles.button}
				/>
				<Button
					onPress={() => {
						dairy$.deleteAllEntries();
					}}
					title="Delete all dairy entries"
					type={ButtonType.Ghost}
					style={styles.button}
				/>
			</View>
		</View>
	);
}

const stylesheet = createStyleSheet((theme) => ({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		padding: 20,
	},
	title: {
		...theme.fonts.heading.xl,
		marginBottom: theme.margins[32],
	},
	buttonContainer: {
		width: "100%",
		alignItems: "stretch",
	},
	button: {
		marginBottom: theme.margins[16],
	},
}));
