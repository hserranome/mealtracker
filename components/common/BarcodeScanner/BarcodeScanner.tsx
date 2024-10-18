import { type BarcodeScanningResult, Camera, CameraView } from "expo-camera";
import type React from "react";
import { useEffect, useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";

interface BarcodeScannerProps {
	onSuccess: (barcode: string) => void;
}

const BarcodeScanner: React.FC<BarcodeScannerProps> = ({ onSuccess }) => {
	const [hasPermission, setHasPermission] = useState<boolean | null>(null);
	const [scanned, setScanned] = useState(false);

	useEffect(() => {
		const getCameraPermissions = async () => {
			const { status } = await Camera.requestCameraPermissionsAsync();
			setHasPermission(status === "granted");
		};
		getCameraPermissions();
	}, []);

	const handleBarCodeScanned = ({ data: barcode }: BarcodeScanningResult) => {
		setScanned(true);
		onSuccess(barcode);
	};

	if (hasPermission === null) return <Text>Requesting camera permission</Text>;
	if (hasPermission === false) return <Text>No access to camera</Text>;
	return (
		<View style={styles.container}>
			<CameraView
				style={StyleSheet.absoluteFillObject}
				barcodeScannerSettings={{
					barcodeTypes: ["ean8", "ean13", "qr"],
				}}
				facing="back"
				onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
			>
				<View style={styles.overlay}>
					{scanned && (
						<Button
							title="Tap to Scan Again"
							onPress={() => setScanned(false)}
						/>
					)}
				</View>
			</CameraView>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	overlay: {
		flex: 1,
		backgroundColor: "transparent",
		justifyContent: "flex-end",
		alignItems: "center",
		paddingBottom: 20,
	},
});

export default BarcodeScanner;
