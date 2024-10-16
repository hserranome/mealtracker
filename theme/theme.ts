const constants = {
	margins: {
		1: 1,
		2: 2,
		4: 4,
		6: 6,
		8: 8,
		10: 10,
		12: 12,
		14: 14,
		16: 16,
		18: 18,
		20: 20,
		24: 24,
		32: 32,
		40: 40,
		48: 48,
		56: 56,
		64: 64,
		72: 72,
		80: 80,
		96: 96,
	},
	radius: {
		1: 1,
		2: 2,
		5: 5,
		4: 4,
		6: 6,
	},
	fonts: {
		heading: {
			xxs: {
				fontFamily: "Inter",
				fontWeight: "800",
				fontSize: 16,
				lineHeight: 16 * 1.4,
			},
			xs: {
				fontFamily: "Inter",
				fontWeight: "800",
				fontSize: 20,
				lineHeight: 20 * 1.4,
			},
			m: {
				fontFamily: "Inter",
				fontWeight: "800",
				fontSize: 32,
				lineHeight: 32 * 1.3,
			},
			xl: {
				fontFamily: "Inter",
				fontWeight: "800",
				fontSize: 48,
				lineHeight: 48 * 1.2,
				letterSpacing: 48 * 0.01,
			},
			xxl: {
				fontFamily: "Inter",
				fontWeight: "800",
				fontSize: 56,
				lineHeight: 56 * 1.2,
				letterSpacing: 56 * 0.01,
			},
		},
		body: {
			xs: {
				fontFamily: "Inter",
				fontSize: 12,
				lineHeigh: 12 * 1.5,
			},
			m: {
				fontFamily: "Inter",
				fontWeight: "400",
				fontSize: 16,
				lineHeight: 16 * 1.5,
				letterSpacing: 16 * 0.01,
			},
			xl: {
				fontFamily: "Inter",
				fontWeight: "400",
				fontSize: 22,
				lineHeight: 24 * 1.6,
				letterSpacing: 22 * 0.01,
			},
		},
	},
	components: {
		container: {
			alignItems: "center",
			flex: 1,
			justifyContent: "center",
			padding: 24,
		},
	},
} as const;

export const lightTheme = {
	...constants,
	colors: {
		background: "#ffffff",
		foreground: "#000000",
		blue: "#34AFF7",
		red: "#FF5252",
		green: "#2EDB4B",
		orange: "#FE9D35",
		pink: "#F35B76",
		base200: "#EDF0F7",
		base400: "#CBD2E0",
		base500: "#A0ABC0",
		base600: "#717D96",
		base700: "#4A5468",
		base800: "#2D3648",
		base900: "#1A202C",
	},
} as const;

export const darkTheme = {
	...constants,
	colors: {
		background: "#1E1E1E",
		foreground: "#ffffff",
		blue: "#1E88E5",
		red: "#E53935",
		green: "#2EDB4B",
		orange: "#FE9D35",
		pink: "#F35B76",
		base200: "#4A4A4A",
		base400: "#6D6D6D",
		base500: "#A0ABC0",
		base600: "#A0A0A0",
		base800: "#D6D6D6",
		base900: "#1A202C",
	},
} as const;
