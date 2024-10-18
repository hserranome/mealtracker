import { ActivityIndicator, View } from "react-native";

export const LoadingScreen = () => {
	return (
		<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
			<ActivityIndicator />
		</View>
	);
};
