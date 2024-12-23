import React, { type ComponentProps, forwardRef } from "react";
import {
	TextInput as RNTextInput,
	Text,
	View,
	type StyleProp,
	type TextStyle,
} from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";

type BaseTextInputProps = {
	suffix?: string | null;
	expand?: boolean;
	textAlign?: "left" | "center" | "right";
	variant?: "ghost";
	type?: "string" | "number";
} & ComponentProps<typeof RNTextInput>;

export const BaseTextInput = forwardRef<RNTextInput, BaseTextInputProps>(
	(
		{
			suffix,
			variant,
			textAlign,
			expand = true,
			type = "string",
			...textInputProps
		},
		ref,
	) => {
		const { styles, theme } = useStyles(baseInputStyleSheet, { variant });

		const keyboardType = type === "number" ? "numeric" : "default";

		const inputStyle = [
			styles.input,
			textAlign && { textAlign },
			expand && { flex: 1 },
			suffix && { paddingRight: 30 },
			textInputProps.style,
		].filter(Boolean) as StyleProp<TextStyle>;

		return (
			<View style={styles.container}>
				<RNTextInput
					placeholderTextColor={theme.colors.base600}
					keyboardType={keyboardType}
					{...textInputProps}
					style={inputStyle}
					ref={ref}
				/>
				{suffix && <Text style={styles.suffix}>{suffix}</Text>}
			</View>
		);
	},
);

const baseInputStyleSheet = createStyleSheet((theme) => ({
	container: {
		flexDirection: "row",
		alignItems: "center",
	},
	input: {
		padding: theme.margins[10],
		borderRadius: theme.radius[5],
		backgroundColor: theme.colors.background,
		color: theme.colors.foreground,
		variants: {
			variant: {
				default: {
					borderWidth: 2,
					borderColor: theme.colors.base800,
				},
				ghost: {
					borderWidth: 0,
				},
			},
			selected: {
				true: {
					borderColor: theme.colors.blue,
				},
			},
		},
	},
	suffix: {
		position: "absolute",
		right: theme.margins[10],
		color: theme.colors.base600,
		paddingLeft: 5,
	},
}));
