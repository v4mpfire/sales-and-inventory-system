import { useNavigate } from 'react-router';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import agent from '../api/agent';

import type { LoginSchema } from '../schemas/loginSchema';

export const useAccount = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const loginUser = useMutation({
    mutationFn: async (cred: LoginSchema) => {
      await agent.post('/login?useCookies=true', cred);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['user'],
      });
    },
  });

  const logoutUser = useMutation({
    mutationFn: async () => {
      await agent.post('/accounts/logout');
    },
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: ['categories'] });
      queryClient.removeQueries({ queryKey: ['customers'] });
      queryClient.removeQueries({ queryKey: ['products'] });
      queryClient.removeQueries({ queryKey: ['user'] });

      navigate('/login');
    },
  });

  const { data: userSession, isLoading: loadingUserSession } = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const response = await agent.get<UserSession>('/accounts/session');
      return response.data;
    },
    enabled: !queryClient.getQueryData(['user']),
  });

  return { loginUser, logoutUser, userSession, loadingUserSession };
};
