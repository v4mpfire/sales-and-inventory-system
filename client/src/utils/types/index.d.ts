type Product = {
  productId: number;
  categoryId: number;
  categoryName: string;
  barcode: string;
  name: string;
  price: number;
  stockQuantity: number;
  imageUrl?: string;
};

type Category = {
  categoryId: number;
  name: string;
};
