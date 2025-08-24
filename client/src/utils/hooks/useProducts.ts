import { useQuery } from '@tanstack/react-query';

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

  return { products, productLoading };
};
