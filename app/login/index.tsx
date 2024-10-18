import { Link } from "expo-router";
import React from "react";
import { View } from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";

import { Button, ButtonType } from "~/components/common/Button";
import { OnboardingScreenContainer } from "~/components/onboarding/OnboardingScreenContainer";

const LoginScreen = () => {
	const { styles } = useStyles(stylesheet);

	return (
		<OnboardingScreenContainer title="Login" progress={null}>
			<View style={styles.container}>
				<Link href="/login/login-email" asChild>
					<Button title="Login with Email" />
				</Link>
				<Button title="Login with Google" type={ButtonType.Outline} />
				<Button title="Login with Apple" type={ButtonType.Outline} />
			</View>
		</OnboardingScreenContainer>
	);
};

const stylesheet = createStyleSheet((theme) => ({
	container: {
		flex: 1,
		paddingHorizontal: theme.margins[16],
		justifyContent: "center",
		gap: 10,
		flexDirection: "column",
	},
}));

export default LoginScreen;
