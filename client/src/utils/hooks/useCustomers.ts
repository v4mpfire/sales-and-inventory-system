import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import agent from '../api/agent';

export const useCustomers = () => {
  const queryClient = useQueryClient();

  const { data: customers, isLoading: loadingCustomers } = useQuery({
    queryKey: ['customers'],
    queryFn: async () => {
      const response = await agent.get<Customer[]>('/customers');
      return response.data;
    },
  });

  const createCustomer = useMutation({
    mutationFn: async (request: Customer) => {
      const response = await agent.post('/customers', request);

      return { request, customerId: response.data };
    },
    onSuccess: ({ request, customerId }) => {
      queryClient.setQueryData(['customers'], (oldData: Customer[]) => [
        ...oldData,
        { ...request, customerId },
      ]);
    },
  });

  const updateCustomer = useMutation({
    mutationFn: async (request: Customer) => {
      await agent.put('/customers', request);
      return { request };
    },
    onSuccess: ({ request }) => {
      queryClient.setQueryData(['customers'], (oldData: Customer[]) => {
        if (!oldData) return oldData;

        return oldData.map((cus) => (cus.customerId === request.customerId ? request : cus));
      });
    },
  });

  return { customers, loadingCustomers, createCustomer, updateCustomer };
};
