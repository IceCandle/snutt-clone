import { useCallback, useEffect, useState } from 'react';

import { getTableInfo, getUserInfo, login } from '../api/api';
import type { TimeRange } from '../components/types';

const useAuth = () => {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem('token'),
  );
  const [nickname, setNickname] = useState<string | null>(null);
  const [tableList, setTableInfo] = useState<TimeRange[]>([]);
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
      const tableInfo = await getTableInfo(authToken);
      const newTableInfo: TimeRange[] = tableInfo.lecture_list.flatMap(
        (lecture) =>
          lecture.class_time_json.map((classTime) => ({
            day: classTime.day,
            startMinute: classTime.startMinute,
            endMinute: classTime.endMinute,
            course_title: lecture.course_title,
            place: classTime.place,
            credit: lecture.credit,
          })),
      );
      const table_title = tableInfo.title;
      setTitle(table_title);
      setTableInfo(newTableInfo);
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
        await Promise.all([
          fetchUserInfo(token),
          fetchTableInfo(token)
        ]);
      }
      setIsLoading(false);
    }
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
