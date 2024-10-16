import { useMutation, useQuery } from '@tanstack/react-query';

import { getUserInfo, login, queryClient } from '../api/api';

export const useUser = () => {
  const token = localStorage.getItem('token');

  const {
    data: user,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['user'],
    queryFn: () => {
      if (token == null) {
        throw new Error('No token available');
      }
      return getUserInfo(token);
    },
    enabled: Boolean(token),
  });

  const loginMutation = useMutation({
    mutationFn: (credentials: { id: string; password: string }) =>
      login(credentials.id, credentials.password),
    onSuccess: async (data) => {
      localStorage.setItem('token', data.token);
      await queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });

  const logout = () => {
    localStorage.removeItem('token');
    queryClient.clear();
  };

  return {
    user,
    isLoading,
    error,
    login: loginMutation.mutate,
    logout,
    isLoginLoading: loginMutation.isPending,
    loginError: loginMutation.error,
  };
};
