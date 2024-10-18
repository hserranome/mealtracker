import { Stack, useRouter } from "expo-router";
import React from "react";
import { useFormContext } from "react-hook-form";
import { View } from "react-native";

import BarcodeScanner from "~/components/common/BarcodeScanner";

export default function FoodScanner() {
	const methods = useFormContext();
	const router = useRouter();

	const handleBarcodeScan = async (code: string) => {
		methods.setValue("code", code);
		router.back();
	};

	return (
		<View style={{ flex: 1 }}>
			<Stack.Screen options={{ headerShown: false, presentation: "modal" }} />
			<BarcodeScanner onSuccess={handleBarcodeScan} />
		</View>
	);
}
