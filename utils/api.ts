import { Food } from '~/data';

export const fetchProductByBarcode = async (barcode: string): Promise<Food> => {
  try {
    const response = await fetch(`https://world.openfoodfacts.net/api/v2/product/${barcode}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    const item = data.product ?? {};

    return {
      id: item.id,
      name: item.product_name_es || item.product_name || item.ecoscore_data.agribalyse.name_en,
      brands: item.brands,
      code: item.code,
      image_url: item.image_url,
      base_serving_size: 100,
      base_serving_unit: 'g', // TODO: ml?
      base_nutriments: {
        energy_kcal: item.nutriments['energy-kcal_100g'],
        fat: item.nutriments.fat_100g,
        saturated_fat: item.nutriments['saturated-fat_100g'],
        carbohydrates: item.nutriments.carbohydrates_100g,
        sugars: item.nutriments.sugars_100g,
        proteins: item.nutriments.proteins_100g,
        fiber: item.nutriments.fiber_100g,
        salt: item.nutriments.salt_100g,
        sodium: item.nutriments.sodium_100g,
      },
      extra_serving_sizes: [],
      deleted: false,
    };
  } catch (error) {
    console.error('Error fetching product information:', error);
    throw new Error('Failed to fetch product information');
  }
};

export const searchProductBySearchTerm = async (searchTerm: string): Promise<Food[]> => {
  const response = await fetch(
    `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${searchTerm}&search_simple=1&action=process&json=1`
  );
  const data = await response.json();
  return data.products.map(
    (product: any): Food => ({
      id: product.id,
      name: product.product_name_es || product.product_name,
      brands: product.brands,
      code: product.code,
      image_url: product.image_url,
      base_serving_size: parseFloat(product.product_quantity) || 100,
      base_serving_unit: 'g',
      base_nutriments: {
        energy_kcal: product.nutriments['energy-kcal_100g'],
        fat: product.nutriments.fat_100g,
        saturated_fat: product.nutriments['saturated-fat_100g'],
        carbohydrates: product.nutriments.carbohydrates_100g,
        sugars: product.nutriments.sugars_100g,
        proteins: product.nutriments.proteins_100g,
        fiber: product.nutriments.fiber_100g,
        salt: product.nutriments.salt_100g,
        sodium: product.nutriments.sodium_100g,
      },
      extra_serving_sizes: [],
      deleted: false,
    })
  );
};
