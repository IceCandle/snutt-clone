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

  const fetchUserInfo = useCallback(async (authToken: string) => {
    try {
      const userInfo = await getUserInfo(authToken);
      setNickname(`${userInfo.nickname.nickname}#${userInfo.nickname.tag}`);
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : 'Failed to fetch user info. Please try logging in again.';
      setError(errorMessage);
      handleLogout();
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
    }
  }, []);

  useEffect(() => {
    if (token != null) {
      fetchUserInfo(token).catch((err: unknown) => {
        setError(
          err instanceof Error ? err.message : 'Error fetching user info.',
        );
      });

      fetchTableInfo(token).catch((err: unknown) => {
        setError(
          err instanceof Error ? err.message : 'Error fetching table info.',
        );
      });
    }
  }, [token, fetchUserInfo, fetchTableInfo]);

  const handleLogin = async (username: string, password: string) => {
    try {
      setError(null);
      const response = await login(username, password);
      setToken(response.token);
      localStorage.setItem('token', response.token);
      await fetchUserInfo(response.token);
      await fetchTableInfo(response.token);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Login failed. Please try again.';
      setError(errorMessage);
    }
  };

  const handleLogout = () => {
    setToken(null);
    setNickname(null);
    localStorage.removeItem('token');
  };

  return {
    tableList,
    title,
    nickname,
    error,
    handleLogin,
    handleLogout,
    token, // Now exposing token
  };
};

export default useAuth;
