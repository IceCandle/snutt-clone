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
    handleLogin,
    handleLogout,
    token,
  } = useAuth();

  return (
    <ThemeProvider>
      <div className="h-screen w-screen bg-white dark:bg-gray-900">
        {nickname != null ? (
          <UserInfoPage
            nickname={nickname}
            onLogout={handleLogout}
            tableList={tableList}
            title={title}
            token={token}
          />
        ) : (
          <LoginPage onLogin={handleLogin} error={error} />
        )}
      </div>
    </ThemeProvider>
  );
};

export default App;
