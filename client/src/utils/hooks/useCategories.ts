import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import agent from '../api/agent';

export const useCategories = (enabled?: boolean) => {
  const querClient = useQueryClient();

  const { data: categories, isLoading: loadingCategories } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const response = await agent.get<Category[]>('/categories');
      return response.data;
    },
    enabled: !(enabled === undefined) && enabled,
  });

  const createCategory = useMutation({
    mutationFn: async (category: Category) => {
      const response = await agent.post('/categories', category);

      return { category, categoryId: response.data };
    },
    onSuccess: ({ category, categoryId }) => {
      querClient.setQueryData(['categories'], (oldCategories: Category[]) => {
        if (!oldCategories) return oldCategories;

        return [...oldCategories, { ...category, categoryId }];
      });
    },
  });

  const updateCategory = useMutation({
    mutationFn: async (category: Category) => {
      await agent.put('/categories', category);
    },
    onSuccess: (_, category: Category) => {
      querClient.setQueryData(['categories'], (oldCategories: Category[]) => {
        if (!oldCategories) return oldCategories;

        return oldCategories.map((cat) =>
          cat.categoryId === category.categoryId ? { ...cat, name: category.name } : cat
        );
      });
    },
  });

  return { categories, loadingCategories, createCategory, updateCategory };
};
