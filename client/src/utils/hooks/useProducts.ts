import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import agent from '../api/agent';

export const useProducts = (id?: number) => {
  const queryClient = useQueryClient();

  const { data: products, isLoading: productsLoading } = useQuery({
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
    enabled: !id,
  });

  const { data: product, isLoading: productLoading } = useQuery({
    queryKey: ['products', id],
    queryFn: async () => {
      const response = await agent.get<Product>(`/products/${id}`);
      return response.data;
    },
    enabled: !!id,
  });

  const createProduct = useMutation({
    mutationFn: async (request: Product) => {
      const response = await agent.post('/products', request);

      return { request, productId: response.data };
    },
    onSuccess: ({ request, productId }) => {
      queryClient.setQueryData(['products'], (oldData: Product[]) => [
        ...oldData,
        { ...request, productId },
      ]);
    },
  });

  const updateProduct = useMutation({
    mutationFn: async (request: Product) => {
      await agent.put('/products', request);
      return { request };
    },
    onSuccess: ({ request }) => {
      queryClient.setQueryData(['products', id], (oldData: Product) =>
        !oldData ? oldData : request
      );

      queryClient.setQueryData(['products'], (oldData: Product[]) => {
        if (!oldData) return oldData;

        return oldData.map((data) => (data.productId === request.productId ? request : data));
      });
    },
  });

  return { products, productsLoading, product, productLoading, createProduct, updateProduct };
};
