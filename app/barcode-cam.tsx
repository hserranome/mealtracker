import { CameraView, useCameraPermissions } from 'expo-camera';
import { router } from 'expo-router';
import { ComponentProps, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { Button } from '~/components/elements/Button';

const fetchProductByBarcode = async (barcode: string) => {
  const response = await fetch(`https://world.openfoodfacts.org/api/v2/product/${barcode}`);
  const json = await response.json();
  if (json.status !== 1) return null;
  const safeNutriments = { ...json.product.nutriments_estimated, ...json.product.nutriments };
  const product = {
    code: json.code,
    name: json.product.product_name || json.product.generic_name,
    brand: json.product.brands,
    image_url: json.product.image_url,
    image_thumb_url: json.product.image_thumb_url,
    image_ingredients: json.product.image_ingredients,
    nutriments: {
      kcal: safeNutriments.energy_kcal,
      fat: safeNutriments.fat,
      proteins: safeNutriments.proteins,
      carbohydrates: safeNutriments.carbohydrates,
    },
  };
  return product;
};

export default function BarcodeCam() {
  const [torch, setTorch] = useState(false);
  const [permission, requestPermission] = useCameraPermissions();
  const [fetching, setFetching] = useState(false);

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  function toggleTorch() {
    setTorch(!torch);
  }

  const handleBarCodeScanned: ComponentProps<typeof CameraView>['onBarcodeScanned'] = async ({
    data: code,
  }) => {
    setFetching(true);
    try {
      const product = await fetchProductByBarcode(code);
      if (product) {
        await router.navigate({
          pathname: '/add-item',
          params: {
            ...product,
            nutriments: JSON.stringify(product.nutriments),
          },
        });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setFetching(false);
    }
  };

  return (
    <View style={styles.container}>
      <CameraView
        style={styles.camera}
        enableTorch={torch}
        onBarcodeScanned={!fetching ? handleBarCodeScanned : undefined}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={toggleTorch}>
            <Text style={styles.text}>Toggle torch</Text>
          </TouchableOpacity>
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});
