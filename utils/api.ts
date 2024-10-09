import { Food } from '~/data';

export const fetchProductByBarcode = async (barcode: string): Promise<Food> => {
  try {
    const response = await fetch(`https://world.openfoodfacts.net/api/v2/product/${barcode}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    return {
      id: data.product.id,
      name: data.product.product_name_es || data.product.product_name,
      brands: data.product.brands,
      code: data.product.code,
      image_url: data.product.image_url,
      default_serving_size: parseFloat(data.product.product_quantity) || 100,
      default_serving_unit: 'g',
      energy_kcal: data.product.nutriments['energy-kcal_100g'],
      fat: data.product.nutriments.fat_100g,
      saturated_fat: data.product.nutriments['saturated-fat_100g'],
      carbohydrates: data.product.nutriments.carbohydrates_100g,
      sugars: data.product.nutriments.sugars_100g,
      proteins: data.product.nutriments.proteins_100g,
      fiber: data.product.nutriments.fiber_100g,
      salt: data.product.nutriments.salt_100g,
      sodium: data.product.nutriments.sodium_100g,
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
  return data.products.map((product: any) => ({
    id: product.id,
    name: product.product_name_es || product.product_name,
    brands: product.brands,
    code: product.code,
    image_url: product.image_url,
    default_serving_size: parseFloat(product.product_quantity) || 100,
    default_serving_unit: 'g',
    energy_kcal: product.nutriments['energy-kcal_100g'],
    fat: product.nutriments.fat_100g,
    saturated_fat: product.nutriments['saturated-fat_100g'],
    carbohydrates: product.nutriments.carbohydrates_100g,
    sugars: product.nutriments.sugars_100g,
    proteins: product.nutriments.proteins_100g,
    fiber: product.nutriments.fiber_100g,
    salt: product.nutriments.salt_100g,
    sodium: product.nutriments.sodium_100g,
    deleted: false,
  }));
};
