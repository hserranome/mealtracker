interface ProductInfo {
  // Define the structure of the product information
  // This can be expanded based on the actual API response
  code: string;
  product_name: string;
  // Add more fields as needed
}

export const fetchProductByBarcode = async (barcode: string): Promise<ProductInfo> => {
  try {
    const response = await fetch(`https://world.openfoodfacts.net/api/v2/product/${barcode}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.product;
  } catch (error) {
    console.error('Error fetching product information:', error);
    throw new Error('Failed to fetch product information');
  }
};
