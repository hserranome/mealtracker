import { Ionicons } from "@expo/vector-icons";
import { type ComponentProps, forwardRef } from "react";
import {
	Pressable,
	type StyleProp,
	Text,
	type TextStyle,
	View,
	type ViewStyle,
} from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";

export enum ButtonType {
	Solid = "solid",
	Outline = "outline",
	Light = "light",
	Ghost = "ghost",
}

type ButtonProps = {
	title?: string;
	disabled?: boolean;
	type?: ButtonType;
	icon?: ComponentProps<typeof Ionicons>["name"];
	iconPosition?: "left" | "right";
	debounceRate?: number;
	justify?: "center" | "left" | "right";
	style?: StyleProp<ViewStyle>;
	textStyle?: StyleProp<TextStyle>;
} & ComponentProps<typeof Pressable>;

export const Button = forwardRef<React.ElementRef<typeof Pressable>, ButtonProps>(
	(
		{
			title,
			disabled,
			type = ButtonType.Solid,
			icon,
			iconPosition = "left",
			onPress,
			style,
			textStyle,
			debounceRate,
			justify = "center",
			...touchableProps
		},
		ref,
	) => {
		const { styles, theme } = useStyles(stylesheet, {
			disabled: disabled ? type : undefined,
			type,
			hasTitle: !!title,
			iconPosition,
			justify,
		});

		const iconElement = icon && (
			<Ionicons
				name={icon}
				size={24}
				color={textStyle ? (textStyle as TextStyle).color : styles.buttonText.color}
				style={styles.icon}
			/>
		);

		return (
			<View style={styles.wrapper}>
				<Pressable
					ref={ref}
					disabled={disabled}
					android_ripple={{
						color: theme.colors.base600,
						borderless: false,
					}}
					{...touchableProps}
					style={({ pressed }) => [
						styles.container,
						style,
						pressed && styles.pressed,
					]}
					onPress={onPress ? onPress : undefined}
				>
					<View style={styles.buttonContent}>
						{iconPosition === "left" && iconElement}
						{title && (
							<Text style={[styles.buttonText, textStyle]}>{title}</Text>
						)}
						{iconPosition === "right" && iconElement}
					</View>
				</Pressable>
			</View>
		);
	},
);

const stylesheet = createStyleSheet((theme) => ({
	wrapper: {
		overflow: "hidden",
		borderRadius: theme.radius[6],
	},
	container: {
		borderRadius: theme.radius[6],
		paddingVertical: theme.margins[10],
		paddingHorizontal: theme.margins[12],
		flexDirection: "row",
		overflow: "hidden",
		alignItems: "center",
		borderWidth: 2,
		borderColor: "transparent",
		variants: {
			type: {
				[ButtonType.Solid]: {
					backgroundColor: theme.colors.base800,
				},
				[ButtonType.Outline]: {
					backgroundColor: theme.colors.background,
					borderWidth: 2,
					borderColor: theme.colors.base800,
					borderStyle: "solid",
				},
				[ButtonType.Light]: {
					backgroundColor: theme.colors.background,
				},
				[ButtonType.Ghost]: {
					backgroundColor: "transparent",
				},
			},
			disabled: {
				[ButtonType.Solid]: {
					backgroundColor: theme.colors.base600,
				},
				[ButtonType.Outline]: {
					backgroundColor: theme.colors.base200,
				},
				[ButtonType.Light]: {
					backgroundColor: theme.colors.base200,
				},
				[ButtonType.Ghost]: {
					backgroundColor: "transparent",
				},
			},
			justify: {
				center: {
					justifyContent: "center",
				},
				left: {
					justifyContent: "flex-start",
				},
				right: {
					justifyContent: "flex-end",
				},
			},
		},
	},
	pressed: {
		backgroundColor: theme.colors.base600,
	},
	buttonContent: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
	},
	buttonText: {
		color: theme.colors.background,
		fontSize: 16,
		fontWeight: "800",
		variants: {
			type: {
				[ButtonType.Solid]: {
					color: theme.colors.background,
				},
				[ButtonType.Outline]: {
					color: theme.colors.base800,
				},
				[ButtonType.Light]: {
					color: theme.colors.base800,
				},
				[ButtonType.Ghost]: {
					color: theme.colors.base800,
				},
			},
			disabled: {
				[ButtonType.Solid]: {
					color: theme.colors.base200,
				},
				[ButtonType.Outline]: {
					color: theme.colors.base400,
				},
				[ButtonType.Light]: {
					color: theme.colors.base400,
				},
				[ButtonType.Ghost]: {
					color: theme.colors.base400,
				},
			},
			justify: {
				center: {
					textAlign: "center",
				},
				left: {
					textAlign: "left",
				},
				right: {
					textAlign: "right",
				},
			},
		},
	},
	icon: {
		variants: {
			iconPosition: {
				left: {
					marginRight: theme.margins[8],
				},
				right: {
					marginLeft: theme.margins[8],
				},
			},
			hasTitle: {
				false: {
					marginRight: 0,
					marginLeft: 0,
				},
			},
		},
	},
}));
