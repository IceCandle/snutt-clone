// App.tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import LoadingSpinner from './components/LoadingSpinner';
import type { TableResponse } from './components/types';
import { ThemeProvider } from './contexts/ThemeContext';
import useAuth from './hooks/useAuth';
import LoginPage from './pages/LoginPage';
import UserInfoPage from './pages/UserInfoPage';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5, // 5 minutes
    },
  },
});

const AppContent = () => {
  const {
    nickname,
    tableInfo,
    error,
    isLoading,
    handleLogin,
    handleLogout,
    token,
    handleNicknameChange,
  } = useAuth();

  if (isLoading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <ThemeProvider>
      <div className="h-screen w-screen bg-white dark:bg-gray-900">
        {nickname !== null ? (
          <UserInfoPage
            nickname={nickname}
            onLogout={handleLogout}
            tableList={tableInfo as TableResponse}
            title={tableInfo?.title ?? null}
            token={token}
            onNicknameChange={handleNicknameChange}
          />
        ) : (
          <LoginPage 
            onLogin={handleLogin} 
            error={error instanceof Error ? error.message : null} 
          />
        )}
      </div>
    </ThemeProvider>
  );
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AppContent />
    </QueryClientProvider>
  );
};

export default App;