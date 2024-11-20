import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

import { getTableInfo,getUserInfo, login } from '../api/api';
import type { TableResponse } from '../components/types';

interface UseAuthReturn {
  token: string | null;
  nickname: string | null;
  tableInfo: TableResponse | null;
  isLoading: boolean;
  handleLogin: (username: string, password: string) => Promise<void>;
  handleLogout: () => void;
  error: Error | null;
  handleNicknameChange: () => Promise<void>;
}

const useAuth = (): UseAuthReturn => {
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [error, setError] = useState<Error | null>(null);
  const queryClient = useQueryClient();

  const { data: userInfo, isLoading: isUserLoading } = useQuery({
    queryKey: ['userInfo', token],
    queryFn: async () => {
      if (token == null) return null;
      return await getUserInfo(token);
    },
    enabled: !(token == null),
  });

  const { data: tableInfo, isLoading: isTableLoading } = useQuery({
    queryKey: ['tableInfo', token],
    queryFn: async () => {
      if (token == null) return null;
      return await getTableInfo(token);
    },
    enabled: !(token == null),
  });

  const loginMutation = useMutation({
    mutationFn: async ({ username, password }: { username: string; password: string }) => {
      return await login(username, password);
    },
    onSuccess: (data) => {
      setToken(data.token);
      localStorage.setItem('token', data.token);
      setError(null);
      void queryClient.invalidateQueries({ queryKey: ['userInfo'] });
      void queryClient.invalidateQueries({ queryKey: ['tableInfo'] });
    },
    onError: (err) => {
      setError(err instanceof Error ? err : new Error('Unknown error occurred'));
    },
  });

  const handleLogin = async (username: string, password: string) => {
    await loginMutation.mutateAsync({ username, password });
  };

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem('token');
    queryClient.clear();
  };

  const handleNicknameChange = async () => {
    if (token != null) {
      await queryClient.invalidateQueries({ queryKey: ['userInfo'] });
    }
  };

  const nickname = ((userInfo?.nickname) != null) 
    ? `${userInfo.nickname.nickname}#${userInfo.nickname.tag}`
    : null;

  return {
    token,
    nickname,
    tableInfo: tableInfo ?? null,
    isLoading: isUserLoading || isTableLoading,
    handleLogin,
    handleLogout,
    error,
    handleNicknameChange,
  };
};

export default useAuth;