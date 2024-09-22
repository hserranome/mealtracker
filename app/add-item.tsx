// import { useLocalSearchParams } from 'expo-router';
// import { useState } from 'react';
import { View } from 'react-native';

// const getSafeString = (str: any) => (typeof str === 'string' ? str : '');

export default function AddItem() {
  // const initialRawParams = useLocalSearchParams();
  // const initialParams: Food = {
  //   name: getSafeString(initialRawParams.name),
  //   brand: getSafeString(initialRawParams.brand),
  //   code: getSafeString(initialRawParams.code),
  //   meal: Number(initialRawParams.meal),
  //   amount: Number(initialRawParams.amount),
  //   unit: getSafeString(initialRawParams.unit),
  //   nutriment_basis: getSafeString(initialRawParams.nutriment_basis),
  //   nutriments: JSON.parse(getSafeString(initialRawParams.nutriments)),
  // };

  // const [item] = useState<Food>({ ...initialParams });

  // console.log('coso', { item, initialParams });

  return (
    <View style={{ flex: 1 }}>
      {/* Form to edit all values */}
      {/* Form to edit the amount of the food */}
    </View>
  );
}
