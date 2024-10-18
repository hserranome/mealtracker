import { useEffect } from "react";
import { View } from "react-native";
import Animated, {
	useAnimatedStyle,
	useSharedValue,
	withSpring,
} from "react-native-reanimated";
import { createStyleSheet, useStyles } from "react-native-unistyles";

export const ProgressBar = ({ progress }: { progress: number }) => {
	const { styles } = useStyles(stylesheet);

	const barWidth = useSharedValue<number>(0);
	useEffect(() => {
		barWidth.value = withSpring(progress);
	}, [progress, barWidth]);

	const animatedStyle = useAnimatedStyle(() => {
		return {
			width: `${barWidth.value}%`,
		};
	});

	return (
		<View style={styles.progressBar}>
			<Animated.View style={[styles.progressBarFill, animatedStyle]} />
		</View>
	);
};

const stylesheet = createStyleSheet((theme) => ({
	progressBar: {
		width: "100%",
		borderRadius: 3,
		overflow: "hidden",
		borderColor: theme.colors.base800,
		borderWidth: 1,
		height: 10,
	},
	progressBarFill: {
		height: 10,
		width: "50%",
		backgroundColor: theme.colors.base800,
	},
}));
