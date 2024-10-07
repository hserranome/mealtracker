import { useRouter } from 'expo-router';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { View } from 'react-native';

import BarcodeScanner from '~/components/common/BarcodeScanner';

const FoodScanner: React.FC = () => {
  const methods = useFormContext();
  const router = useRouter();

  const handleBarcodeScan = async (barcode: string) => {
    methods.setValue('barcode', barcode);
    router.back();
  };

  return (
    <View style={{ flex: 1 }}>
      <BarcodeScanner onSuccess={handleBarcodeScan} />
    </View>
  );
};

export default FoodScanner;
