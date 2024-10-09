import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { View } from 'react-native';

import BarcodeScanner from '~/components/common/BarcodeScanner';
import { fetchProductByBarcode } from '~/utils/api';

const MealFoodScanner: React.FC = () => {
  const router = useRouter();
  const { meal } = useLocalSearchParams<{ meal: string }>();

  const handleBarcodeScan = async (barcode: string) => {
    const product = await fetchProductByBarcode(barcode);
    router.push({ pathname: '/food/create', params: { meal, product: JSON.stringify(product) } });
  };

  return (
    <View style={{ flex: 1 }}>
      <Stack.Screen options={{ headerShown: false }} />
      <BarcodeScanner onSuccess={handleBarcodeScan} />
    </View>
  );
};

export default MealFoodScanner;
