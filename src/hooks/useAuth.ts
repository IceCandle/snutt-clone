import { useCallback, useEffect, useState } from 'react';

import { getTableInfo, getUserInfo, login } from '../api/api';
import type { TableResponse } from '../components/types';

const useAuth = () => {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem('token'),
  );
  const [nickname, setNickname] = useState<string | null>(null);
  const [tableList, setTableInfo] = useState<TableResponse>();
  const [title, setTitle] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchUserInfo = useCallback(async (authToken: string) => {
    try {
      const userInfo = await getUserInfo(authToken);
      setNickname(`${userInfo.nickname.nickname}#${userInfo.nickname.tag}`);
      return userInfo;
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : 'Failed to fetch user info. Please try logging in again.';
      setError(errorMessage);
      handleLogout();
      throw err;
    }
  }, []);

  const fetchTableInfo = useCallback(async (authToken: string) => {
    try {
      const newTable = await getTableInfo(authToken);
      const table_title = newTable.title;
      setTitle(table_title);
      setTableInfo(newTable as TableResponse);
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : 'Failed to fetch table info. Please try logging in again.';
      setError(errorMessage);
      throw err;
    }
  }, []);

  useEffect(() => {
    const initializeAuth = async () => {
      setIsLoading(true);
      if (token != null) {
        await Promise.all([fetchUserInfo(token), fetchTableInfo(token)]);
      }
      setIsLoading(false);
    };
    void initializeAuth();
  }, [token, fetchUserInfo, fetchTableInfo]);

  const handleLogin = async (username: string, password: string) => {
    try {
      setError(null);
      setIsLoading(true);
      const response = await login(username, password);
      setToken(response.token);
      localStorage.setItem('token', response.token);
      await fetchUserInfo(response.token);
      await fetchTableInfo(response.token);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Login failed. Please try again.';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    setToken(null);
    setNickname(null);
    localStorage.removeItem('token');
  };

  const handleNicknameChange = async () => {
    if (token != null) {
      setIsLoading(true);
      try {
        await fetchUserInfo(token);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return {
    tableList,
    title,
    nickname,
    error,
    isLoading,
    handleLogin,
    handleLogout,
    token,
    handleNicknameChange,
  };
};

export default useAuth;
