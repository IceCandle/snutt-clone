import { useCallback, useEffect, useState } from 'react';

import { getUserInfo, login } from './api';
import LoginScreen from './LoginScreen';
import UserInfo from './UserInfo';

const App = () => {
  const [, setToken] = useState<string | null>(null);
  const [nickname, setNickname] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchUserInfo = useCallback(async (authToken: string) => {
    try {
      const userInfo = await getUserInfo(authToken);
      setNickname(`${userInfo.nickname.nickname}#${userInfo.nickname.tag}`);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch user info. Please try logging in again.';
      setError(errorMessage);
      handleLogout();
    }
  }, []);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken != null) {
      setToken(storedToken);
      fetchUserInfo(storedToken).catch((err: unknown) => {
        setError(err instanceof Error ? err.message : 'Error fetching user info.');
      });
    }
  }, [fetchUserInfo]);

  const handleLogin = async (username: string, password: string) => {
    try {
      setError(null);
      const response = await login(username, password);
      setToken(response.token);
      localStorage.setItem('token', response.token);
      await fetchUserInfo(response.token);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Login failed. Please try again.';
      setError(errorMessage);
    }
  };

  const handleLogout = () => {
    setToken(null);
    setNickname(null);
    localStorage.removeItem('token');
  };

  return (
    <div className="h-screen w-screen">
      {(nickname != null) ? (
        <UserInfo nickname={nickname} onLogout={handleLogout} />
      ) : (
        <LoginScreen onLogin={handleLogin} error={error} />
      )}
    </div>
  );
};

export default App;
