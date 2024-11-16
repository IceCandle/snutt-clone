import LoadingSpinner from './components/LoadingSpinner';
import type { TableResponse } from './components/types';
import { ThemeProvider } from './contexts/ThemeContext';
import useAuth from './hooks/useAuth';
import LoginPage from './pages/LoginPage';
import UserInfoPage from './pages/UserInfoPage';

const App = () => {
  const {
    tableList,
    title,
    nickname,
    error,
    isLoading,
    handleLogin,
    handleLogout,
    token,
    handleNicknameChange,
  } = useAuth();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <ThemeProvider>
      <div className="h-screen w-screen bg-white dark:bg-gray-900">
        {nickname != null ? (
          <UserInfoPage
            nickname={nickname}
            onLogout={handleLogout}
            tableList={tableList as TableResponse}
            title={title}
            token={token}
            onNicknameChange={handleNicknameChange}
          />
        ) : (
          <LoginPage onLogin={handleLogin} error={error} />
        )}
      </div>
    </ThemeProvider>
  );
};

export default App;
