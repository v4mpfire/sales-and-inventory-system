import { useMutation, useQuery } from '@tanstack/react-query';

import agent from '../api/agent';

export const useProducts = () => {
  const { data: products, isLoading: productLoading } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const response = await agent.get<Product[]>('/products');
      return response.data;
    },
    select: (data) =>
      data.map((prod) => ({
        ...prod,
        imageUrl: `/assets/images/product/product-${prod.productId}.webp`,
      })),
  });

  const createProduct = useMutation({
    mutationFn: async (product: Product) => {
      await agent.post('/products', product);
    },
  });

  return { products, productLoading, createProduct };
};
