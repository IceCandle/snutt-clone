import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query';

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
    token,
    error,
    isLoading,
    handleLogin,
    handleLogout,
    handleNicknameChange,
  } = useAuth();

  const { data: currentTable, isLoading: isTableLoading } =
    useQuery<TableResponse>({
      queryKey: ['currentTable'],
      queryFn: async () => {
        if (token == null) throw new Error('No token');
        const response = await fetch(
          'https://wafflestudio-seminar-2024-snutt-redirect.vercel.app/v1/tables/recent',
          {
            headers: {
              'x-access-token': token,
            },
          },
        );
        if (!response.ok) throw new Error('Failed to fetch current table');
        return response.json() as Promise<TableResponse>;
      },
      enabled: token != null,
    });

  if (isLoading || isTableLoading) {
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
            tableList={currentTable as TableResponse}
            title={currentTable?.title ?? null}
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

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppContent />
    </QueryClientProvider>
  );
}
