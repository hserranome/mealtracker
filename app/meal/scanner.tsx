import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { View } from 'react-native';
import { useStyles } from 'react-native-unistyles';

import BarcodeScanner from '~/components/common/BarcodeScanner';
import { fetchProductByBarcode } from '~/utils/api';

const MealFoodScanner: React.FC = () => {
  const { theme } = useStyles();
  const router = useRouter();
  const { meal } = useLocalSearchParams<{ meal: string }>();

  const handleBarcodeScan = async (barcode: string) => {
    const product = await fetchProductByBarcode(barcode);
    router.push({
      pathname: '/meal/add/food/[id]',
      params: { id: product.code, meal, product: JSON.stringify(product) },
    });
  };

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <Stack.Screen options={{ headerShown: false }} />
      <BarcodeScanner onSuccess={handleBarcodeScan} />
    </View>
  );
};

export default MealFoodScanner;
