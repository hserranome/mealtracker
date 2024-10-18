import { observer } from "@legendapp/state/react";
import { useRouter } from "expo-router";
import React, { useCallback, useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { ScrollView, View } from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";

import { Button, TextInput } from "~/components/common";
import { type CaloriesSchedule, type Days, caloriesSchedule$ } from "~/data";

const weekdays = [
	"Monday",
	"Tuesday",
	"Wednesday",
	"Thursday",
	"Friday",
	"Saturday",
	"Sunday",
];

export default observer(function SetupWeekdays() {
	const { styles } = useStyles(stylesheet);
	const methods = useForm<CaloriesSchedule>();
	const router = useRouter();

	useEffect(() => {
		Object.entries(caloriesSchedule$.schedule.get()).map(([day, calories]) => {
			methods.setValue(day as Days, calories);
		});
	}, [methods.setValue]);

	const onSubmit = useCallback(
		(data: CaloriesSchedule) => {
			caloriesSchedule$.setSchedule(data);
			router.replace("/(tabs)");
		},
		[router],
	);

	return (
		<FormProvider {...methods}>
			<ScrollView contentContainerStyle={styles.container}>
				<View style={styles.formContainer}>
					{weekdays.map((day, index) => (
						<View key={day} style={styles.inputContainer}>
							<TextInput
								label={day}
								direction="horizontal"
								name={day.toLowerCase()}
								placeholder="Enter calorie intake"
								keyboardType="numeric"
								type="number"
								onSubmitEditing={() => {
									if (index < weekdays.length - 1) {
										methods.setFocus(weekdays[index + 1].toLowerCase() as Days);
									}
								}}
								blurOnSubmit={index === weekdays.length - 1}
								returnKeyType={index === weekdays.length - 1 ? "done" : "next"}
							/>
						</View>
					))}
					<View style={styles.button}>
						<Button title="Save" onPress={methods.handleSubmit(onSubmit)} />
					</View>
				</View>
			</ScrollView>
		</FormProvider>
	);
});

const stylesheet = createStyleSheet((theme) => ({
	container: {
		flexGrow: 1,
		justifyContent: "center",
	},
	formContainer: {
		marginHorizontal: theme.margins[24],
	},
	inputContainer: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: theme.margins[16],
	},
	label: {
		...theme.fonts.body.m,
		marginRight: theme.margins[8],
	},
	button: {
		marginTop: theme.margins[24],
	},
}));
